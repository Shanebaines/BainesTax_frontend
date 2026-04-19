import { Link } from 'react-router-dom'

export default function AdminPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <main style={{ width: 'min(460px, 100%)', padding: '2rem', border: '1px solid #d1d5db', borderRadius: '12px' }}>
        <h1 style={{ marginTop: 0 }}>Admin</h1>
        <p>Admin landing page is connected.</p>
        <Link to="/admin/login">Go to Admin Login</Link>
      </main>
    </div>
  )
}
