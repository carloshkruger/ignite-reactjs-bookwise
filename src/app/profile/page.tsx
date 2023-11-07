import SidebarMenu from "@/components/SidebarMenu";
import styles from "./styles.module.css";
import PageTitle from "./_components/PageTitle";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import BookReview from "./_components/BookReview";
import Image from "next/image";
import { BookOpen, Bookmark, LibraryBig, UserSquare } from "lucide-react";
import UserStatItem from "./_components/UserStatItem";

const prismaClient = new PrismaClient();

async function getData() {
  const session = await getServerSession(nextAuthOptions);

  const userInfo = await prismaClient.user.findUnique({
    select: {
      id: true,
      name: true,
      avatarUrl: true,
      createdAt: true,
    },
    where: {
      email: session?.user?.email!,
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

  return { userInfo, userStats, ratings };
}

export default async function Profile() {
  const { userInfo, userStats, ratings } = await getData();

  return (
    <div className={styles.main}>
      <SidebarMenu />

      <div className={styles.content}>
        <PageTitle />

        <div className={styles.contentWrapper}>
          <div className={styles.bookReviewList}>
            {ratings.length ? (
              ratings.map((rating) => (
                <BookReview
                  key={rating.id}
                  description={rating.description}
                  book={{
                    author: rating.book.author,
                    name: rating.book.name,
                    coverUrl: rating.book.coverUrl,
                    ratings: rating.book.ratings,
                  }}
                  rate={rating.rate}
                  createdAt={rating.createdAt.toDateString()}
                />
              ))
            ) : (
              <p>Nenhuma avaliação realizada pelo usuário</p>
            )}
          </div>
          <div className={styles.userInfoAndStats}>
            <div className={styles.userInfo}>
              <Image src={userInfo?.avatarUrl!} width={72} height={72} alt="" />
              <p className={styles.userName}>{userInfo?.name}</p>
              <span className={styles.userJoinedDate}>
                {userInfo?.createdAt.toDateString()}
              </span>
            </div>
            <div className={styles.divider} />
            <div className={styles.userStats}>
              <UserStatItem
                icon={BookOpen}
                title="Páginas lidas"
                value="3853"
              />
              <UserStatItem
                icon={LibraryBig}
                title="Livros avaliados"
                value={userStats.reviewCount}
              />
              <UserStatItem icon={UserSquare} title="Autores lidos" value="8" />
              <UserStatItem
                icon={Bookmark}
                title="Categoria mais lida"
                value="Computação"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
