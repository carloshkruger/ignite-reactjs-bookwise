import Image from "next/image";
import styles from "./styles.module.css";
import StarsRating from "@/components/StarsRating";
import { formatDistanceToNow } from "@/utils/date";

type Rating = {
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

type ReviewCardProps = {
  rating: Rating;
};

export default function ReviewCard({ rating }: ReviewCardProps) {
  const creationDate = formatDistanceToNow(new Date(rating.createdAt));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <Image src={rating.user.avatarUrl} alt="" width={40} height={40} />
          <div>
            <p>{rating.user.name}</p>
            <span title={rating.createdAt}>{creationDate}</span>
          </div>
        </div>
        <StarsRating stars={rating.rate} />
      </div>

      <div className={styles.content}>{rating.description}</div>
    </div>
  );
}
