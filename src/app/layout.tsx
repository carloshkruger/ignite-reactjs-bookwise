import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import NextAuthProvider from "@/providers/NextAuthProvider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookWise",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <NextAuthProvider>
          <div className={styles.main}>{children}</div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
