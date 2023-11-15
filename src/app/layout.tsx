import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ToastContainer } from "react-toastify";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ReactQueryProvider from "@/providers/ReactQuery";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import styles from "./layout.module.css";

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
          <ReactQueryProvider>
            <div className={styles.main}>{children}</div>
          </ReactQueryProvider>
        </NextAuthProvider>
        <ToastContainer position="top-right" limit={5} />
      </body>
    </html>
  );
}
