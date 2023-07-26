import "@/styles/globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
   title: "Quizzler",
   description:
      "Unlock the power of knowledge with our innovative Flashcard App! Enhance your learning experience with interactive and customizable flashcards that make studying a breeze. Master any subject, from language learning to exam preparation, and retain information effectively. Download now and elevate your learning journey to new heights",
   keywords: "flashcards, quizzes",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className="h-screen bg-background text-text">
            {children}
            <Analytics />
         </body>
      </html>
   );
}
