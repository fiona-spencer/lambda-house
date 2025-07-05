import React, { useEffect, useState } from "react";

const GITHUB_OWNER = "fiona-spencer";
const GITHUB_REPO = "lambda-house-logs";

// Basic markdown-to-HTML converter
function simpleMarkdownToHtml(md) {
  let html = md
    .replace(/^### (.*$)/gim, "<h3 class='text-lg font-semibold mt-4'>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2 class='text-xl font-bold mt-6'>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1 class='text-2xl font-bold mt-8'>$1</h1>")
    .replace(/^\> (.*$)/gim, "<blockquote class='border-l-4 border-pink-500 pl-4 italic text-gray-600'>$1</blockquote>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong class='font-bold'>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em class='italic'>$1</em>")
    .replace(/\!\[(.*?)\]\((.*?)\)/gim, "<img class='my-4 rounded shadow' alt='$1' src='$2' />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a class='text-pink-600 underline hover:text-pink-800' href='$2' target='_blank'>$1</a>")
    .replace(/^\s*\n\-/gm, "<ul class='list-disc ml-6'><li>")
    .replace(/^\- (.*)$/gm, "<li class='mb-1'>$1</li>")
    .replace(/\n$/gim, "<br />");

  if (html.includes("<ul class='list-disc ml-6'><li>")) html += "</ul>";
  return html.trim();
}

export default function LogsPage() {
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [markdownHtml, setMarkdownHtml] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/`)
      .then((res) => res.json())
      .then((data) => {
        const folders = data.filter((item) => item.type === "dir");
        setCategories(folders);
      })
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  function selectCategory(category) {
    setSelectedCategory(category);
    setSelectedFile(null);
    setMarkdownHtml("");
    setLoading(true);

    fetch(category.url)
      .then((res) => res.json())
      .then((data) => {
        const mdFiles = data.filter((item) => item.name.endsWith(".md"));
        setFiles(mdFiles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load files", err);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (!selectedFile) return;

    const fetchMarkdown = () => {
      setLoading(true);
      fetch(selectedFile.download_url)
        .then((res) => res.text())
        .then((text) => {
          const html = simpleMarkdownToHtml(text);
          setMarkdownHtml(html);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch markdown content", err);
          setLoading(false);
        });
    };

    fetchMarkdown();
    const interval = setInterval(fetchMarkdown, 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedFile]);

  return (
    <div className="flex min-h-screen bg-white text-black">
      <aside className="w-64 border-r border-pink-300 bg-pink-50 p-4 overflow-y-auto">
        <ul>
{categories.map((cat, index) => (
  <li key={cat.name} className="mb-4 pb-4 border-b border-pink-300">
    <button
      className={`font-semibold hover:underline ${
        selectedCategory?.name === cat.name ? "text-pink-600" : ""
      }`}
      onClick={() => selectCategory(cat)}
    >
      {cat.name.replace(/_/g, " ")}
    </button>
    {selectedCategory?.name === cat.name && (
      <ul className="ml-4 mt-2 space-y-1">
        {files.map((file) => (
          <li key={file.name}>
            <button
              className={`text-sm hover:text-pink-600 ${
                selectedFile?.name === file.name ? "font-bold" : ""
              }`}
              onClick={() => setSelectedFile(file)}
            >
              {file.name.replace(".md", "").replace(/_/g, " ")}
            </button>
          </li>
        ))}
      </ul>
    )}
  </li>
))}

        </ul>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto prose max-w-none prose-headings:text-pink-700 prose-a:text-pink-600">
        {loading && <p>Loading...</p>}
        {!loading && !markdownHtml && <p>Select a file to view its content</p>}
        {!loading && markdownHtml && (
          <article dangerouslySetInnerHTML={{ __html: markdownHtml }} />
        )}
      </main>
    </div>
  );
}
