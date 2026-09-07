import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mc-master-calendar-exporter.vercel.app"),
  title: {
    default: "McMaster Google Calendar Exporter | mac2cal",
    template: "%s | mac2cal",
  },
  description:
    "Export your McMaster University class schedule to Google Calendar in a few steps.",
  keywords: [
    "McMaster Google Calendar",
    "McMaster calendar exporter",
    "McMaster schedule to Google Calendar",
    "McMaster timetable Google Calendar",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "McMaster Google Calendar Exporter",
    description:
      "Export your McMaster University class schedule to Google Calendar.",
    siteName: "mac2cal",
  },
  twitter: {
    card: "summary",
    title: "McMaster Google Calendar Exporter",
    description:
      "Export your McMaster University class schedule to Google Calendar.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="google-site-verification"
          content="MDTeDBY1Cd94JfiMwZDs3SJ_7wQeov69vzFuQxYabsQ"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
