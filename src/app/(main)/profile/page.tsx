import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { BookOpen, Bookmark, LibraryBig, UserSquare } from "lucide-react";
import BookReview from "./_components/BookReview";
import UserStatItem from "./_components/UserStatItem";
import { User } from "@/components/PhosphorIcons";
import PageTitle from "@/components/PageTitle";
import { getLoggedUserInfo } from "@/utils/getLoggedUserInfo";
import styles from "./styles.module.css";
import { getProfileInfo } from "@/lib/data/user";

export const metadata: Metadata = {
  title: "BookWise | Profile",
};

export default async function Profile() {
  const loggedUser = await getLoggedUserInfo();

  if (!loggedUser) {
    return redirect("/home");
  }

  const { userInfo, userStats, ratings } = await getProfileInfo();

  return (
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
              membro desde {userInfo.createdAt.getFullYear()}
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
  );
}
