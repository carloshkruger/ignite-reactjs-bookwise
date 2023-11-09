"use client";

import styles from "./styles.module.css";
import { useRouter, useSearchParams } from "next/navigation";

type CategoriesListProps = {
  categories: {
    id: string;
    name: string;
  }[];
};

export default function CategoriesList({ categories }: CategoriesListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategoryId = searchParams.get("categoryId") || null;

  function handleSelectedCategory(categoryId: string) {
    if (selectedCategoryId === categoryId) {
      router.push("/explore");
      return;
    }

    const newParams = new URLSearchParams();
    newParams.set("categoryId", categoryId);

    router.push(`/explore?${newParams.toString()}`);
  }

  return (
    <div className={styles.categoriesList}>
      {categories.map((category) => (
        <button
          onClick={() => handleSelectedCategory(category.id)}
          key={category.id}
          type="button"
          className={`${styles.categoryItem} ${
            selectedCategoryId === category.id ? styles.selected : ""
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
