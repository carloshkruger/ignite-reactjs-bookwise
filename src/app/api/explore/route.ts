import { prismaClient } from "@/lib/prismaClient";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const categoryId = searchParams.get('categoryId')
  const query = searchParams.get('q') || ''

  let booksWhere: Prisma.BookWhereInput = {}
  if (categoryId) {
    booksWhere.categories = {
      some: {
        categoryId
      }
    }
  }
  if (query) {
    booksWhere.name = {
      contains: query
    }
  }

  const categories = await prismaClient.category.findMany();
  const books = await prismaClient.book.findMany({
    where: booksWhere
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

  return Response.json({
    categories,
    books: books.map((book) => ({
      ...book,
      rate:
        bookRatings.find((rating) => rating.bookId === book.id)?._avg?.rate ??
        0,
    })),
  })
}