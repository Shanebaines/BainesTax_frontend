import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const imageUrl = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : ''

  return (
    <article className="products-card">
      <div className="products-card-image-wrap">
        {imageUrl ? (
          <img src={imageUrl} alt={product.productName} className="products-card-image" loading="lazy" />
        ) : (
          <div className="products-card-image products-card-image--placeholder">No Image</div>
        )}
      </div>

      <div className="products-card-body">
        <h3 className="products-card-title">{product.productName}</h3>
      </div>
    </article>
  )
}

export default function ProductPage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setErrorMessage('')

        const { data } = await axios.get('http://localhost:3000/api/products')
        setProducts(Array.isArray(data) ? data : [])
      } catch (error) {
        const message = error.response?.data?.error || 'Unable to load products right now.'
        setErrorMessage(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    if (!normalizedSearch) {
      return products
    }

    return products.filter((product) => product.productName?.toLowerCase().includes(normalizedSearch))
  }, [products, searchTerm])

  return (
    <div className="products-page">
      <div className="products-glow products-glow--one" aria-hidden="true" />
      <div className="products-glow products-glow--two" aria-hidden="true" />

      <header className="products-header">
        <Link to="/" className="products-home-link">
          Baines Wear
        </Link>
        <div className="products-header-actions">
          <Link to="/" className="products-pill-link">
            Back Home
          </Link>
          <Link to="/login" className="products-pill-link products-pill-link--solid">
            Log In
          </Link>
        </div>
      </header>

      <main className="products-shell">
        <section className="products-hero">
          <p className="products-kicker">Shop</p>
          <h1>Find Your Next Favorite Fit</h1>
          <p>
            Handpicked styles from our latest catalog. Browse all products, preview visuals, and discover your next
            wardrobe highlight.
          </p>

          <div className="products-search-row">
            <input
              type="search"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="products-search"
            />
            <span className="products-count">{filteredProducts.length} items</span>
          </div>
        </section>

        {isLoading ? <p className="products-status">Loading products...</p> : null}
        {!isLoading && errorMessage ? <p className="products-status products-status--error">{errorMessage}</p> : null}

        {!isLoading && !errorMessage && filteredProducts.length === 0 ? (
          <p className="products-status">No products match your search yet.</p>
        ) : null}

        {!isLoading && !errorMessage && filteredProducts.length > 0 ? (
          <section className="products-grid" aria-label="Products">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.productID || `${product.productName}-${index}`}
                product={product}
              />
            ))}
          </section>
        ) : null}
      </main>
    </div>
  )
}
