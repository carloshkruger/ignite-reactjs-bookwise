import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BookCard from "@/components/BookCard";
import PageTitle from "@/components/PageTitle";
import RecentReviewCard from "./_components/RecentReviewCard";
import { ChartLineUp } from "@/components/PhosphorIcons";
import { getPopularBooks, getRecentReviews } from "@/lib/data/books";
import styles from "./styles.module.css";

export default async function Home() {
  const [popularBooks, recentReviews] = await Promise.all([
    getPopularBooks(),
    getRecentReviews(),
  ]);

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
