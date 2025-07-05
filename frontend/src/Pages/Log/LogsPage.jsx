import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const GITHUB_OWNER = "fiona-spencer";
const GITHUB_REPO = "lambda-house-logs";

export default function LogsPage() {
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Load root folders
  useEffect(() => {
    fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/`)
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
        const mdFiles = data.filter((item) => item.name.toLowerCase().endsWith(".md"));
        setFiles(mdFiles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load files", err);
        setLoading(false);
      });
  }

  // Fetch markdown content, re-fetch every 60 seconds
  useEffect(() => {
    if (!selectedFile) return;

    const fetchMarkdown = () => {
      setLoading(true);
      fetch(selectedFile.download_url)
        .then((res) => res.text())
        .then((text) => {
          setMarkdownContent(text);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load markdown", err);
          setLoading(false);
        });
    };

    fetchMarkdown(); // initial load
    const intervalId = setInterval(fetchMarkdown, 60 * 1000); // every 1 minute

    return () => clearInterval(intervalId); // cleanup
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
        {!loading && !markdownContent && <p>Select a category and file to view content</p>}
        {!loading && markdownContent && (
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        )}
      </main>
    </div>
  );
}
