import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import SidebarMenu from "@/components/SidebarMenu";
import BookCard from "@/components/BookCard";
import PageTitle from "./_components/PageTitle";
import RecentReviewCard from "./_components/RecentReviewCard";
import styles from "./styles.module.css";

const prismaClient = new PrismaClient();

async function getData() {
  const books = await prismaClient.book.findMany({
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
        in: books.map((book) => book.id),
      },
    },
  });

  const recentReviews = await prismaClient.rating.findMany({
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
  });

  return {
    popularBooks: books.map((book) => ({
      ...book,
      rate:
        bookRatings.find((rating) => rating.bookId === book.id)?._avg?.rate ??
        0,
    })),
    recentReviews,
  };
}

export default async function Home() {
  const { popularBooks, recentReviews } = await getData();

  return (
    <div className={styles.main}>
      <SidebarMenu />

      <div className={styles.content}>
        <PageTitle />

        <div className={styles.contentWrapper}>
          <div>
            <p className={styles.recentReviewTitle}>Avaliações mais recentes</p>

            <div className={styles.recentReviewListContainer}>
              {recentReviews.map((review) => (
                <RecentReviewCard
                  key={review.id}
                  review={{
                    author: {
                      avatarUrl: review.user.avatarUrl || "",
                      name: review.user.name,
                    },
                    book: {
                      name: review.book.name,
                      authorName: review.book.author,
                      coverUrl: review.book.coverUrl,
                    },
                    content: review.description,
                    date: review.createdAt.toDateString(),
                    stars: review.rate,
                  }}
                />
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
                  authorName={book.author}
                  image={book.coverUrl}
                  stars={book.rate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
