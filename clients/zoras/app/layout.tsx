import type { Metadata } from "next";
import "./globals.css";
import ChatBot from "./components/ChatBot";

export const metadata: Metadata = {
  title: "Zora's Seafood Market & Kitchen | Wilmington, NC | Fresh Fish Since 1956",
  description:
    "Wilmington's freshest seafood market and kitchen since 1956. Fresh local fish, blue crab, NC shrimp, steamer bags, and our signature You Buy We Fry. 1411 Castle St, Wilmington NC. Open Wed–Sat.",
  keywords: [
    "seafood market Wilmington NC",
    "fresh fish Wilmington",
    "Zora's Seafood",
    "seafood kitchen Wilmington",
    "NC shrimp",
    "blue crab Wilmington",
    "steamer bags Wilmington",
    "fresh flounder Wilmington",
    "seafood Castle Street Wilmington",
    "local seafood market NC",
    "best seafood Wilmington",
    "1411 Castle St Wilmington",
    "Wilmington seafood restaurant",
    "fresh catch Wilmington NC",
  ],
  openGraph: {
    title: "Zora's Seafood Market & Kitchen | Wilmington, NC",
    description:
      "Fresh off the boat. Straight to the counter. Wilmington's seafood institution since 1956 — fresh fish, blue crab, NC shrimp, and real home-cooked kitchen food.",
    url: "https://zorasseafood.com",
    siteName: "Zora's Seafood Market & Kitchen",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://zorasseafood.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
