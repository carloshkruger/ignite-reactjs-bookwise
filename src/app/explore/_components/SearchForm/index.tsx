"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";
import { SearchIcon } from "lucide-react";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const search = e.currentTarget.search.value;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search) {
      newParams.set("q", search);
    } else {
      newParams.delete("q");
    }

    router.push(`/explore?${newParams.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.inputWrapper}>
        <input name="search" placeholder="Buscar livro" />
        <SearchIcon />
      </div>
    </form>
  );
}
