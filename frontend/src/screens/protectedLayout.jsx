import { useEffect } from "react";
import "./../index.css";


export default function RootLayout({ children }) {
  useEffect(() => {
    document.body.classList.add("geist-sans", "geist-mono");
  }, []);

  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
