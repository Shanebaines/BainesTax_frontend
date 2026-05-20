import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import HomePage from './pages/homepage.jsx'
import LoginPage from './pages/loginpage.jsx'
import SignUpPage from './pages/signuppage.jsx'
import AdminPage from './pages/adminpage.jsx'
import ProductPage from './pages/productpage.jsx'
import ProductDetailsPage from './pages/productdetailspage.jsx'
import CartPage from './pages/cartpage.jsx'
import Header from './Components/Header.jsx'
import { Toaster } from 'react-hot-toast'

function AppContent() {
  const location = useLocation()
  const noHeaderRoutes = ['/login', '/signup', '/admin/login']
  const showHeader = !noHeaderRoutes.includes(location.pathname)

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:productID" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="*" element={<h2 style={{ padding: '2rem' }}>404 Not Found</h2>} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <GoogleOAuthProvider clientId="1015040911222-9175stepk3cj3ocv6pl8hq48nl4f96nm.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <AppContent />
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
