import React from 'react';
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';  // <- fixed imports
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LambdaHouse from './Home/Lambdahouse';  // watch spelling and path!

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className='bg-blue-500 text-lime-500'>Fiona Website</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/lambda-house">Lambda House</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lambda-house" element={<LambdaHouse />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
