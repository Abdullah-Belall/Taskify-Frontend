import type { Metadata } from "next";
import "./globals.css";
import { nunito } from "./fonts/fonts";
import ReduxProvider from "./store/providers";
export const metadata: Metadata = {
  title: "Taskify",
  description: "Todo list DEMO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased bg-myOrange text-white`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
