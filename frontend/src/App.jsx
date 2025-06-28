import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Main from './Home/Main';
import LambdaHouse from './Home/Lambdahouse';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-100 p-4 flex space-x-6 shadow-md">
        <Link to="/" className="text-blue-600 hover:tex-red-800 font-semibold">Home</Link>
        <Link to="/lambda-house" className="text-blue-600 hover:text-blue-700 font-semibold">Lambda NAS House</Link>
        <Link to="/lambda-house" className="text-blue-600 hover:text-blue-800 font-semibold">Hello Lambda House Front</Link>
      </nav>
      <main className="p-6 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/lambda-house" element={<LambdaHouse />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
