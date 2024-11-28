import "./globals.css";
import { DefaultSidebar } from "./components/sidebar";

export const metadata = {
  title: "Dent",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-full">
        <div className="w-1/4">
          <DefaultSidebar />
        </div>
        <div className="w-3/4">{children}</div>
      </body>
    </html>
  );
}
