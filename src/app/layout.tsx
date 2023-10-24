import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookWise",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <div className={styles.main}>{children}</div>
      </body>
    </html>
  );
}
