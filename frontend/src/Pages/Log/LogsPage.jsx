import React, { useEffect, useState } from "react";

const GITHUB_OWNER = "fiona-spencer";
const GITHUB_REPO = "lambda-house-logs";

export default function LogsPage() {
  const [repoContents, setRepoContents] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryFiles, setCategoryFiles] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/`
    )
      .then((res) => res.json())
      .then((data) => {
        const folders = data.filter((item) => item.type === "dir");
        setRepoContents(folders);
      })
      .catch((err) => console.error("Failed to load repo contents", err));
  }, []);

  function handleCategoryClick(folder) {
    setSelectedFile(null);
    setMarkdownContent("");
    setLoading(true);

    fetch(folder.url)
      .then((res) => res.json())
      .then((files) => {
        setCategoryFiles(files.filter((file) => file.name.endsWith(".md")));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load category files", err);
        setLoading(false);
      });
  }

  function handleFileClick(file) {
    setSelectedFile(file.name);
    setLoading(true);

    fetch(file.download_url)
      .then((res) => res.text())
      .then((text) => {
        const html = window.marked.parse(text);
        setMarkdownContent(html);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load markdown content", err);
        setLoading(false);
      });
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4 border-r overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Categories</h2>
        <ul>
          {repoContents.map((folder) => (
            <li key={folder.name} className="mb-3">
              <button
                onClick={() => handleCategoryClick(folder)}
                className="font-semibold text-blue-600 hover:underline"
              >
                {folder.name.replace(/_/g, " ")}
              </button>
              {categoryFiles.length > 0 && (
                <ul className="ml-4 mt-1">
                  {categoryFiles.map((file) => (
                    <li key={file.name}>
                      <button
                        onClick={() => handleFileClick(file)}
                        className={`text-gray-700 hover:text-blue-600 ${
                          selectedFile === file.name ? "font-bold" : ""
                        }`}
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
        {!loading && !markdownContent && <p>Select a file to view the content</p>}
        {!loading && markdownContent && (
          <article dangerouslySetInnerHTML={{ __html: markdownContent }} />
        )}
      </main>
    </div>
  );
}
