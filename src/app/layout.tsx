import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'SilverSeat',
  description: 'A modern platform to discover, book, and experience movies in one place.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-bg-base min-h-screen text-gray-100 font-sans selection:bg-glow-amber/30 selection:text-white relative">
        {children}
      </body>
    </html>
  );
}
