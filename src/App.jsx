import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/homepage.jsx'
import LoginPage from './pages/loginpage.jsx'
import SignUpPage from './pages/signuppage.jsx'
import AdminPage from './pages/adminpage.jsx'
import ProductPage from './pages/productpage.jsx'
import ProductDetailsPage from './pages/productdetailspage.jsx'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:productID" element={<ProductDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="*" element={<h2 style={{ padding: '2rem' }}>404 Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
