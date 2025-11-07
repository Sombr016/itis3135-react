import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './Layout.jsx'
import Introduction from './Introduction.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<App />} />
           <Route path="/introduction" element={<Introduction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
