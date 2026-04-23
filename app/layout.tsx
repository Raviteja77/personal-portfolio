import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CursorFollower } from "@/components/ui/CursorFollower";
import { siteConfig } from "@/content";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ravi Teja Geddada — Software Engineer",
    template: "%s | Ravi Teja Geddada",
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: [
    "Software Engineer", "Frontend Developer", "Angular Developer",
    "React Developer", "TypeScript", "Lit Elements", "GraphQL",
    "Full Stack Engineer", "Web Development", "Fidelity Investments",
    "Clark University", "Ravi Teja Geddada",
  ],
  authors: [{ name: "Ravi Teja Geddada", url: siteConfig.url }],
  icons: {
    icon: "/favicon.jpeg",
    apple: "/favicon.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Ravi Teja Geddada",
    // opengraph-image.tsx in app/ auto-generates the OG image — no manual images[] needed
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <body>
        <CursorFollower />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
