"use client";

import "@/styles/globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Jaldi } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
   const queryClient = new QueryClient();

   return (
      <html lang="en">
         <body className={`bg-background text-text ${jaldi.className}`}>
            <QueryClientProvider client={queryClient}>
               {children}
               <Analytics />
            </QueryClientProvider>
         </body>
      </html>
   );
}
