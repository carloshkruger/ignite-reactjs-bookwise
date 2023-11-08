import { PrismaClient } from "@prisma/client";

const prismaClient  = new PrismaClient()

export async function GET(request: Request) {
  const popularBooks = await prismaClient.book.findMany({
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
        in: popularBooks.map((book) => book.id),
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
    orderBy: {
      createdAt: 'desc'
    }
  });

  return Response.json({
    popularBooks: popularBooks.map((book) => ({
      ...book,
      rate:
        bookRatings.find((rating) => rating.bookId === book.id)?._avg?.rate ??
        0,
    })),
    recentReviews,
  })
}