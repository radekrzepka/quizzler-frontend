import "@/styles/globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Jaldi } from "next/font/google";
import Providers from "@/utils/provider";

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
               {children}
               <Analytics />
            </Providers>
         </body>
      </html>
   );
}
