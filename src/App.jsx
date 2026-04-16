import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/homepage.jsx'
import LoginPage from './pages/loginpage.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<h2 style={{ padding: '2rem' }}>404 Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
