import styles from "./explore.module.css";
import PageTitle from "./PageTitle";
import SidebarMenu from "@/components/SidebarMenu";
import BookCard from "@/components/BookCard";

import Hobbit from "../../../public/books/o-hobbit.png";

export default function Explore() {
  return (
    <div className={styles.main}>
      <SidebarMenu />

      <div className={styles.content}>
        <PageTitle />

        <div className={styles.categoriesList}>
          <button type="button" className={styles.categoryItem}>
            Tudo
          </button>
          <button type="button" className={styles.categoryItem}>
            Computação
          </button>
          <button type="button" className={styles.categoryItem}>
            Educação
          </button>
          <button type="button" className={styles.categoryItem}>
            Fantasia
          </button>
          <button type="button" className={styles.categoryItem}>
            Ficção científica
          </button>
        </div>

        <div className={styles.bookList}>
          <BookCard
            name="A revolução dos bichos"
            authorName="George Orwell"
            image={Hobbit}
            stars={4}
          />

          <BookCard
            name="A revolução dos bichos"
            authorName="George Orwell"
            image={Hobbit}
            stars={4}
          />

          <BookCard
            name="A revolução dos bichos"
            authorName="George Orwell"
            image={Hobbit}
            stars={4}
          />

          <BookCard
            name="A revolução dos bichos"
            authorName="George Orwell"
            image={Hobbit}
            stars={4}
          />
          <BookCard
            name="A revolução dos bichos"
            authorName="George Orwell"
            image={Hobbit}
            stars={4}
          />
          <BookCard
            name="A revolução dos bichos"
            authorName="George Orwell"
            image={Hobbit}
            stars={4}
          />
          <BookCard
            name="A revolução dos bichos"
            authorName="George Orwell"
            image={Hobbit}
            stars={4}
          />
        </div>
      </div>
    </div>
  );
}
