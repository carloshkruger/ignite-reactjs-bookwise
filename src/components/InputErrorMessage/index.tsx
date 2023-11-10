import styles from "./styles.module.css";

type InputErrorMessageProps = {
  message?: string;
};

export default function InputErrorMessage({ message }: InputErrorMessageProps) {
  if (!message) {
    return null;
  }

  return <span className={styles.inputErrorMessage}>{message}</span>;
}
