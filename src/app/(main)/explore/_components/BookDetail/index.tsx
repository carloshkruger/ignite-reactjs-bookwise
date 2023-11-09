import { BookOpen, Bookmark, X } from "lucide-react";
import styles from "./styles.module.css";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import StarsRating from "@/components/StarsRating";
import { useSession } from "next-auth/react";
import ReviewList, { Rating } from "../ReviewList";
import ReviewForm from "../ReviewForm";
import { toast } from "react-toastify";

type BookDetails = {
  id: string;
  name: string;
  author: string;
  coverUrl: string | StaticImageData;
  categories: { category: { id: string; name: string } }[];
  totalPages: number;
  ratings: Rating[];
};

export type BookDetailProps = {
  onClose: () => void;
  bookId: string;
};

export default function BookDetail({ bookId, onClose }: BookDetailProps) {
  const [book, setBook] = useState<BookDetails | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { data, status } = useSession();

  const isUserAuthenticated = status === "authenticated";
  const isLoading = !book;

  useEffect(() => {
    fetch(`/api/books/${bookId}`)
      .then((response) => response.json())
      .then((response) => setBook(response));
  }, [bookId]);

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
      toast.warning("Você precisa estar logado para avaliar.");
      return;
    }
    setShowReviewForm((state) => !state);
  }

  async function handleCreateReview({
    rate,
    content,
  }: {
    rate: number;
    content: string;
  }) {
    const response = await fetch("/api/ratings", {
      method: "POST",
      body: JSON.stringify({
        description: content,
        rate,
        bookId,
      }),
    });

    if (!response.ok) {
      toast.error("Ocorreu um erro ao salvar a avaliação");
      return;
    }

    toast.success("Avaliação cadastrada com sucesso");

    const newRating = await response.json();

    setBook((book) => ({
      ...book!,
      ratings: [newRating, ...book!.ratings],
    }));

    handleShowReviewForm();
  }

  if (isLoading) {
    return (
      <>
        <div className={styles.overlay} />
        <div className={styles.container}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            <X size={24} />
          </button>
          <div className={styles.loadingContainer}>Carregando...</div>
        </div>
      </>
    );
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
          <ReviewForm
            user={{
              name: data?.user?.name!,
              avatarUrl: data?.user?.image!,
            }}
            onCreateReview={handleCreateReview}
            onCloseReviewForm={handleShowReviewForm}
          />
        )}

        <ReviewList ratings={book.ratings} />
      </div>
    </>
  );
}
