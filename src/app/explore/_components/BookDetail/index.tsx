import { BookOpen, Bookmark, Check, X } from "lucide-react";
import styles from "./book-detail.module.css";
import Image, { StaticImageData } from "next/image";
import ReviewCard from "../ReviewCard";
import { FormEvent, useEffect, useState } from "react";
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
  const [selectedStars, setSelectedStars] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(true);

  useEffect(() => {
    function escListener(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", escListener);

    return () => window.removeEventListener("keydown", escListener);
  }, [onClose]);

  function handleShowReviewForm() {
    if (showReviewForm) {
      setSelectedStars(0);
    }
    setShowReviewForm((state) => !state);
  }

  function handleCreateReview(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedStars) {
      alert("Selecione a quantidade de estrelas.");
      return;
    }

    const reviewContent = e.currentTarget.reviewContent.value.trim();

    if (!reviewContent) {
      alert("Informe o conteúdo da avaliação.");
      return;
    }

    handleShowReviewForm();
  }

  function handleSelectedStars(stars: number) {
    setSelectedStars(stars);
  }

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
          {!showReviewForm && (
            <button onClick={handleShowReviewForm} type="button">
              Avaliar
            </button>
          )}
        </div>

        {showReviewForm && (
          <form className={styles.form} onSubmit={handleCreateReview}>
            <div className={styles.formHeader}>
              <div className={styles.userInfo}>
                <img src="https://github.com/carloshkruger.png" alt="" />
                <strong>Carlos Henrique Kruger</strong>
              </div>
              <StarsRating
                stars={selectedStars}
                onSelect={handleSelectedStars}
              />
            </div>
            <textarea
              name="reviewContent"
              placeholder="Escreva sua avaliação"
            />
            <div className={styles.formFooter}>
              <button
                onClick={handleShowReviewForm}
                type="button"
                className={styles.cancelButton}
              >
                <X />
              </button>
              <button type="submit" className={styles.submitButton}>
                <Check />
              </button>
            </div>
          </form>
        )}

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
