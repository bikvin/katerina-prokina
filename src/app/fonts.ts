import { Bitter, Open_Sans } from "next/font/google";

export const bitter = Bitter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-bitter",
  weight: ["300", "400", "700"],
});

export const openSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-open-sans",
  weight: ["300", "400", "700"],
});
