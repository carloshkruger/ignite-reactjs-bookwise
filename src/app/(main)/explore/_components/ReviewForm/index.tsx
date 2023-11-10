import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import StarsRating from "@/components/StarsRating";
import { ReviewSchemaType, reviewSchema } from "@/lib/types/review";
import styles from "./styles.module.css";
import InputErrorMessage from "@/components/InputErrorMessage";

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
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm<ReviewSchemaType>({
    resolver: zodResolver(reviewSchema),
  });

  async function handleCreateReview(data: ReviewSchemaType) {
    await onCreateReview({ rate: data.rate, content: data.description });
    reset();
  }

  function handleCloseReviewForm() {
    onCloseReviewForm();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleCreateReview)}>
      <div className={styles.formHeader}>
        <div className={styles.userInfo}>
          <Image src={user.avatarUrl} alt="" width={40} height={40} />
          <strong>{user.name}</strong>
        </div>
        <Controller
          control={control}
          name="rate"
          render={({ field }) => (
            <StarsRating
              {...field}
              stars={field.value}
              onSelect={(rate: number) => field.onChange(rate)}
            />
          )}
        />
      </div>
      <textarea
        {...register("description")}
        name="description"
        placeholder="Escreva sua avaliação"
      />

      <InputErrorMessage message={errors.rate?.message} />
      <InputErrorMessage message={errors.description?.message} />

      <div className={styles.formFooter}>
        <button
          onClick={handleCloseReviewForm}
          type="button"
          className={styles.cancelButton}
          disabled={isSubmitting}
        >
          <X />
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          <Check />
        </button>
      </div>
    </form>
  );
}
