import type { Metadata } from "next";
import "@/comp/style/common.scss";
import Header from "@/comp/UIUX/Header";
import { Suspense } from "react";
import Loading from "@/comp/UIUX/Loading";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      
        <main>
          <div className="root">
            <Header />
            
            <Suspense fallback={<Loading/>}>
              {children}
            </Suspense>
          </div>
        </main>
        </body>
    </html>
  );
}
