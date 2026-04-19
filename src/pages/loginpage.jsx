import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function LoginPage() {
  const [keepLogged, setKeepLogged] = useState(true)

  return (
    <div
      className="login-page"
      style={{
        background: `
          linear-gradient(rgba(7,10,15,0.68), rgba(7,10,15,0.68)),
          radial-gradient(circle at 15% 25%, rgba(66,106,173,0.36) 0%, transparent 45%),
          radial-gradient(circle at 82% 78%, rgba(167,84,59,0.28) 0%, transparent 42%),
          linear-gradient(120deg, #212d3f 0%, #111722 48%, #2c1f1d 100%)
        `,
        fontFamily: "'Manrope', 'Outfit', sans-serif",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(0deg, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
          opacity: 0.28,
          animation: 'weaveShift 16s linear infinite',
        }}
      />

      <div
        className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, #2fdfb7, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/5 w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, #426aad, transparent 70%)' }}
      />

      <Link
        to="/"
        className="login-brand"
      >
        Baines Wear
      </Link>

      <main className="login-shell" style={{ animation: 'cardRise 0.7s cubic-bezier(0.22,1,0.36,1) both' }}>
        <p className="login-kicker">✦ Welcome Back</p>

        <h1 className="login-title">Sign In</h1>

        <p className="login-subtitle">Enter your credentials to continue.</p>

        <div className="login-card">
          <form className="login-form">
            <div className="login-field">
              <label htmlFor="email" className="login-label">
                Email Address
              </label>
              <input id="email" type="email" placeholder="hello@example.com" className="login-input" />
            </div>

            <div className="login-field">
              <label htmlFor="password" className="login-label">
                Password
              </label>
              <input id="password" type="password" placeholder="••••••••" className="login-input" />
            </div>

            <div className="login-row">
              <label htmlFor="keep-logged" className="login-remember">
                <button
                  type="button"
                  className="login-toggle"
                  aria-pressed={keepLogged}
                  aria-label="Keep me signed in"
                  onClick={() => setKeepLogged(!keepLogged)}
                >
                  <span className="login-toggle-track" />
                  <span className="login-toggle-thumb" style={{ left: keepLogged ? '18px' : '2px' }} />
                </button>
                <span className="login-remember-text">Keep me signed in</span>
              </label>

              <a href="#" className="login-forgot">
                Forgot Password?
              </a>
            </div>

            <button type="button" className="login-button">
              Sign In
            </button>

            <div className="login-divider">
              <div className="login-divider-line" />
              <span className="login-divider-text">or</span>
              <div className="login-divider-line" />
            </div>

            <p className="login-footer">
              Don't have an account? <a href="#">Create one</a>
            </p>
          </form>
        </div>

        <div
          className="h-px w-16 mx-auto mt-8 opacity-40"
          style={{ background: 'linear-gradient(90deg, transparent, #2fdfb7, transparent)' }}
        />
      </main>

      <style>{`
        @keyframes weaveShift {
          from { transform: translateY(0); }
          to { transform: translateY(28px); }
        }
      `}</style>
    </div>
  )
}