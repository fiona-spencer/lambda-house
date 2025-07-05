import React, { useEffect, useState } from "react";

const GITHUB_OWNER = "fiona-spencer";
const GITHUB_REPO = "lambda-house-logs";

// Simple markdown-to-html converter for basic formatting
function simpleMarkdownToHtml(md) {
  let html = md
    .replace(/^### (.*$)/gim, "<h3>$1</h3>") // h3
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")  // h2
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")   // h1
    .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>") // blockquote
    .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>") // bold **
    .replace(/\*(.*)\*/gim, "<em>$1</em>") // italic *
    .replace(/\!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />") // images
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>") // links
    .replace(/^\s*\n\-/gm, "<ul><li>") // start ul
    .replace(/^\- (.*)$/gm, "<li>$1</li>") // list items
    .replace(/\n$/gim, "<br />"); // line breaks

  // Close ul tags (simple fix)
  if (html.includes("<ul><li>")) {
    html += "</ul>";
  }
  return html.trim();
}

export default function LogsPage() {
  const [categories, setCategories] = useState([]); // folders
  const [files, setFiles] = useState([]); // files inside selected folder
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Load root folders (categories)
  useEffect(() => {
    fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/`
    )
      .then((res) => res.json())
      .then((data) => {
        const folders = data.filter((item) => item.type === "dir");
        setCategories(folders);
      })
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  // Load files when category is selected
  function selectCategory(category) {
    setSelectedCategory(category);
    setSelectedFile(null);
    setMarkdownContent("");
    setLoading(true);

    fetch(category.url)
      .then((res) => res.json())
      .then((data) => {
        const mdFiles = data.filter((item) =>
          item.name.toLowerCase().endsWith(".md")
        );
        setFiles(mdFiles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load files", err);
        setLoading(false);
      });
  }

  // Load markdown content of selected file and convert
  function selectFile(file) {
    setSelectedFile(file);
    setLoading(true);
    fetch(file.download_url)
      .then((res) => res.text())
      .then((text) => {
        const html = simpleMarkdownToHtml(text);
        setMarkdownContent(html);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load markdown", err);
        setLoading(false);
      });
  }

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
                        onClick={() => selectFile(file)}
                      >
                        {file.name.replace(/_/g, " ").replace(".md", "")}
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

        {!loading && !markdownContent && (
          <p>Select a category and file to view content</p>
        )}

        {!loading && markdownContent && (
          <article dangerouslySetInnerHTML={{ __html: markdownContent }} />
        )}
      </main>
    </div>
  );
}
