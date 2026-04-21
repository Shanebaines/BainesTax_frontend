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
  const [editingId, setEditingId] = useState(null)
  const [editFormData, setEditFormData] = useState({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProductData, setNewProductData] = useState({
    productID: '',
    productName: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    altNames: [''],
  })
  const [isSaving, setIsSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const navigate = useNavigate()

  const token = localStorage.getItem('authToken')

  const loadProducts = async () => {
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

      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to load products from the backend.'
      setErrorMessage(message)
      toast.error(message)

      if (error.response?.status === 401) {
        navigate('/admin/login', { replace: true })
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [token, navigate])

  const handleAddProduct = async (e) => {
    e.preventDefault()
    if (!newProductData.productID || !newProductData.productName || !newProductData.price) {
      toast.error('Please fill in required fields (Product ID, Name, Price)')
      return
    }

    setIsSaving(true)
    try {
      await axios.post('http://localhost:3000/api/products', newProductData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      toast.success('Product added successfully')
      setShowAddForm(false)
      setNewProductData({
        productID: '',
        productName: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        altNames: [''],
      })
      loadProducts()
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to add product'
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditStart = (product) => {
    setEditingId(product.productID)
    setEditFormData({ ...product })
  }

  const handleEditChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEditSave = async (productID) => {
    setIsSaving(true)
    try {
      await axios.put(`http://localhost:3000/api/products/${productID}`, editFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      toast.success('Product updated successfully')
      setEditingId(null)
      loadProducts()
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update product'
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteProduct = async (productID) => {
    setIsSaving(true)
    try {
      await axios.delete(`http://localhost:3000/api/products/${productID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      toast.success('Product deleted successfully')
      setDeleteConfirm(null)
      loadProducts()
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to delete product'
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  const totalProducts = products.length
  const lowStockProducts = products.filter((product) => Number(product.stock ?? 0) <= 10).length
  const totalInventory = products.reduce((sum, product) => sum + Number(product.stock ?? 0), 0)
  const lowestPrice = products.length > 0 ? Math.min(...products.map((product) => Number(product.price ?? 0))) : 0

  return (
    <section className="admin-section-card admin-products-panel">
      <header className="admin-section-head">
        <h1>Products</h1>
        <p>Manage product details - edit, add, or delete products easily.</p>
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

      <div className="admin-products-actions">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="admin-btn admin-btn--primary"
          disabled={isSaving}
        >
          {showAddForm ? 'Cancel' : '+ Add New Product'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddProduct} className="admin-add-product-form">
          <h3>Add New Product</h3>
          <div className="admin-form-grid">
            <input
              type="text"
              placeholder="Product ID"
              value={newProductData.productID}
              onChange={(e) => setNewProductData({ ...newProductData, productID: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Product Name"
              value={newProductData.productName}
              onChange={(e) => setNewProductData({ ...newProductData, productName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={newProductData.category}
              onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newProductData.price}
              onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
              step="0.01"
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProductData.stock}
              onChange={(e) => setNewProductData({ ...newProductData, stock: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newProductData.description}
              onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
              className="admin-textarea"
            />
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--success" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="admin-btn admin-btn--cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.productID} className={editingId === product.productID ? 'editing' : ''}>
                  <td>
                    {editingId === product.productID ? (
                      <input
                        type="text"
                        value={editFormData.productName}
                        onChange={(e) => handleEditChange('productName', e.target.value)}
                        className="admin-input-inline"
                      />
                    ) : (
                      <>
                        <div className="admin-product-name">{product.productName}</div>
                        <div className="admin-product-meta">{product.altNames?.[0] || 'No alternate name'}</div>
                      </>
                    )}
                  </td>
                  <td>{product.productID}</td>
                  <td>
                    {editingId === product.productID ? (
                      <input
                        type="text"
                        value={editFormData.category || ''}
                        onChange={(e) => handleEditChange('category', e.target.value)}
                        className="admin-input-inline"
                      />
                    ) : (
                      product.category || 'Uncategorized'
                    )}
                  </td>
                  <td>
                    {editingId === product.productID ? (
                      <input
                        type="number"
                        value={editFormData.price}
                        onChange={(e) => handleEditChange('price', e.target.value)}
                        step="0.01"
                        className="admin-input-inline"
                      />
                    ) : (
                      `$${Number(product.price ?? 0).toFixed(2)}`
                    )}
                  </td>
                  <td>
                    {editingId === product.productID ? (
                      <input
                        type="number"
                        value={editFormData.stock || ''}
                        onChange={(e) => handleEditChange('stock', e.target.value)}
                        className="admin-input-inline"
                      />
                    ) : (
                      product.stock ?? 0
                    )}
                  </td>
                  <td>
                    {editingId === product.productID ? (
                      <textarea
                        value={editFormData.description || ''}
                        onChange={(e) => handleEditChange('description', e.target.value)}
                        className="admin-input-inline"
                        rows="2"
                      />
                    ) : (
                      <span className="admin-product-description">
                        {product.description || 'No description provided'}
                      </span>
                    )}
                  </td>
                  <td className="admin-actions-cell">
                    {editingId === product.productID ? (
                      <div className="admin-action-buttons">
                        <button
                          onClick={() => handleEditSave(product.productID)}
                          className="admin-btn admin-btn--sm admin-btn--success"
                          disabled={isSaving}
                        >
                          {isSaving ? '...' : '✓'}
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="admin-btn admin-btn--sm admin-btn--cancel"
                          disabled={isSaving}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="admin-action-buttons">
                        <button
                          onClick={() => handleEditStart(product)}
                          className="admin-btn admin-btn--sm admin-btn--edit"
                          disabled={isSaving}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(product.productID)}
                          className="admin-btn admin-btn--sm admin-btn--delete"
                          disabled={isSaving}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteConfirm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="admin-modal-actions">
              <button
                onClick={() => handleDeleteProduct(deleteConfirm)}
                className="admin-btn admin-btn--danger"
                disabled={isSaving}
              >
                {isSaving ? 'Deleting...' : 'Delete Product'}
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="admin-btn admin-btn--cancel"
                disabled={isSaving}
              >
                Cancel
              </button>
            </div>
          </div>
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
