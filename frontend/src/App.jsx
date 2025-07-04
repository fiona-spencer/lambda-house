import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import LambdaHousePage from './Pages/Home/LambdahousePage';
import StudioPage from './Pages/Studio/StudioPage';
import AboutPage from './Pages/About/AboutPage';
import Construction from './Pages/Construction';

// Components
import Header from './Static/Header/Header';
import Footer from './Static/Footer/Footer';
import Navbar from './Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-white text-gray-900">
        <Header />
        <Navbar />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<LambdaHousePage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/products" element={<Construction />} />
            <Route path="/projects" element={<Construction />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
