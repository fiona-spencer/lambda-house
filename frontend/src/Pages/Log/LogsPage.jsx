import React, { useEffect, useState } from "react";

export default function LogsPage() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/logs/Printer_Basics/Setup.md")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch markdown");
        return res.text();
      })
      .then((text) => {
        // Using marked (already included in your index.html)
        const html = window.marked.parse(text);
        setContent(html);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Printer Basics: Setup</h1>
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
