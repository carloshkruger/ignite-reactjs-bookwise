"use client";

import { useState } from "react";
import BookCard from "@/components/BookCard";
import BookDetail from "../BookDetail";
import styles from "./styles.module.css";

type Book = {
  id: string;
  name: string;
  author: string;
  coverUrl: string;
  rate: number;
};

type BookListProps = {
  books: Book[];
};

export default function BookList({ books }: BookListProps) {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  async function handleSelectedBook(id: string) {
    setSelectedBookId(id);
  }

  function handleCloseBookDetails() {
    setSelectedBookId(null);
  }

  return (
    <>
      <div className={styles.container}>
        {books.map((book: Book) => (
          <BookCard
            key={book.id}
            name={book.name}
            author={book.author}
            image={book.coverUrl}
            rate={book.rate}
            onClick={() => handleSelectedBook(book.id)}
          />
        ))}
      </div>
      {!!selectedBookId && (
        <BookDetail bookId={selectedBookId} onClose={handleCloseBookDetails} />
      )}
    </>
  );
}
