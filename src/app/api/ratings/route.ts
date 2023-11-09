import { prismaClient } from "@/lib/prismaClient";
import { getLoggedUserInfo } from "@/utils/getLoggedUserInfo";


export async function POST(request: Request) {
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

  const data = await request.json()

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