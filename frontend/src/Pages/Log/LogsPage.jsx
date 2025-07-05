import React, { useEffect, useState } from "react";

export default function LogsPage() {
  const [content, setContent] = useState("");

  useEffect(() => {
fetch("/logs/Printer_Basics/Setup.md")
      .then((res) => res.text())
      .then((text) => {
        const html = window.marked.parse(text);
        setContent(html);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Printer Basics: Setup</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
