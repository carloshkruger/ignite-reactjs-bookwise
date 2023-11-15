import { BookOpen, Bookmark } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import StarsRating from "@/components/StarsRating";
import { useSession } from "next-auth/react";
import ReviewList, { Rating } from "../ReviewList";
import ReviewForm from "../ReviewForm";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/providers/ReactQuery";
import BookDetailLayout from "./layout";
import styles from "./styles.module.css";

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

const FIVE_MINUTES_IN_MS = 5 * 60 * 60;

export default function BookDetail({ bookId, onClose }: BookDetailProps) {
  const queryKey = `books-${bookId}`;

  const {
    isLoading,
    isError,
    data: book,
  } = useQuery<BookDetails>({
    queryKey: [queryKey],
    queryFn: () =>
      fetch(`/api/books/${bookId}`).then((response) => response.json()),
    staleTime: FIVE_MINUTES_IN_MS,
  });
  const mutation = useMutation({
    mutationFn: handleCreateReview,
    onSuccess: (data) => {
      queryClient.setQueryData([queryKey], (old: BookDetails) => ({
        ...old,
        ratings: [data, ...old.ratings],
      }));
    },
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { data: sessionData, status } = useSession();
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

    handleShowReviewForm();
    const newRating = await response.json();
    return newRating;
  }

  if (isLoading) {
    return (
      <BookDetailLayout onClose={onClose}>
        <div className={styles.loadingContainer}>Carregando...</div>
      </BookDetailLayout>
    );
  }

  if (isError || !book) {
    return (
      <BookDetailLayout onClose={onClose}>
        <div className={styles.loadingContainer}>
          Ocorreu algum erro ao carregar as informações
        </div>
      </BookDetailLayout>
    );
  }

  const ratingQuantity = book.ratings.length;
  const totalRate =
    book.ratings.reduce((agg, cur) => agg + cur.rate, 0) / ratingQuantity;
  const reviewsText = ratingQuantity > 1 ? "avaliações" : "avaliação";
  const categoriesText = book.categories
    .map((category) => category.category.name)
    .join(", ");

  return (
    <BookDetailLayout onClose={onClose}>
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
              <span>{categoriesText}</span>
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
            name: sessionData?.user?.name!,
            avatarUrl: sessionData?.user?.image!,
          }}
          onCreateReview={mutation.mutateAsync}
          onCloseReviewForm={handleShowReviewForm}
        />
      )}

      <ReviewList ratings={book.ratings} />
    </BookDetailLayout>
  );
}
