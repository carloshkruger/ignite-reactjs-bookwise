"use client";

import BookCard from "@/components/BookCard";

import styles from "../../explore.module.css";
import { useState } from "react";
import BookDetail, { BookDetailProps } from "../BookDetail";

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
  const [selectedBookDetails, setSelectedBookDetails] = useState<
    BookDetailProps["details"] | null
  >(null);

  async function handleSelectedBookDetails(id: string) {
    const response = await fetch(`http://localhost:3000/api/books/${id}`);
    const data = await response.json();
    setSelectedBookDetails(data);
  }

  function handleCloseBookDetails() {
    setSelectedBookDetails(null);
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
            onClick={() => handleSelectedBookDetails(book.id)}
          />
        ))}
      </div>
      {!!selectedBookDetails && (
        <BookDetail
          details={selectedBookDetails}
          onClose={handleCloseBookDetails}
        />
      )}
    </>
  );
}
