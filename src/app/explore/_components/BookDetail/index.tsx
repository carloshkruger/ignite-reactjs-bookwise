import { BookOpen, Bookmark, Check, X } from "lucide-react";
import styles from "./book-detail.module.css";
import Image, { StaticImageData } from "next/image";
import { FormEvent, useEffect, useState } from "react";
import StarsRating from "@/components/StarsRating";
import { useSession } from "next-auth/react";
import ReviewList, { Rating } from "../ReviewList";

export type BookDetailProps = {
  onClose: () => void;
  details: {
    id: string;
    name: string;
    author: string;
    coverUrl: string | StaticImageData;
    categories: { category: { id: string; name: string } }[];
    totalPages: number;
    ratings: Rating[];
  };
};

export default function BookDetail({ details, onClose }: BookDetailProps) {
  const [book, setBook] = useState(details);
  const [selectedStars, setSelectedStars] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { data, status } = useSession();

  const isUserAuthenticated = status === "authenticated";

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
    if (!isUserAuthenticated) {
      alert("Você precisa estar logado para avaliar.");
      return;
    }
    if (showReviewForm) {
      setSelectedStars(0);
    }
    setShowReviewForm((state) => !state);
  }

  async function handleCreateReview(e: FormEvent<HTMLFormElement>) {
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

    const response = await fetch("http://localhost:3000/api/ratings", {
      method: "POST",
      body: JSON.stringify({
        description: reviewContent,
        rate: selectedStars,
        bookId: book.id,
      }),
    });

    if (!response.ok) {
      alert("Ocorreu um erro ao salvar a avaliação");
      return;
    }

    const newRating = await response.json();

    setBook((book) => ({
      ...book,
      ratings: [newRating, ...book.ratings],
    }));

    handleShowReviewForm();
  }

  function handleSelectedStars(stars: number) {
    setSelectedStars(stars);
  }

  const ratingQuantity = book.ratings.length;
  const totalRate =
    book.ratings.reduce((agg, cur) => agg + cur.rate, 0) / ratingQuantity;
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
            <Image src={book.coverUrl} alt="" width={171} height={242} />
            <div className={styles.bookInfo}>
              <div>
                <strong className={styles.bookTitle}>{book.name}</strong>
                <span className={styles.authorName}>{book.author}</span>
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
                  {book.categories
                    .map((category) => category.category.name)
                    .join(", ")}
                </span>
              </div>
            </div>
            <div className={styles.bookInfoFooterItem}>
              <BookOpen />
              <div>
                <p>Páginas</p>
                <span>{book.totalPages}</span>
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

        {showReviewForm && isUserAuthenticated && (
          <form className={styles.form} onSubmit={handleCreateReview}>
            <div className={styles.formHeader}>
              <div className={styles.userInfo}>
                <Image src={data?.user?.image!} alt="" width={40} height={40} />
                <strong>{data?.user?.name}</strong>
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

        <ReviewList ratings={book.ratings} />
      </div>
    </>
  );
}
