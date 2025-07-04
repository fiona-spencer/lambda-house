import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';

// import Sitemap from '../public/sitemap.xml'

// Pages
import LambdaHousePage from './Pages/Home/LambdahousePage';
import StudioPage from './Pages/Studio/StudioPage';
import ProductPage from './Pages/Products/ProductPage';
import ProjectsPage from './Pages/Projects/ProjectsPage';
// import LogsPage from './Pages/Log/LogsPage';
import AboutPage from './Pages/About/AboutPage';

// Components
import Header from './Static/Header/Header';
import Footer from './Static/Footer/Footer';
import Navbar from './Navbar'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-white text-gray-900">
          <Header />
        <Navbar />
        <main className="flex-none w-full">
          <Routes>
            <Route path="/" element={<LambdaHousePage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            {/* <Route path="/logs" element={<LogsPage />} /> */}
            <Route path="/about" element={<AboutPage />} />
            {/* <Route path="/sitemap.xml" element={<Sitemap />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
