import { X } from "lucide-react";
import styles from "./styles.module.css";

type BookDetailLayoutProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function BookDetailLayout({
  onClose,
  children,
}: BookDetailLayoutProps) {
  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        {children}
      </div>
    </>
  );
}
