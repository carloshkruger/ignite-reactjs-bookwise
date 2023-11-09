import { ElementType } from "react";
import styles from "./styles.module.css";

type UserStatItemProps = {
  title: string;
  value: string | number;
  icon: ElementType;
};

export default function UserStatItem({
  title,
  value,
  icon: Icon,
}: UserStatItemProps) {
  return (
    <div className={styles.container}>
      <Icon className={styles.icon} size={32} />
      <div className={styles.itemInfoContainer}>
        <span className={styles.value}>{value}</span>
        <span className={styles.title}>{title}</span>
      </div>
    </div>
  );
}
