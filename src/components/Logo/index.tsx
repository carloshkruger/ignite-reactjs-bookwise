import BookHeartIcon from "./BookHeartIcon";
import styles from "./logo.module.css";

type LogoProps = {
  size?: "xl" | "4xl";
};

export default function Logo({ size = "xl" }: LogoProps) {
  return (
    <div className={styles.container}>
      <BookHeartIcon size={size === "4xl" ? 48 : 24} />
      <p className={styles[`textSize${size}`]}>BookWise</p>
    </div>
  );
}
