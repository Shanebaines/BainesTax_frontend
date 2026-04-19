import { Link } from 'react-router-dom'

export default function SignUpPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <main style={{ width: 'min(460px, 100%)', padding: '2rem', border: '1px solid #d1d5db', borderRadius: '12px' }}>
        <h1 style={{ marginTop: 0 }}>Sign Up</h1>
        <p>Create your account page is ready to build.</p>
        <Link to="/login">Go to Login</Link>
      </main>
    </div>
  )
}
