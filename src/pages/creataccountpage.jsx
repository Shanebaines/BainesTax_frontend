import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function CreataccountPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      setIsSubmitting(true)

      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        FirstName: formData.firstName,
        LastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        Type: 'Customer',
      })

      if (data?.token) {
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
      }

      toast.success('Customer account created successfully')
      navigate('/login')
    } catch (error) {
      const message = error.response?.data?.error || 'Unable to create account'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="create-account-page" style={{ minHeight: '100vh', padding: '2rem', display: 'grid', placeItems: 'center' }}>
      <main className="create-account-card" style={{ width: 'min(520px, 100%)', background: '#fff', borderRadius: '16px', padding: '2rem', boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
          <h1 style={{ margin: 0 }}>Create Account</h1>
          <Link to="/login">Back to login</Link>
        </div>

        <p style={{ marginTop: 0, color: '#6b7280' }}>Create a customer account with your basic details.</p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <label style={{ display: 'grid', gap: '0.35rem' }}>
              <span>First Name</span>
              <input name="firstName" value={formData.firstName} onChange={handleChange} required style={{ padding: '0.85rem', borderRadius: '10px', border: '1px solid #d1d5db' }} />
            </label>

            <label style={{ display: 'grid', gap: '0.35rem' }}>
              <span>Last Name</span>
              <input name="lastName" value={formData.lastName} onChange={handleChange} required style={{ padding: '0.85rem', borderRadius: '10px', border: '1px solid #d1d5db' }} />
            </label>
          </div>

          <label style={{ display: 'grid', gap: '0.35rem' }}>
            <span>Email</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ padding: '0.85rem', borderRadius: '10px', border: '1px solid #d1d5db' }} />
          </label>

          <label style={{ display: 'grid', gap: '0.35rem' }}>
            <span>Password</span>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength={6} style={{ padding: '0.85rem', borderRadius: '10px', border: '1px solid #d1d5db' }} />
          </label>

          <label style={{ display: 'grid', gap: '0.35rem' }}>
            <span>Confirm Password</span>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required minLength={6} style={{ padding: '0.85rem', borderRadius: '10px', border: '1px solid #d1d5db' }} />
          </label>

          <button type="submit" disabled={isSubmitting} style={{ padding: '0.95rem 1rem', borderRadius: '12px', border: 'none', background: '#111827', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
            {isSubmitting ? 'Creating...' : 'Create Customer Account'}
          </button>
        </form>
      </main>
    </div>
  )
}