import React, { useEffect, useState } from "react";

const GITHUB_OWNER = "fiona-spencer";
const GITHUB_REPO = "lambda-house-logs";
const RAW_BASE = "https://raw.githubusercontent.com/fiona-spencer/lambda-house-logs/main";

function simpleMarkdownToHtml(md) {
  // 1. Convert Markdown tables before line breaks interfere
  md = md.replace(
    /\n\|(.+)\|\n\|([ -:\|]+)\|\n((?:\|.*\|\n?)+)/g,
    (_, headers, separator, rows) => {
      const ths = headers.split("|").map(h =>
        `<div class="table-cell font-semibold border px-4 py-2 bg-pink-100">${h.trim()}</div>`
      ).join("");

     const trs = rows.trim().split("\n").map(row => {
  const tds = row
    .split("|")
    .filter(c => c.trim() !== "")
    .map(c => `<div class="table-cell border px-4 py-2">${c.trim()}</div>`)
    .join("");
  return `<div class="table-row">${tds}</div>`;
}).join("");


      return `
<div class="table w-full border border-pink-400 my-6 text-sm rounded-md overflow-hidden">
  <div class="table-header-group">${`<div class="table-row">${ths}</div>`}</div>
  <div class="table-row-group">${trs}</div>
</div>
`;
    }
  );

  // 2. Replace other markdown syntax
  let html = md
    .replace(/^### (.*$)/gim, "<h3 class='text-xl font-semibold mt-6 mb-3'>$1</h3>")
    .replace(/^---$/gm, "<hr class='border-pink-300 my-6' />")     // <-- this line added
    .replace(/^## (.*$)/gim, "<h2 class='text-2xl font-bold mt-8 mb-4'>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1 class='text-3xl font-extrabold mt-10 mb-6'>$1</h1>")
    .replace(/^\> (.*$)/gim, "<blockquote class='border-l-4 border-pink-500 pl-4 italic text-gray-600 my-4'>$1</blockquote>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong class='font-semibold'>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em class='italic'>$1</em>")
    .replace(/\!\[(.*?)\]\((.*?)\)/gim, (match, alt, src) => {
      const fullSrc = src.startsWith("/") ? RAW_BASE + src : src;
      return `<img alt='${alt}' src='${fullSrc}' class='lg:w-1/2 w-auto mx-auto flex rounded-lg my-4' />`;
    })
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' class='text-pink-600 hover:underline'>$1</a>")
    .replace(/^\s*\n\-/gm, "<ul class='list-disc list-inside'><li>")
    .replace(/^\- (.*)$/gm, "<li>$1</li>")
    .replace(/\n$/gim, "<br />");

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
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

    setLoading(true);
    fetch(selectedFile.download_url)
      .then((res) => res.text())
      .then((text) => {
        const html = simpleMarkdownToHtml(text);
        setMarkdownHtml(html);
        setLoading(false);
        setSidebarOpen(false);
      })
      .catch((err) => {
        console.error("Failed to fetch markdown content", err);
        setLoading(false);
      });
  }, [selectedFile]);

  const filteredCategories = categories
    .map((cat) => {
      const categoryMatches = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
      const filteredFiles = selectedCategory?.name === cat.name
        ? files.filter((file) =>
            file.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

      if (categoryMatches || filteredFiles.length > 0) {
        return {
          ...cat,
          filteredFiles,
          showFiles: selectedCategory?.name === cat.name,
        };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <div className="relative flex flex-col sm:flex-row min-h-screen bg-white text-black">
      {/* Toggle Tab (Right side) - Small screens only */}
      <button
        className="sm:hidden fixed top-[500px] right-0 transform rotate-90 bg-pink-600 text-white px-40 -mr-40 py-1 rounded-b-md z-30 shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        Logs
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed sm:relative top-0 right-0 sm:right-auto sm:translate-x-0 z-20 sm:z-auto bg-pink-50 w-64 h-full sm:h-auto border-l sm:border-r border-pink-300 p-4 overflow-y-auto transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } sm:translate-x-0`}
      >
        <input
          type="text"
          placeholder="Search categories or files..."
          className="mb-4 p-2 rounded border border-pink-300 focus:outline-none focus:ring focus:ring-pink-300 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ul className="flex-grow overflow-y-auto">
          {filteredCategories.map((cat) => (
            <li key={cat.name} className="mb-4 pb-4 border-b border-pink-300">
              <button
                className={`font-semibold hover:underline ${
                  selectedCategory?.name === cat.name ? "text-pink-600" : ""
                }`}
                onClick={() => selectCategory(cat)}
              >
                {cat.name.replace(/_/g, " ")}
              </button>
              {cat.showFiles && (
                <ul className="ml-4 mt-2 space-y-1">
                  {(searchTerm ? cat.filteredFiles : files).map((file) => (
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

      {/* Main content */}
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
