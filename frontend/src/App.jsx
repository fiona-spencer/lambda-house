import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';



// Pages
import LambdaHousePage from './Pages/Home/LambdahousePage';
import StudioPage from './Pages/Studio/StudioPage'
import ProductPage from './Pages/Products/ProductPage';
import ProjectsPage from './Pages/Projects/ProjectsPage';
import LogsPage from './Pages/Log/LogsPage';
import AboutPage from './Pages/About/AboutPage';


// Components

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-100 p-4 flex space-x-6 shadow-md">
        <Link to="/" className="text-red-600 hover:text-blue-700 font-semibold">Lambda House</Link>
        <Link to="/studio" className="text-red-600 hover:text-blue-700 font-semibold">Studio</Link>
        <Link to="/products" className="text-red-600 hover:text-blue-700 font-semibold">Products</Link>
        <Link to="/projects" className="text-red-600 hover:text-blue-700 font-semibold">Projects</Link>
        <Link to="/logs" className="text-red-600 hover:text-blue-700 font-semibold">Logs</Link>
        <Link to="/about" className="text-red-600 hover:text-blue-700 font-semibold">About</Link>
      </nav>
      <main className="p-6 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<LambdaHousePage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/logs" element={<LogsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
