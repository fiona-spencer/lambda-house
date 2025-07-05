import React, { useEffect, useState } from "react";

const GITHUB_OWNER = "fiona-spencer";
const GITHUB_REPO = "lambda-house-logs";

// Basic markdown-to-HTML converter
function simpleMarkdownToHtml(md) {
  let html = md
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/\!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
    .replace(/^\s*\n\-/gm, "<ul><li>")
    .replace(/^\- (.*)$/gm, "<li>$1</li>")
    .replace(/\n$/gim, "<br />");

  // Close ul if used
  if (html.includes("<ul><li>")) html += "</ul>";
  return html.trim();
}

export default function LogsPage() {
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [markdownHtml, setMarkdownHtml] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch repo folders (categories)
  useEffect(() => {
    fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/`)
      .then((res) => res.json())
      .then((data) => {
        const folders = data.filter((item) => item.type === "dir");
        setCategories(folders);
      })
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  // Fetch files inside selected folder
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

  // Fetch and update selected markdown file every 1 min
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
    const interval = setInterval(fetchMarkdown, 60 * 1000); // 1 minute

    return () => clearInterval(interval);
  }, [selectedFile]);

  return (
    <div className="flex min-h-screen bg-white text-black">
      <aside className="w-64 border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat.name} className="mb-2">
              <button
                className={`font-semibold hover:underline ${
                  selectedCategory?.name === cat.name ? "text-blue-600" : ""
                }`}
                onClick={() => selectCategory(cat)}
              >
                {cat.name.replace(/_/g, " ")}
              </button>
              {selectedCategory?.name === cat.name && (
                <ul className="ml-4 mt-1 space-y-1">
                  {files.map((file) => (
                    <li key={file.name}>
                      <button
                        className={`text-sm hover:text-blue-600 ${
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

      <main className="flex-1 p-8 overflow-y-auto prose max-w-none">
        {loading && <p>Loading...</p>}
        {!loading && !markdownHtml && <p>Select a file to view its content</p>}
        {!loading && markdownHtml && (
          <article dangerouslySetInnerHTML={{ __html: markdownHtml }} />
        )}
      </main>
    </div>
  );
}
