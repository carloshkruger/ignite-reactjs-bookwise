import styles from "./review-card.module.css";
import StarsRating from "@/components/StarsRating";

export default function ReviewCard() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <img src="https://github.com/carloshkruger.png" alt="" />
          <div>
            <p>asdasd</p>
            <span>{new Date().toDateString()}</span>
          </div>
        </div>
        <StarsRating stars={4} />
      </div>

      <div className={styles.content}>
        Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis.
        Penatibus id vestibulum imperdiet a at imperdiet lectus leo. Sit porta
        eget nec vitae sit vulputate eget
      </div>
    </div>
  );
}
