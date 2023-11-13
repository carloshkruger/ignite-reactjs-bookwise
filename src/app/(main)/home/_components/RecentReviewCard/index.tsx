import Image from "next/image";
import styles from "./styles.module.css";
import StarsRating from "@/components/StarsRating";
import { formatDistanceToNow } from "@/utils/date";

type RecentReviewCardProps = {
  review: {
    user: {
      name: string;
      avatarUrl: string | null;
    };
    book: {
      name: string;
      author: string;
      coverUrl: string;
    };
    createdAt: Date;
    rate: number;
    description: string;
  };
};

export default function RecentReviewCard({ review }: RecentReviewCardProps) {
  const creationDate = formatDistanceToNow(review.createdAt);

  return (
    <div className={styles.recentReviewCard}>
      <div className={styles.recentReviewCardHeader}>
        <div className={styles.recentReviewCardHeaderInfo}>
          <Image
            src={review.user.avatarUrl || ""}
            alt=""
            width={40}
            height={40}
          />
          <div>
            <p>{review.user.name}</p>
            <span title={review.createdAt.toString()}>{creationDate}</span>
          </div>
        </div>
        <StarsRating stars={review.rate} starsSize={24} />
      </div>
      <div className={styles.recentReviewCardContent}>
        <Image src={review.book.coverUrl} alt="" height={152} width={108} />
        <div>
          <strong>{review.book.name}</strong>
          <span>{review.book.author}</span>
          <p>{review.description}</p>
        </div>
      </div>
    </div>
  );
}
