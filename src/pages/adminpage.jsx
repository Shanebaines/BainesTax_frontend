import { Navigate, NavLink, Route, Routes } from 'react-router-dom'

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
  return (
    <SectionCard
      title="Products"
      description="Track inventory, pricing, and category performance."
      metrics={[
        { label: 'Total SKUs', value: '412' },
        { label: 'Low Stock', value: '23' },
        { label: 'Best Seller', value: 'Classic Blazer' },
        { label: 'Draft Items', value: '12' },
      ]}
    />
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
