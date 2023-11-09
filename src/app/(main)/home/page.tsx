import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BookCard from "@/components/BookCard";
import PageTitle from "@/components/PageTitle";
import RecentReviewCard from "./_components/RecentReviewCard";
import { ChartLineUp } from "@/components/PhosphorIcons";
import styles from "./styles.module.css";

type Book = {
  id: string;
  name: string;
  author: string;
  coverUrl: string;
  rate: number;
};

type Review = {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  book: {
    name: string;
    author: string;
    coverUrl: string;
  };
  createdAt: string;
  rate: number;
  description: string;
};

type GetDataResponse = {
  popularBooks: Book[];
  recentReviews: Review[];
};

async function getData(): Promise<GetDataResponse> {
  const response = await fetch("http://localhost:3000/api/home");
  const data = await response.json();

  return {
    popularBooks: data.popularBooks,
    recentReviews: data.recentReviews,
  };
}

export default async function Home() {
  const { popularBooks, recentReviews } = await getData();

  return (
    <div className={styles.content}>
      <PageTitle title="Início" icon={ChartLineUp} />

      <div className={styles.contentWrapper}>
        <div>
          <p className={styles.recentReviewTitle}>Avaliações mais recentes</p>

          <div className={styles.recentReviewListContainer}>
            {recentReviews.map((review) => (
              <RecentReviewCard key={review.id} review={review} />
            ))}
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
            {popularBooks.map((book) => (
              <BookCard
                key={book.id}
                name={book.name}
                author={book.author}
                image={book.coverUrl}
                rate={book.rate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
