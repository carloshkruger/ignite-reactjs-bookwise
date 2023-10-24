import { Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import styles from "./recent-view-card.module.css";

type RecentReviewCardProps = {
  review: {
    author: {
      name: string;
      avatarUrl: string;
    };
    book: {
      name: string;
      authorName: string;
    };
    image: string | StaticImageData;
    date: Date;
    stars: number;
    content: string;
  };
};

export default function RecentReviewCard({ review }: RecentReviewCardProps) {
  return (
    <div className={styles.recentReviewCard}>
      <div className={styles.recentReviewCardHeader}>
        <div className={styles.recentReviewCardHeaderInfo}>
          <img src={review.author.avatarUrl} alt="" />
          <div>
            <p>{review.author.name}</p>
            <span>{review.date.toDateString()}</span>
          </div>
        </div>
        <div className={styles.recentReviewCardHeaderStars}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Star key={item} fill={item <= review.stars ? "#8381d9" : ""} />
          ))}
        </div>
      </div>
      <div className={styles.recentReviewCardContent}>
        <Image src={review.image} alt="" height={152} width={108} />
        <div>
          <strong>{review.book.name}</strong>
          <span>{review.book.authorName}</span>
          <p>{review.content}</p>
        </div>
      </div>
    </div>
  );
}
