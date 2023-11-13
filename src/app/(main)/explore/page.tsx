import { Metadata } from "next";
import CategoriesList from "./_components/CategoriesList";
import BookList from "./_components/BookList";
import SearchForm from "./_components/SearchForm";
import PageTitle from "../../../components/PageTitle";
import { Binoculars } from "@/components/PhosphorIcons";
import { getBooks } from "@/lib/data/books";
import { getCategories } from "@/lib/data/categories";
import styles from "./styles.module.css";

type SearchParams = {
  categoryId?: string;
  q?: string;
};

type ExploreParams = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: "BookWise | Explore",
  description:
    "Explore the list of books and filter by categories or search by book title",
};

export default async function Explore({
  searchParams: { categoryId, q: query },
}: ExploreParams) {
  const [books, categories] = await Promise.all([
    getBooks({ categoryId, query }),
    getCategories(),
  ]);

  return (
    <div className={styles.content}>
      <div className={styles.pageHeader}>
        <PageTitle title="Explorar" icon={Binoculars} />
        <SearchForm />
      </div>
      <CategoriesList categories={categories} />
      <BookList books={books} />
    </div>
  );
}
