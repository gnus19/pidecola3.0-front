import "./global.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Pidecola",
  description: "Web app para viajes compartidos desde y hacia la Universidad Simón Bolívar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="light">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
