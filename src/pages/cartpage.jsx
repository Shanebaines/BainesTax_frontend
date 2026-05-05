import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getCart, removeFromCart, updateCartQuantity, clearCart, getCartTotal } from '../utils/cartUtils.js'

export default function CartPage() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = () => {
    try {
      setIsLoading(true)
      const cart = getCart()
      setCartItems(cart)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveProduct = (productID) => {
    try {
      removeFromCart(productID)
      setCartItems((prev) => prev.filter((item) => item.productID !== productID))
      toast.success('Product removed from cart')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleQuantityChange = (productID, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        handleRemoveProduct(productID)
        return
      }
      updateCartQuantity(productID, newQuantity)
      setCartItems((prev) =>
        prev
          .map((item) => (item.productID === productID ? { ...item, quantity: newQuantity } : item))
          .filter((item) => item.quantity > 0),
      )
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the entire cart?')) {
      clearCart()
      setCartItems([])
      toast.success('Cart cleared')
    }
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Cart is empty')
      return
    }
    toast.success('Proceeding to checkout...')
    // TODO: Implement checkout flow
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0)

  if (isLoading) {
    return (
      <div className="cart-page">
        <p className="cart-status">Loading cart...</p>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-glow cart-glow--one" aria-hidden="true" />
      <div className="cart-glow cart-glow--two" aria-hidden="true" />

      <header className="cart-header">
        <Link to="/products" className="cart-back-link">
          ← Continue Shopping
        </Link>
        <Link to="/" className="cart-home-link">
          Baines Wear
        </Link>
      </header>

      <main className="cart-shell">
        <section className="cart-hero">
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-subtitle">Review your items and proceed to checkout</p>
          <div className="cart-summary-quick">
            <span className="cart-quick-stat">{totalItems} Items</span>
            <span className="cart-quick-stat">${totalPrice.toFixed(2)}</span>
          </div>
        </section>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>No items yet. Browse our collection and add something you love!</p>
            <Link to="/products" className="cart-cta-btn">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-container">
            {/* Cart Items List */}
            <section className="cart-items-section">
              <h2 className="cart-section-title">Order Items</h2>

              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <article key={item.productID} className="cart-item">
                    <div className="cart-item-image">
                      {item.image ? (
                        <img src={item.image} alt={item.productName} />
                      ) : (
                        <div className="cart-item-image-placeholder">No Image</div>
                      )}
                    </div>

                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.productName}</h3>
                      <p className="cart-item-category">{item.category || 'Uncategorized'}</p>
                      <div className="cart-item-price-row">
                        <span className="cart-item-unit-price">${item.price.toFixed(2)}</span>
                        <span className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="cart-item-controls">
                      <div className="cart-quantity-picker">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.productID, item.quantity - 1)}
                          className="cart-qty-btn"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          max={item.stock || 999}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.productID, parseInt(e.target.value) || 1)}
                          className="cart-qty-input"
                        />
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.productID, item.quantity + 1)}
                          disabled={item.quantity >= (item.stock || 999)}
                          className="cart-qty-btn"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(item.productID)}
                        className="cart-remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <button type="button" onClick={handleClearCart} className="cart-clear-all-btn">
                Clear All Items
              </button>
            </section>

            {/* Order Summary */}
            <aside className="cart-summary-section">
              <h2 className="cart-section-title">Order Summary</h2>

              <div className="cart-summary-box">
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="cart-summary-row">
                  <span>Shipping</span>
                  <span className="cart-shipping-free">Free</span>
                </div>

                <div className="cart-summary-row">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>

                <div className="cart-summary-divider" />

                <div className="cart-summary-row cart-summary-total">
                  <span>Total</span>
                  <span>${(totalPrice + totalPrice * 0.1).toFixed(2)}</span>
                </div>

                <button type="button" onClick={handleCheckout} className="cart-checkout-btn">
                  Proceed to Checkout
                </button>

                <Link to="/products" className="cart-continue-btn">
                  Continue Shopping
                </Link>

                <div className="cart-trust-badges">
                  <div className="trust-badge">🔒 Secure Checkout</div>
                  <div className="trust-badge">🚚 Fast Shipping</div>
                  <div className="trust-badge">↩️ Easy Returns</div>
                </div>
              </div>

              {/* Order Details Preview */}
              <div className="cart-order-preview">
                <h3>Items Summary</h3>
                <ul className="cart-preview-list">
                  {cartItems.slice(0, 3).map((item) => (
                    <li key={item.productID}>
                      <span>{item.productName}</span>
                      <span className="preview-qty">×{item.quantity}</span>
                    </li>
                  ))}
                  {cartItems.length > 3 ? <li className="preview-more">+{cartItems.length - 3} more</li> : null}
                </ul>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  )
}
