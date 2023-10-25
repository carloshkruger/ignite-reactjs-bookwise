import styles from "./explore.module.css";
import PageTitle from "./PageTitle";
import SidebarMenu from "@/components/SidebarMenu";
import CategoriesList from "./_components/CategoriesList";
import BookList from "./_components/BookList";

async function getData(categoryId: string = "") {
  const response = await fetch(
    `http://localhost:3000/api/explore?categoryId=${categoryId}`
  );
  const data = await response.json();

  return {
    books: data.books,
    categories: data.categories,
  };
}

export default async function Explore({
  searchParams,
}: {
  searchParams: { categoryId: string };
}) {
  const { books, categories } = await getData(searchParams.categoryId);

  return (
    <div className={styles.main}>
      <SidebarMenu />

      <div className={styles.content}>
        <PageTitle />
        <CategoriesList categories={categories} />
        <BookList books={books} />
      </div>
    </div>
  );
}
