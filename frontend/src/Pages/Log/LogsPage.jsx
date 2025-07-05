import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function LogsPage() {
  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://raw.githubusercontent.com/fiona-spencer/lambda-house-logs/main/Printer_Basics/Setup.md"
    )
      .then((res) => res.text())
      .then((text) => {
        setMarkdownContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load markdown content", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="p-8 prose max-w-none text-black bg-white border border-gray-300">
      {loading && <p>Loading...</p>}
      {!loading && <ReactMarkdown>{markdownContent}</ReactMarkdown>}
    </main>
  );
}
