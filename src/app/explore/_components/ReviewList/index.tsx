import ReviewCard from "../ReviewCard";
import styles from "./styles.module.css";

export type Rating = {
  id: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
  rate: number;
  description: string;
};

type ReviewListProps = {
  ratings: Rating[];
};

export default function ReviewList({ ratings }: ReviewListProps) {
  return (
    <div className={styles.reviewList}>
      {ratings.map((rating) => (
        <ReviewCard key={rating.id} rating={rating} />
      ))}
    </div>
  );
}
