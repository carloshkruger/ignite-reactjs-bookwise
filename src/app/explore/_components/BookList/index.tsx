"use client";

import BookCard from "@/components/BookCard";

import styles from "../../styles.module.css";
import { useState } from "react";
import BookDetail from "../BookDetail";

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
      <div className={styles.bookList}>
        {books.map((book: Book) => (
          <BookCard
            key={book.id}
            name={book.name}
            authorName={book.author}
            image={book.coverUrl}
            stars={book.rate}
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
