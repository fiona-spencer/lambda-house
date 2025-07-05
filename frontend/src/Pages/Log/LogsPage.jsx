import React, { useEffect, useState } from "react";

export default function LogsPage() {
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHtml = () => {
    setLoading(true);
    fetch(
      "https://raw.githubusercontent.com/fiona-spencer/lambda-house-logs/main/Printer_Basics/Setup.html"
    )
      .then((res) => res.text())
      .then((html) => {
        setHtmlContent(html);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load HTML content", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHtml(); // initial fetch

    const intervalId = setInterval(fetchHtml, 5 * 60 * 1000); // every 5 mins

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    <main className="p-8 prose max-w-none text-black bg-white border border-gray-300">
      {loading && <p>Loading...</p>}
      {!loading && (
        <article dangerouslySetInnerHTML={{ __html: htmlContent }} />
      )}
    </main>
  );
}
