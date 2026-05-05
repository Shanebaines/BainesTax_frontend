import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Header() {
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const navigate = useNavigate()

  // Helper to get customer email
  const getCustomerEmail = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        return JSON.parse(storedUser).email
      } catch (e) {
        return null
      }
    }
    return null
  }

  // Helper to get cart for current customer
  const getCartKey = () => {
    const email = getCustomerEmail()
    return email ? `baines_wear_cart_${email}` : 'baines_wear_cart'
  }

  // Update cart count
  const updateCartCount = () => {
    try {
      const cartKey = getCartKey()
      const cart = localStorage.getItem(cartKey)
      if (cart) {
        const items = JSON.parse(cart)
        const count = items.reduce((sum, item) => sum + (item.quantity || 0), 0)
        setCartCount(count)
      } else {
        setCartCount(0)
      }
    } catch (e) {
      setCartCount(0)
    }
  }

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Failed to parse user data:', e)
      }
    }

    // Initial cart count update
    updateCartCount()

    // Listen for storage changes to update cart count
    const handleStorageChange = () => {
      updateCartCount()
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Create custom event listener for cart updates within same tab
    const handleCartUpdate = () => {
      updateCartCount()
    }
    
    window.addEventListener('cartUpdated', handleCartUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cartUpdated', handleCartUpdate)
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setUser(null)
    setCartCount(0)
    toast.success('Signed out successfully!')
    navigate('/')
  }

  return (
    <header className="header-bar">
      <div className="header-container">
        {/* Left: User Info */}
        <div className="header-user-section">
          {user ? (
            <div className="header-user-info">
              <div className="header-user-name">
                {user.firstName} {user.lastName}
              </div>
              <div className={`header-user-type ${user.type.toLowerCase()}`}>
                {user.type}
              </div>
            </div>
          ) : (
            <div className="header-welcome">Welcome</div>
          )}
        </div>

        {/* Center: Navigation */}
        <nav className="header-nav">
          <Link to="/" className="header-nav-link">Home</Link>
          <Link to="/products" className="header-nav-link">Shop</Link>
        </nav>

        {/* Right: Actions */}
        <div className="header-actions">
          {user ? (
            <>
              {user.type === 'Customer' && (
                <Link to="/cart" className="header-cart-link">
                  🛒 Cart
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
              )}
              <button className="header-signout-btn" onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-login-btn">
                Sign In
              </Link>
              <Link to="/signup" className="header-signup-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
