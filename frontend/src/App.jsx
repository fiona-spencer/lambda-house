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
import Navbar from './Navbar'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-white text-gray-900">
        <Header />
        <Navbar />
        <main className="p-6 max-w-full mx-auto d">
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
