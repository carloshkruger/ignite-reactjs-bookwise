import { getLoggedUserInfo } from "@/utils/getLoggedUserInfo";
import { prismaClient } from "../prismaClient";

export const getProfileInfo = async () => {
  const loggedUser = await getLoggedUserInfo()

  const userInfo = await prismaClient.user.findUnique({
    select: {
      id: true,
      name: true,
      avatarUrl: true,
      createdAt: true,
    },
    where: {
      email: loggedUser?.email!,
    },
  });

  if (!userInfo) {
    throw new Error('User not found.')
  }

  const ratings = await prismaClient.rating.findMany({
    include: {
      book: {
        include: {
          ratings: {
            select: {
              rate: true,
            },
          },
        },
      },
    },
    where: {
      user: {
        id: userInfo?.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const userStats = await getUserStats(userInfo.id)

  return { userInfo, userStats, ratings }
}

type UserStats = {
  reviewCount: number;
  pagesReadCount: number;
  authorReadCount: number;
  mostReadCategory: string;
}

async function getUserStats(userId: string): Promise<UserStats> {
  const [reviewCount, totalPagesRaw, authorCountRaw, [mostReadCategoryRaw]] = await Promise.all([
    prismaClient.rating.count({
      where: {
        userId,
      },
    }),
    prismaClient.book.aggregate({
      _sum: {
        totalPages: true
      },
      where: {
        ratings: {
          some: {
            userId
          }
        }
      }
    }),
    prismaClient.book.aggregate({
      _count: {
        author: true
      },
      where: {
        ratings: {
          some: {
            userId
          }
        }
      }
    }),
    prismaClient.$queryRaw<{ name: string }[]>`
      SELECT categories.name
        FROM categories
       WHERE categories.id = (
          SELECT "CategoriesOnBooks".categoryId
            FROM ratings
            JOIN books
              ON books.id = ratings.bookId
            JOIN "CategoriesOnBooks"
              ON "CategoriesOnBooks".bookId = books.id
          WHERE ratings.userId = ${userId}
        GROUP BY "CategoriesOnBooks".categoryId
        ORDER BY COUNT(*) DESC
          LIMIT 1
            )  
    `
  ])

  return {
    reviewCount,
    pagesReadCount: totalPagesRaw._sum.totalPages ?? 0,
    authorReadCount: authorCountRaw._count.author ?? 0,
    mostReadCategory: mostReadCategoryRaw.name
  };
}