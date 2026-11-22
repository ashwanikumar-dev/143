import type { Metadata } from 'next';
import './globals.css';
import { content } from '@/config/content';

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-cream-100 text-plum-800 antialiased selection:bg-rose-200 selection:text-plum-900">
        {children}
      </body>
    </html>
  );
}
