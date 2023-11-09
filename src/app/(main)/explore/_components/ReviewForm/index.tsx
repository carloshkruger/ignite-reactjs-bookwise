import StarsRating from "@/components/StarsRating";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";

type ReviewFormProps = {
  user: {
    avatarUrl: string;
    name: string;
  };
  onCloseReviewForm: () => void;
  onCreateReview: (data: { rate: number; content: string }) => Promise<void>;
};

export default function ReviewForm({
  user,
  onCloseReviewForm,
  onCreateReview,
}: ReviewFormProps) {
  const [selectedStars, setSelectedStars] = useState(0);

  async function handleCreateReview(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedStars) {
      toast.warning("Selecione a quantidade de estrelas.");
      return;
    }

    const reviewContent = e.currentTarget.reviewContent.value.trim();

    if (!reviewContent) {
      toast.warning("Informe o conteúdo da avaliação.");
      return;
    }

    onCreateReview({ rate: selectedStars, content: reviewContent });
  }

  function handleSelectedStars(stars: number) {
    setSelectedStars(stars);
  }

  function handleCloseReviewForm() {
    onCloseReviewForm();
  }

  return (
    <form className={styles.form} onSubmit={handleCreateReview}>
      <div className={styles.formHeader}>
        <div className={styles.userInfo}>
          <Image src={user.avatarUrl} alt="" width={40} height={40} />
          <strong>{user.name}</strong>
        </div>
        <StarsRating stars={selectedStars} onSelect={handleSelectedStars} />
      </div>
      <textarea name="reviewContent" placeholder="Escreva sua avaliação" />
      <div className={styles.formFooter}>
        <button
          onClick={handleCloseReviewForm}
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
  );
}
