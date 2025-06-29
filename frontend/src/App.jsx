import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';

// Pages
import LambdaHousePage from './Pages/Home/LambdahousePage';
import StudioPage from './Pages/Studio/StudioPage';
import ProductPage from './Pages/Products/ProductPage';
import ProjectsPage from './Pages/Projects/ProjectsPage';
import LogsPage from './Pages/Log/LogsPage';
import AboutPage from './Pages/About/AboutPage';

// Components
import Header from './Static/Header/Header';
import Footer from './Static/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="grid grid-cols-5 min-h-screen bg-white text-gray-900">
        <Header />

        {/* MENU */}
        <nav className="bg-pink-300 p-4 flex space-x-6 shadow-md justify-center">
          <Link 
            to="/studio" 
            className="text-gray-800 hover:text-gray-600 font-semibold"
          >
            Studio
          </Link>
          <Link 
            to="/products" 
            className="text-gray-800 hover:text-gray-600 font-semibold"
          >
            Products
          </Link>
          <Link 
            to="/projects" 
            className="text-gray-800 hover:text-gray-600 font-semibold"
          >
            Projects
          </Link>
          <Link 
            to="/logs" 
            className="text-gray-800 hover:text-gray-600 font-semibold"
          >
            Logs
          </Link>
          <Link 
            to="/about" 
            className="text-gray-800 hover:text-gray-600 font-semibold"
          >
            About
          </Link>
        </nav>

        <main className="p-6 max-w-full mx-auto flex-grow">
          <Routes>
            <Route path="/" element={<LambdaHousePage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
