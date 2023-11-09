import { prismaClient } from "@/lib/prismaClient";

export async function GET(request: Request, { params }: {params: {id: string}}) {
  const bookId = params.id

  const book = await prismaClient.book.findUnique({
    include: {
      ratings: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatarUrl: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
      categories: {
        include: {
          category: true
        }
      }
    },
    where: {
      id: bookId
    }
  })

  return Response.json(book)
}