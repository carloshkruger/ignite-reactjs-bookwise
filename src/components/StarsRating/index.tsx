import { Star } from "lucide-react";
import styles from "./stars-rating.module.css";
import { useState } from "react";

type StarsRating = {
  stars: number;
  starsSize?: number;
  onSelect?: (stars: number) => void;
};

const COLOR_PURPLE_100 = "#8381d9";

export default function StarsRating({
  stars = 0,
  starsSize = 16,
  onSelect,
}: StarsRating) {
  const [selectedStar, setSelectedStar] = useState(stars);

  const isInteractive = !!onSelect;

  function handleSelect(stars: number) {
    if (!isInteractive) {
      return;
    }
    if (stars === selectedStar) {
      stars = 0;
    }
    onSelect(stars);
    setSelectedStar(stars);
  }

  return (
    <div
      className={`${styles.container} ${
        isInteractive ? styles.interactive : ""
      }`}
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <Star
          onClick={() => handleSelect(item)}
          size={starsSize}
          key={item}
          fill={item <= selectedStar ? COLOR_PURPLE_100 : ""}
        />
      ))}
    </div>
  );
}
