import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function SectionCard({ title, description, metrics }) {
  return (
    <section className="admin-section-card">
      <header className="admin-section-head">
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      <div className="admin-metrics-grid">
        {metrics.map((metric) => (
          <article key={metric.label} className="admin-metric-item">
            <div className="admin-metric-value">{metric.value}</div>
            <div className="admin-metric-label">{metric.label}</div>
          </article>
        ))}
      </div>
    </section>
  )
}

function DashboardPanel() {
  return (
    <SectionCard
      title="Dashboard"
      description="Quick overview of store health and recent activity."
      metrics={[
        { label: 'Total Revenue', value: '$48,920' },
        { label: 'Active Customers', value: '1,284' },
        { label: 'Open Orders', value: '92' },
        { label: 'Products in Stock', value: '318' },
      ]}
    />
  )
}

function CustomersPanel() {
  return (
    <SectionCard
      title="Customers"
      description="Manage customer accounts, groups, and engagement status."
      metrics={[
        { label: 'New This Month', value: '126' },
        { label: 'VIP Members', value: '48' },
        { label: 'Repeat Buyers', value: '402' },
        { label: 'Support Tickets', value: '17' },
      ]}
    />
  )
}

function ProductsPanel() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    const loadProducts = async () => {
      const token = localStorage.getItem('authToken')

      if (!token) {
        navigate('/admin/login', { replace: true })
        return
      }

      try {
        setIsLoading(true)
        setErrorMessage('')

        const { data } = await axios.get('http://localhost:3000/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!isMounted) {
          return
        }

        setProducts(Array.isArray(data) ? data : [])
      } catch (error) {
        if (!isMounted) {
          return
        }

        const message = error.response?.data?.error || 'Failed to load products from the backend.'
        setErrorMessage(message)
        toast.error(message)

        if (error.response?.status === 401) {
          navigate('/admin/login', { replace: true })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [navigate])

  const totalProducts = products.length
  const lowStockProducts = products.filter((product) => Number(product.stock ?? 0) <= 10).length
  const totalInventory = products.reduce((sum, product) => sum + Number(product.stock ?? 0), 0)
  const lowestPrice = products.length > 0 ? Math.min(...products.map((product) => Number(product.price ?? 0))) : 0

  return (
    <section className="admin-section-card admin-products-panel">
      <header className="admin-section-head">
        <h1>Products</h1>
        <p>Live product details loaded from the backend.</p>
      </header>

      <div className="admin-metrics-grid">
        <article className="admin-metric-item">
          <div className="admin-metric-value">{totalProducts}</div>
          <div className="admin-metric-label">Total Products</div>
        </article>
        <article className="admin-metric-item">
          <div className="admin-metric-value">{lowStockProducts}</div>
          <div className="admin-metric-label">Low Stock Items</div>
        </article>
        <article className="admin-metric-item">
          <div className="admin-metric-value">{totalInventory}</div>
          <div className="admin-metric-label">Total Stock</div>
        </article>
        <article className="admin-metric-item">
          <div className="admin-metric-value">${lowestPrice.toFixed(2)}</div>
          <div className="admin-metric-label">Lowest Price</div>
        </article>
      </div>

      {errorMessage ? <p className="admin-products-status admin-products-status--error">{errorMessage}</p> : null}

      {isLoading ? (
        <p className="admin-products-status">Loading products from backend...</p>
      ) : products.length === 0 ? (
        <p className="admin-products-status">No products found in the backend database.</p>
      ) : (
        <div className="admin-products-table-wrap">
          <table className="admin-products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>ID</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.productID}>
                  <td>
                    <div className="admin-product-name">{product.productName}</div>
                    <div className="admin-product-meta">{product.altNames?.[0] || 'No alternate name'}</div>
                  </td>
                  <td>{product.productID}</td>
                  <td>{product.category || 'Uncategorized'}</td>
                  <td>${Number(product.price ?? 0).toFixed(2)}</td>
                  <td>{product.stock ?? 0}</td>
                  <td className="admin-product-description">{product.description || 'No description provided'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

function OrdersPanel() {
  return (
    <SectionCard
      title="Orders"
      description="Monitor incoming orders and fulfillment progress."
      metrics={[
        { label: 'Pending', value: '31' },
        { label: 'Packed', value: '19' },
        { label: 'Shipped', value: '54' },
        { label: 'Returned', value: '4' },
      ]}
    />
  )
}

function OrderHistoryPanel() {
  return (
    <SectionCard
      title="Order History"
      description="Review completed and archived transactions."
      metrics={[
        { label: 'Orders This Year', value: '5,942' },
        { label: 'Avg Order Value', value: '$84.20' },
        { label: 'Refund Rate', value: '1.2%' },
        { label: 'Completed', value: '5,781' },
      ]}
    />
  )
}

export default function AdminPage() {
  const links = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/customers', label: 'Customers' },
    { to: '/admin/products', label: 'Products' },
    { to: '/admin/orders', label: 'Orders' },
    { to: '/admin/order-history', label: 'Order History' },
  ]

  return (
    <div className="admin-page-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">Baines Wear Admin</div>
        <nav className="admin-nav" aria-label="Admin">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'admin-nav-link admin-nav-link--active' : 'admin-nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="admin-content-panel">
        <Routes>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPanel />} />
          <Route path="customers" element={<CustomersPanel />} />
          <Route path="products" element={<ProductsPanel />} />
          <Route path="orders" element={<OrdersPanel />} />
          <Route path="order-history" element={<OrderHistoryPanel />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  )
}
