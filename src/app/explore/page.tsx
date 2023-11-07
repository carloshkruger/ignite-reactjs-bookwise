import SidebarMenu from "@/components/SidebarMenu";
import CategoriesList from "./_components/CategoriesList";
import BookList from "./_components/BookList";
import PageTitle from "../../components/PageTitle";
import { Binoculars } from "@/components/PhosphorIcons";

import styles from "./styles.module.css";

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
        <PageTitle title="Explorar" icon={Binoculars} />
        <CategoriesList categories={categories} />
        <BookList books={books} />
      </div>
    </div>
  );
}
