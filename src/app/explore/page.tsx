import { Metadata } from "next";
import SidebarMenu from "@/components/SidebarMenu";
import CategoriesList from "./_components/CategoriesList";
import BookList from "./_components/BookList";
import SearchForm from "./_components/SearchForm";
import PageTitle from "../../components/PageTitle";
import { Binoculars } from "@/components/PhosphorIcons";
import styles from "./styles.module.css";

async function getData(categoryId: string = "", query: string = "") {
  const response = await fetch(
    `http://localhost:3000/api/explore?categoryId=${categoryId}&q=${query}`
  );
  const data = await response.json();

  return {
    books: data.books,
    categories: data.categories,
  };
}

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
  const { books, categories } = await getData(categoryId, query);

  return (
    <div className={styles.main}>
      <SidebarMenu />

      <div className={styles.content}>
        <div className={styles.pageHeader}>
          <PageTitle title="Explorar" icon={Binoculars} />
          <SearchForm />
        </div>
        <CategoriesList categories={categories} />
        <BookList books={books} />
      </div>
    </div>
  );
}
