import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function ProductDetailsPage() {
  const { productID } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        setErrorMessage('')

        const { data } = await axios.get(`http://localhost:3000/api/products/${productID}`)
        setProduct(data)

        if (Array.isArray(data.images) && data.images.length > 0) {
          setSelectedImage(0)
        }
      } catch (error) {
        const message = error.response?.data?.error || 'Unable to load product details.'
        setErrorMessage(message)
        toast.error(message)
      } finally {
        setIsLoading(false)
      }
    }

    if (productID) {
      fetchProduct()
    }
  }, [productID])

  const handleAddToCart = () => {
    if (!product) return

    const cartItem = {
      productID: product.productID,
      productName: product.productName,
      price: product.price,
      quantity,
      image: Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : '',
    }

    let cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item) => item.productID === product.productID)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push(cartItem)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    toast.success(`${product.productName} added to cart!`)
  }

  if (isLoading) {
    return (
      <div className="product-details-page">
        <p className="product-details-status">Loading product details...</p>
      </div>
    )
  }

  if (errorMessage || !product) {
    return (
      <div className="product-details-page">
        <div className="product-details-header">
          <Link to="/products" className="product-details-back-link">
            ← Back to Shop
          </Link>
        </div>
        <p className="product-details-status product-details-status--error">
          {errorMessage || 'Product not found.'}
        </p>
      </div>
    )
  }

  const productImages = Array.isArray(product.images) ? product.images : []
  const stockStatus = product.stock > 0 ? 'In Stock' : 'Out of Stock'
  const isOutOfStock = product.stock <= 0
  const discount = product.lastPrice ? Math.round((1 - product.price / product.lastPrice) * 100) : 0
  const totalPrice = product.price * quantity

  return (
    <div className="product-details-page">
      <div
        className="product-details-glow product-details-glow--one"
        aria-hidden="true"
      />
      <div
        className="product-details-glow product-details-glow--two"
        aria-hidden="true"
      />

      <header className="product-details-header">
        <Link to="/products" className="product-details-back-link">
          ← Back to Shop
        </Link>
        <Link to="/" className="product-details-home-link">
          Baines Wear
        </Link>
      </header>

      <main className="product-details-shell">
        <div className="product-details-grid">
          {/* Images Section */}
          <section className="product-images-section">
            <div className="product-main-image">
              {productImages.length > 0 ? (
                <img src={productImages[selectedImage]} alt={product.productName} />
              ) : (
                <div className="product-image-placeholder">No Image</div>
              )}

              {discount > 0 ? (
                <div className="product-discount-badge">-{discount}%</div>
              ) : null}
            </div>

            {productImages.length > 1 ? (
              <div className="product-thumbnails">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    className={`product-thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={image} alt={`${product.productName} view ${index + 1}`} />
                  </button>
                ))}
              </div>
            ) : null}
          </section>

          {/* Details Section */}
          <section className="product-details-section">
            <div className="product-header-info">
              <p className="product-category">{product.category || 'Uncategorized'}</p>
              <h1 className="product-title">{product.productName}</h1>

              <div className="product-rating">
                <div className="product-stars">★★★★★</div>
                <span className="product-review-count">(248 reviews)</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="product-pricing-section">
              <div className="product-price-display">
                <span className="product-current-price">${product.price.toFixed(2)}</span>
                {product.lastPrice ? (
                  <span className="product-original-price">${product.lastPrice.toFixed(2)}</span>
                ) : null}
              </div>

              {product.lastPrice ? (
                <p className="product-savings">You save ${(product.lastPrice - product.price).toFixed(2)}</p>
              ) : null}

              <div className="product-stock-status" style={{ color: isOutOfStock ? '#ef4444' : '#10b981' }}>
                {stockStatus} {product.stock > 0 ? `(${product.stock} available)` : null}
              </div>
            </div>

            {/* Description */}
            {product.description ? (
              <div className="product-description">
                <h3>About This Product</h3>
                <p>{product.description}</p>
              </div>
            ) : null}

            {/* Key Features */}
            <div className="product-features">
              <h3>Why Choose This?</h3>
              <ul>
                <li>✓ Premium quality fabric</li>
                <li>✓ Comfortable fit for all-day wear</li>
                <li>✓ Easy care and maintenance</li>
                <li>✓ Versatile style for any occasion</li>
              </ul>
            </div>

            {/* Quantity & Actions */}
            <div className="product-purchase-section">
              <div className="product-quantity-picker">
                <label htmlFor="quantity-input">Quantity:</label>
                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="quantity-btn"
                  >
                    −
                  </button>
                  <input
                    id="quantity-input"
                    type="number"
                    min="1"
                    max={product.stock || 999}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="quantity-input"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= (product.stock || 999)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="product-total-price">
                <span className="product-total-label">Total Price:</span>
                <span className="product-total-value">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="product-add-to-cart-btn"
            >
              {isOutOfStock ? 'Out of Stock' : '🛒 Add to Cart'}
            </button>

            {/* Additional Info */}
            <div className="product-info-badges">
              <div className="info-badge">
                <span className="badge-icon">🚚</span>
                <div>
                  <div className="badge-title">Free Shipping</div>
                  <div className="badge-desc">On orders over $50</div>
                </div>
              </div>
              <div className="info-badge">
                <span className="badge-icon">↩️</span>
                <div>
                  <div className="badge-title">Easy Returns</div>
                  <div className="badge-desc">30-day guarantee</div>
                </div>
              </div>
              <div className="info-badge">
                <span className="badge-icon">🔒</span>
                <div>
                  <div className="badge-title">Secure Payment</div>
                  <div className="badge-desc">100% protected</div>
                </div>
              </div>
            </div>

            {/* Specs Table */}
            <div className="product-specs-table">
              <h3>Product Details</h3>
              <table>
                <tbody>
                  <tr>
                    <td className="spec-label">Product ID</td>
                    <td className="spec-value">{product.productID}</td>
                  </tr>
                  <tr>
                    <td className="spec-label">Category</td>
                    <td className="spec-value">{product.category || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="spec-label">Stock Available</td>
                    <td className="spec-value">{product.stock || 0} units</td>
                  </tr>
                  {product.altNames && product.altNames.length > 0 ? (
                    <tr>
                      <td className="spec-label">Also Known As</td>
                      <td className="spec-value">{product.altNames.join(', ')}</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
