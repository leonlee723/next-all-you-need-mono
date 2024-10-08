import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthProvider";
import initializeApp from "@/lib/init-app";

const inter = Inter({ subsets: ["latin"] });

// Initialize different libraries
initializeApp()
console.log("root layout...")

export default function RootLayout({ children }: { children: React.ReactNode }) {
console.log("root layout...")

  return (
    <html lang="en">
      <body className={inter.className}>
          <AuthProvider>
            {children}
          </AuthProvider>
      </body>
    </html>
  );
}