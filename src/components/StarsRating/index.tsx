import { Star } from "lucide-react";
import styles from "./stars-rating.module.css";

type StarsRating = {
  stars: number;
  starsSize?: number;
};

const COLOR_PURPLE_100 = "#8381d9";

export default function StarsRating({ stars, starsSize = 16 }: StarsRating) {
  return (
    <div className={styles.container}>
      {[1, 2, 3, 4, 5].map((item) => (
        <Star
          size={starsSize}
          key={item}
          fill={item <= stars ? COLOR_PURPLE_100 : ""}
        />
      ))}
    </div>
  );
}
