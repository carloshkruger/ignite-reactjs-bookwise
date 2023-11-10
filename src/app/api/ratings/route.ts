import { prismaClient } from "@/lib/prismaClient";
import { reviewSchema } from "@/lib/types/review";
import { getLoggedUserInfo } from "@/utils/getLoggedUserInfo";
import { ZodError } from "zod";


export async function POST(request: Request) {
  const data = await request.json()

  try {
    await reviewSchema.parseAsync(data)
  } catch (e) {
    if (e instanceof ZodError) {
      return new Response(JSON.stringify(e.flatten()), {
        status: 400
      })
    }
    return Response.error()
  }

  const loggedUser = await getLoggedUserInfo()
  if (!loggedUser) {
    return Response.error()
  }

  const user = await prismaClient.user.findUnique({
    where: {
      email: loggedUser.email!
    }
  })
  if (!user) {
    return Response.error()
  }

  const rating = await prismaClient.rating.create({
    data: {
      description: data.description,
      rate: data.rate,
      bookId: data.bookId,
      userId: user.id
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatarUrl: true
        }
      }
    }
  })

  return Response.json(rating)
}