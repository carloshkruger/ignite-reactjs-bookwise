import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../auth/[...nextauth]/route";

const prismaClient  = new PrismaClient()

export async function POST(request: Request) {
  const session = await getServerSession(nextAuthOptions)
  if (!session || !session.user) {
    return Response.error()
  }

  const user = await prismaClient.user.findUnique({
    where: {
      email: session.user.email!
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