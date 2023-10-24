"use client";

import styles from "./explore.module.css";
import PageTitle from "./PageTitle";
import SidebarMenu from "@/components/SidebarMenu";
import BookCard from "@/components/BookCard";

import Hobbit from "../../../public/books/o-hobbit.png";
import { useState } from "react";
import BookDetail, { BookDetailProps } from "./_components/BookDetail";

export default function Explore() {
  const [selectedBookDetails, setSelectedBookDetails] = useState<
    BookDetailProps["details"] | null
  >(null);

  function handleSelectedBookDetails(id: string) {
    setSelectedBookDetails({
      title: "14 Hábitos de Desenvolvedores Altamente Produtivos",
      author: "Zeno Rocha",
      categories: ["Computação", "Educação"],
      id,
      pages: 160,
      reviews: [],
      stars: 4,
      imageUrl: Hobbit,
    });
  }

  function handleCloseBookDetails() {
    setSelectedBookDetails(null);
  }

  return (
    <div className={styles.main}>
      <SidebarMenu />

      <div className={styles.content}>
        <PageTitle />

        <div className={styles.categoriesList}>
          <button type="button" className={styles.categoryItem}>
            Tudo
          </button>
          <button type="button" className={styles.categoryItem}>
            Computação
          </button>
          <button type="button" className={styles.categoryItem}>
            Educação
          </button>
          <button type="button" className={styles.categoryItem}>
            Fantasia
          </button>
          <button type="button" className={styles.categoryItem}>
            Ficção científica
          </button>
        </div>

        <div className={styles.bookList}>
          <BookCard
            name="A revolução dos bichos"
            authorName="George Orwell"
            image={Hobbit}
            stars={4}
            onClick={() => handleSelectedBookDetails("1")}
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

      {!!selectedBookDetails && (
        <BookDetail
          details={selectedBookDetails}
          onClose={handleCloseBookDetails}
        />
      )}
    </div>
  );
}
