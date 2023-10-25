"use client";

import styles from "./home.module.css";
import PageTitle from "./PageTitle";
import RecentReviewCard from "./RecentReviewCard";

import Hobbit from "../../../public/images/books/o-hobbit.png";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SidebarMenu from "@/components/SidebarMenu";
import BookCard from "@/components/BookCard";

export default function Home() {
  return (
    <div className={styles.main}>
      <SidebarMenu />

      <div className={styles.content}>
        <PageTitle />

        <p className={styles.recentReviewTitle}>Avaliações mais recentes</p>

        <div className={styles.recentReviewListContainer}>
          <RecentReviewCard
            review={{
              author: {
                avatarUrl: "https://github.com/carloshkruger.png",
                name: "Carlos henrique",
              },
              book: {
                name: "O Hobbit",
                authorName: "J.R.R. Tolkien",
              },
              content: `Semper et sapien proin vitae nisi. Feugiat neque integer donec et
              aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo
              a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed
              vulputate massa velit nibh Semper et sapien proin vitae nisi.
              Feugiat neque integer donec et aenean posuere amet ultrices. Cras
              fermentum id pulvinar varius leo a in. Amet libero pharetra nunc
              elementum fringilla velit ipsum. Sed vulputate massa velit nibh
              Semper et sapien proin vitae nisi. Feugiat neque integer donec et
              aenean posuere amet ultrices.`,
              date: new Date(),
              stars: 4,
              image: Hobbit,
            }}
          />
        </div>
      </div>
      <div className={styles.popularBooksContainer}>
        <div className={styles.popularBooksContainerTitle}>
          <strong>Livros populares</strong>
          <Link href="explore" className={styles.seeMore}>
            Ver todos
            <ChevronRight />
          </Link>
        </div>

        <div className={styles.popularBooksContainerList}>
          <BookCard
            name="A revolução dos bichos"
            authorName="George Orwell"
            image={Hobbit}
            stars={4}
          />

          <BookCard
            name="A revolução dos bichos"
            authorName="George Orwell"
            image={Hobbit}
            stars={4}
          />

          <BookCard
            name="A revolução dos bichos"
            authorName="George Orwell"
            image={Hobbit}
            stars={4}
          />

          <BookCard
            name="A revolução dos bichos"
            authorName="George Orwell"
            image={Hobbit}
            stars={4}
          />
        </div>
      </div>
    </div>
  );
}
