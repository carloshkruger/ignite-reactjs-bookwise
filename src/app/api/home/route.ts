import { PrismaClient } from "@prisma/client";

const prismaClient  = new PrismaClient()

export async function GET(request: Request) {
  const books = await prismaClient.book.findMany({
    orderBy: {
      ratings: {
        _count: "desc",
      },
    },
    take: 4,
  });
  const bookRatings = await prismaClient.rating.groupBy({
    by: "bookId",
    _avg: {
      rate: true,
    },
    where: {
      bookId: {
        in: books.map((book) => book.id),
      },
    },
  });

  const recentReviews = await prismaClient.rating.findMany({
    include: {
      user: true,
      book: {
        select: {
          name: true,
          coverUrl: true,
          author: true,
        },
      },
    },
    take: 5,
  });

  return Response.json({
    popularBooks: books.map((book) => ({
      ...book,
      rate:
        bookRatings.find((rating) => rating.bookId === book.id)?._avg?.rate ??
        0,
    })),
    recentReviews,
  })
}