import { Prisma } from "@prisma/client"
import { prismaClient } from "../prismaClient"

type GetBooksParams = {
  categoryId?: string
  query?: string
}

export const getBooks = async ({ query, categoryId }: GetBooksParams) => {
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

  return books.map((book) => ({
    ...book,
    rate:
      bookRatings.find((rating) => rating.bookId === book.id)?._avg?.rate ??
      0,
  }))
}

export const getBookById = async (id: string) => {
  return prismaClient.book.findUnique({
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
      id
    }
  })
}

export const getPopularBooks = async () => {
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

  return popularBooks.map((book) => ({
    ...book,
    rate:
      bookRatings.find((rating) => rating.bookId === book.id)?._avg?.rate ??
      0,
  }))
}

export const getRecentReviews = async () => {
  return prismaClient.rating.findMany({
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
}