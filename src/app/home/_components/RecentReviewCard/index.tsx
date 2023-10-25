import Image from "next/image";
import styles from "./styles.module.css";
import StarsRating from "@/components/StarsRating";

type RecentReviewCardProps = {
  review: {
    author: {
      name: string;
      avatarUrl: string;
    };
    book: {
      name: string;
      authorName: string;
      coverUrl: string;
    };
    date: string;
    stars: number;
    content: string;
  };
};

export default function RecentReviewCard({ review }: RecentReviewCardProps) {
  return (
    <div className={styles.recentReviewCard}>
      <div className={styles.recentReviewCardHeader}>
        <div className={styles.recentReviewCardHeaderInfo}>
          <Image src={review.author.avatarUrl} alt="" width={40} height={40} />
          <div>
            <p>{review.author.name}</p>
            <span>{review.date}</span>
          </div>
        </div>
        <StarsRating stars={review.stars} starsSize={24} />
      </div>
      <div className={styles.recentReviewCardContent}>
        <Image src={review.book.coverUrl} alt="" height={152} width={108} />
        <div>
          <strong>{review.book.name}</strong>
          <span>{review.book.authorName}</span>
          <p>{review.content}</p>
        </div>
      </div>
    </div>
  );
}
