import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, Link, useNavigate } from 'react-router-dom';

const markdownIndex = {
  Printer_Basics: ['Setup'],
};

export default function LogsPage() {
  const { categoryParam, chapterParam } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [currentCategory, setCurrentCategory] = useState(categoryParam || 'Printer_Basics');
  const [currentChapter, setCurrentChapter] = useState(chapterParam || 'Setup');

  useEffect(() => {
    const chapter = chapterParam || 'Setup';
    const category = categoryParam || 'Printer_Basics';
    const filePath = `/Log/Index/${category}/${chapter}.md`;

    fetch(filePath)
      .then((res) => {
        if (!res.ok) throw new Error('File not found');
        return res.text();
      })
      .then(setContent)
      .catch(() => setContent('# Not Found'));
  }, [categoryParam, chapterParam]);

  const handleNavigation = (cat, chap) => {
    setCurrentCategory(cat);
    setCurrentChapter(chap);
    navigate(`/logs/${cat}/${chap}`);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-lg font-bold mb-4">Logs</h2>
        {Object.entries(markdownIndex).map(([category, chapters]) => (
          <div key={category} className="mb-4">
            <h3 className="font-semibold">{category.replace(/_/g, ' ')}</h3>
            <ul className="ml-2">
              {chapters.map((chapter) => (
                <li key={chapter}>
                  <button
                    onClick={() => handleNavigation(category, chapter)}
                    className={`block text-sm text-left w-full py-1 hover:text-pink-600 ${
                      category === currentCategory && chapter === currentChapter
                        ? 'font-bold text-pink-600'
                        : ''
                    }`}
                  >
                    {chapter.replace(/_/g, ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 prose prose-pink max-w-4xl">
        <ReactMarkdown>{content}</ReactMarkdown>
      </main>
    </div>
  );
}
