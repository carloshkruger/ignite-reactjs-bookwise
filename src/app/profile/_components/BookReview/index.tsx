import Image from "next/image";
import styles from "./styles.module.css";
import StarsRating from "@/components/StarsRating";

type BookReviewProps = {
  book: {
    name: string;
    author: string;
    coverUrl: string;
    ratings: { rate: number }[];
  };
  description: string;
  createdAt: string;
};

export default function BookReview({
  book,
  description,
  createdAt,
}: BookReviewProps) {
  return (
    <div>
      <span className={styles.creationDate}>{createdAt}</span>
      <div className={styles.container}>
        <div className={styles.header}>
          <Image src={book.coverUrl} width={98} height={134} alt="" />
          <div className={styles.bookInfo}>
            <div className={styles.bookTitleContainer}>
              <strong className={styles.bookTitle}>{book.name}</strong>
              <span className={styles.authorName}>{book.author}</span>
            </div>
            <StarsRating stars={4} />
          </div>
        </div>
        <p className={styles.reviewDescription}>{description}</p>
      </div>
    </div>
  );
}
