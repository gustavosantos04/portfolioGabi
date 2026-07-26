import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);

  return {
    metadataBase: base,
    title: "Gabriela Pazzim — Psicologia em formação",
    description:
      "Portfólio de Gabriela Pazzim Machado, estudante de Psicologia dedicada à escuta, ao cuidado e ao desenvolvimento humano.",
    icons: {
      icon: "/images/icone.ico",
      shortcut: "/images/icone.ico",
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      title: "Gabriela Pazzim — Psicologia em formação",
      description: "Um olhar atento para tudo o que nos torna humanos.",
      images: [
        {
          url: new URL("/images/og-gabriela.png", base).toString(),
          width: 1735,
          height: 907,
          alt: "Gabriela Pazzim — Psicologia em formação",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gabriela Pazzim — Psicologia em formação",
      description: "Um olhar atento para tudo o que nos torna humanos.",
      images: [new URL("/images/og-gabriela.png", base).toString()],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#171712" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Manrope:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script src="/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
