import { BookOpen, Bookmark, Star, X } from "lucide-react";
import styles from "./book-detail.module.css";
import Image, { StaticImageData } from "next/image";
import ReviewCard from "../ReviewCard";
import { useEffect } from "react";
import StarsRating from "@/components/StarsRating";

export type BookDetailProps = {
  onClose: () => void;
  details: {
    id: string;
    title: string;
    author: string;
    imageUrl: string | StaticImageData;
    stars: number;
    categories: string[];
    pages: number;
    reviews: {
      author: {
        name: string;
        avatarUrl: string;
      };
      date: Date;
      stars: number;
      content: string;
    }[];
  };
};

export default function BookDetail({ details, onClose }: BookDetailProps) {
  useEffect(() => {
    function escListener(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", escListener);

    return () => window.removeEventListener("keydown", escListener);
  }, [onClose]);

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        <div className={styles.bookInfoContainer}>
          <div className={styles.bookInfoContent}>
            <Image src={details.imageUrl} alt="" width={171} height={242} />
            <div className={styles.bookInfo}>
              <div>
                <strong className={styles.bookTitle}>{details.title}</strong>
                <span className={styles.authorName}>{details.author}</span>
              </div>
              <div>
                <StarsRating stars={details.stars} />
                <span className={styles.reviewCount}>3 avaliações</span>
              </div>
            </div>
          </div>
          <div className={styles.bookInfoFooter}>
            <div className={styles.bookInfoFooterItem}>
              <Bookmark />
              <div>
                <p>Categoria</p>
                <span>{details.categories.join(", ")}</span>
              </div>
            </div>
            <div className={styles.bookInfoFooterItem}>
              <BookOpen />
              <div>
                <p>Páginas</p>
                <span>{details.pages}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.reviewTitle}>
          <p>Avaliações</p>
          <button type="button">Avaliar</button>
        </div>

        <div className={styles.reviewList}>
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </div>
    </>
  );
}
