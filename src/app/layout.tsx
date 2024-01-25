import "@/styles/globals.css";
import Providers from "@/utils/provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Jaldi } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
   title: "Quizzler",
   description:
      "Unlock the power of knowledge with our innovative Flashcard App! Enhance your learning experience with interactive and customizable flashcards that make studying a breeze. Master any subject, from language learning to exam preparation, and retain information effectively. Download now and elevate your learning journey to new heights",
   keywords: "flashcards, quizzes",
};

const jaldi = Jaldi({ subsets: ["latin-ext"], weight: "400" });

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className={`bg-background text-text ${jaldi.className}`}>
            <Providers>
               <Suspense>{children}</Suspense>
               <Toaster position="top-right" reverseOrder={true} />
               <Analytics />
            </Providers>
         </body>
      </html>
   );
}
