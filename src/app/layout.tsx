// import { bitter, openSans, alegreya } from "@/app/fonts";
import "./globals.css";

import { Bitter, Jost, Open_Sans } from "next/font/google";
import { db } from "@/db";

const bitter = Bitter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-bitter",
  weight: ["300", "400", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-open-sans",
  weight: ["300", "400", "700"],
});

const jost = Jost({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jost",
  weight: ["100", "300", "400", "700"],
});

export async function generateMetadata() {
  const settings = await db.settings.findMany({
    where: { OR: [{ field: "pageHeader" }, { field: "metaDescription" }] },
  });
  return {
    title:
      settings.find((s) => s.field === "pageHeader")?.value || "Default Title",
    description:
      settings.find((s) => s.field === "metaDescription")?.value ||
      "Default description for the site.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${bitter.variable} ${openSans.variable} ${jost.variable} font-jost antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
