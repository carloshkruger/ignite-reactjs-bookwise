import { ComponentProps } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./styles.module.css";
import StarsRating from "../StarsRating";

type BookCardProps = ComponentProps<"div"> & {
  name: string;
  image: string | StaticImageData;
  author: string;
  rate: number;
  alreadyRead?: boolean;
};

export default function BookCard({
  name,
  author,
  image,
  rate,
  alreadyRead = false,
  ...props
}: BookCardProps) {
  return (
    <div className={styles.container} {...props}>
      <Image src={image} alt="" width={64} height={94} />
      <div>
        <div className={styles.bookInfo}>
          <strong>{name}</strong>
          <span>{author}</span>
        </div>
        <StarsRating stars={rate} />
        {alreadyRead && <div className={styles.alreadyRead}>LIDO</div>}
      </div>
    </div>
  );
}
