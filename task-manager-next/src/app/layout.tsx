import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager MVP",
  description: "Feature-based Next.js migration of the TaskManager template.",
};

const themeBootstrapScript = `
(() => {
  try {
    const themeKey = 'tm_theme';
    const savedTheme = localStorage.getItem(themeKey);
    const preferredTheme = savedTheme === 'light' || savedTheme === 'dark'
      ? savedTheme
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

    document.documentElement.dataset.theme = preferredTheme;
  } catch (error) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className="selection:bg-[var(--accent-soft)] min-h-full flex flex-col bg-[radial-gradient(circle_at_top_left,var(--glow-1),transparent_28%),radial-gradient(circle_at_top_right,var(--glow-2),transparent_24%),radial-gradient(circle_at_bottom_center,var(--glow-3),transparent_32%),var(--bg)] font-sans text-[14px] text-[var(--text)]">
        {children}
      </body>
    </html>
  );
}
