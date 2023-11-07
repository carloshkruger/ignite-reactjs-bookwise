import { getLoggedUserInfo } from "@/utils/getLoggedUserInfo";
import { PrismaClient } from "@prisma/client";

const prismaClient  = new PrismaClient()

export async function GET(request: Request) {
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

  const reviewCount = await prismaClient.rating.count({
    where: {
      userId: userInfo?.id,
    },
  });

  const userStats = {
    reviewCount,
  };

  return Response.json({ userInfo, userStats, ratings })
}