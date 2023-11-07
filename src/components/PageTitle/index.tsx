import { ElementType } from "react";
import styles from "./styles.module.css";

type PageTitleProps = {
  title: string;
  icon: ElementType;
};

export default function PageTitle({ title, icon: Icon }: PageTitleProps) {
  return (
    <div className={styles.container}>
      <Icon size={32} />
      <h1>{title}</h1>
    </div>
  );
}
