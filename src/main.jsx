import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/Layout.jsx'
import Introduction from './Introduction.jsx'
import Contract from './Contract.jsx'
import ClassIntroductions from './ClassIntroductions.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/classIntroductions" element={<ClassIntroductions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
