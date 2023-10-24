import { Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import styles from "./book-card.module.css";

type BookCardProps = {
  name: string;
  image: string | StaticImageData;
  authorName: string;
  stars: number;
  alreadyRead?: boolean;
};

export default function BookCard({
  name,
  authorName,
  image,
  stars,
  alreadyRead = false,
}: BookCardProps) {
  return (
    <div className={styles.container}>
      <Image src={image} alt="" width={64} height={94} />
      <div>
        <div className={styles.bookInfo}>
          <strong>{name}</strong>
          <span>{authorName}</span>
        </div>
        <div className={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Star size={16} key={item} fill={item <= stars ? "#8381d9" : ""} />
          ))}
        </div>
        {alreadyRead && <div className={styles.alreadyRead}>LIDO</div>}
      </div>
    </div>
  );
}
