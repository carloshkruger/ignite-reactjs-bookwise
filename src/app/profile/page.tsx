import { Metadata } from "next";
import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BookOpen, Bookmark, LibraryBig, UserSquare } from "lucide-react";
import BookReview from "./_components/BookReview";
import UserStatItem from "./_components/UserStatItem";
import { User } from "@/components/PhosphorIcons";
import SidebarMenu from "@/components/SidebarMenu";
import PageTitle from "@/components/PageTitle";
import { getLoggedUserInfo } from "@/utils/getLoggedUserInfo";
import styles from "./styles.module.css";

type User = {
  name: string;
  avatarUrl: string;
  createdAt: string;
};

type Rating = {
  id: string;
  description: string;
  book: {
    author: string;
    name: string;
    coverUrl: string;
    ratings: { rate: number }[];
  };
  rate: number;
  createdAt: string;
};

type GetDataResponse = {
  userInfo: User;
  ratings: Rating[];
  userStats: {
    reviewCount: number;
    pagesReadCount: number;
    authorReadCount: number;
    mostReadCategory: string;
  };
};

export const metadata: Metadata = {
  title: "BookWise | Profile",
};

async function getData(): Promise<GetDataResponse> {
  const response = await fetch("http://localhost:3000/api/me", {
    headers: headers(),
  });
  const data = await response.json();

  return {
    userInfo: data.userInfo,
    ratings: data.ratings,
    userStats: data.userStats,
  };
}

export default async function Profile() {
  const loggedUser = await getLoggedUserInfo();

  if (!loggedUser) {
    return redirect("/home");
  }

  const { userInfo, userStats, ratings } = await getData();

  return (
    <div className={styles.main}>
      <SidebarMenu />

      <div className={styles.content}>
        <PageTitle title="Perfil" icon={User} />

        <div className={styles.contentWrapper}>
          <div className={styles.bookReviewList}>
            {ratings.length ? (
              ratings.map((rating) => (
                <BookReview
                  key={rating.id}
                  description={rating.description}
                  book={rating.book}
                  rate={rating.rate}
                  createdAt={rating.createdAt}
                />
              ))
            ) : (
              <p>Nenhuma avaliação realizada pelo usuário</p>
            )}
          </div>
          <div className={styles.userInfoAndStats}>
            <div className={styles.userInfo}>
              <Image src={userInfo.avatarUrl!} width={72} height={72} alt="" />
              <p className={styles.userName}>{userInfo.name}</p>
              <span className={styles.userJoinedDate}>
                membro desde {new Date(userInfo.createdAt).getFullYear()}
              </span>
            </div>
            <div className={styles.divider} />
            <div className={styles.userStats}>
              <UserStatItem
                icon={BookOpen}
                title="Páginas lidas"
                value={userStats.pagesReadCount}
              />
              <UserStatItem
                icon={LibraryBig}
                title="Livros avaliados"
                value={userStats.reviewCount}
              />
              <UserStatItem
                icon={UserSquare}
                title="Autores lidos"
                value={userStats.authorReadCount}
              />
              <UserStatItem
                icon={Bookmark}
                title="Categoria mais lida"
                value={userStats.mostReadCategory}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
