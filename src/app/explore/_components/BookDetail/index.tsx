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
    name: string;
    author: string;
    coverUrl: string | StaticImageData;
    categories: { category: { id: string; name: string } }[];
    totalPages: number;
    ratings: {
      id: string;
      user: {
        id: string;
        name: string;
        avatarUrl: string;
      };
      createdAt: string;
      rate: number;
      description: string;
    }[];
  };
};

export default function BookDetail({ details, onClose }: BookDetailProps) {
  const [selectedStars, setSelectedStars] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

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

  const ratingQuantity = details.ratings.length;
  const totalRate =
    details.ratings.reduce((agg, cur) => agg + cur.rate, 0) / ratingQuantity;
  const reviewsText = ratingQuantity > 1 ? "avaliações" : "avaliação";

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        <div className={styles.bookInfoContainer}>
          <div className={styles.bookInfoContent}>
            <Image src={details.coverUrl} alt="" width={171} height={242} />
            <div className={styles.bookInfo}>
              <div>
                <strong className={styles.bookTitle}>{details.name}</strong>
                <span className={styles.authorName}>{details.author}</span>
              </div>
              <div>
                <StarsRating stars={totalRate} />
                <span className={styles.reviewCount}>
                  {ratingQuantity} {reviewsText}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.bookInfoFooter}>
            <div className={styles.bookInfoFooterItem}>
              <Bookmark />
              <div>
                <p>Categoria</p>
                <span>
                  {details.categories
                    .map((category) => category.category.name)
                    .join(", ")}
                </span>
              </div>
            </div>
            <div className={styles.bookInfoFooterItem}>
              <BookOpen />
              <div>
                <p>Páginas</p>
                <span>{details.totalPages}</span>
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
                <Image
                  src="https://github.com/carloshkruger.png"
                  alt=""
                  width={40}
                  height={40}
                />
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
          {details.ratings.map((rating) => (
            <ReviewCard key={rating.id} rating={rating} />
          ))}
        </div>
      </div>
    </>
  );
}
