import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Blogtide | Insights, Stories & Expert Opinions",
  description: "Your go-to destination for insightful articles, expert opinions, and inspiring stories. Join our community of readers and discover content that matters.",
  keywords: ["blog", "articles", "opinions", "stories", "insights"],
  authors: [{ name: "The Blogtide Team" }],
  robots: "index, follow",
  openGraph: {
    title: "The Blogtide | Insights, Stories & Expert Opinions",
    description: "Your go-to destination for insightful articles, expert opinions, and inspiring stories.",
    type: "website",
    locale: "en_US",
    siteName: "The Blogtide",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Blogtide | Insights, Stories & Expert Opinions",
    description: "Your go-to destination for insightful articles, expert opinions, and inspiring stories.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
