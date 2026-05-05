import { Link } from 'react-router-dom'
import brandLogo from '../../logo.png'

const features = [
  {
    icon: '✦',
    title: 'Fast & Free Delivery',
    text: 'Express shipping and real-time order tracking on every purchase.',
  },
  {
    icon: '⬡',
    title: 'Secured Payments',
    text: 'Protected checkout and verified payment options for safe shopping.',
  },
  {
    icon: '↩',
    title: 'Easy Returns',
    text: 'Simple exchange and return process designed for convenience.',
  },
  {
    icon: '◎',
    title: 'Customer Support',
    text: 'Dedicated help team available to guide your fashion journey.',
  },
]

export default function HomePage() {
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/products' },
    { label: 'Pages', href: '#' },
    { label: 'Contact', href: '#' },
  ]

  return (
    <div
      className="home-page"
      style={{
        background: `
          linear-gradient(rgba(7,10,15,0.66), rgba(7,10,15,0.66)),
          radial-gradient(circle at 15% 22%, rgba(66,106,173,0.36) 0%, transparent 45%),
          radial-gradient(circle at 82% 85%, rgba(167,84,59,0.28) 0%, transparent 42%),
          linear-gradient(120deg, #212d3f 0%, #111722 48%, #2c1f1d 100%)
        `,
        fontFamily: "'Manrope', 'Outfit', sans-serif",
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.25,
          backgroundImage: `
            linear-gradient(0deg, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '22%',
          left: '18%',
          width: '18rem',
          height: '18rem',
          borderRadius: '999px',
          pointerEvents: 'none',
          filter: 'blur(60px)',
          opacity: 0.1,
          background: 'radial-gradient(circle, #2fdfb7, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          right: '18%',
          width: '16rem',
          height: '16rem',
          borderRadius: '999px',
          pointerEvents: 'none',
          filter: 'blur(60px)',
          opacity: 0.1,
          background: 'radial-gradient(circle, #a7543b, transparent 70%)',
        }}
      />

      <div className="home-shell">
        <header className="home-header">
          <div className="home-brand">
            Baines Wear
          </div>

          <nav className="home-nav" aria-label="Primary">
            {navItems.map((item) =>
              item.to ? (
                <Link key={item.label} to={item.to} className="home-nav-link">
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} href={item.href} className="home-nav-link">
                  {item.label}
                </a>
              ),
            )}
          </nav>

          <div className="home-actions">
            <Link to="/login" className="home-link--accent">
              LOG IN
            </Link>
            <span style={{ color: 'rgba(180,190,205,0.4)' }}>|</span>
            <a href="#" className="home-link--muted">
              CART
            </a>
          </div>
        </header>

        <div className="home-logo-banner" aria-label="Baines Wear logo">
          <div className="home-logo-plaque">
            <img className="home-logo-image" src={brandLogo} alt="Baines Wear logo" />
          </div>
        </div>

        <section className="home-hero">
          <div className="home-copy">
            <p className="home-kicker">✦ New Collection 2026</p>

            <h1 className="home-title">
              Dress to Impress.
              <br />
              <span className="home-title-emphasis">Discover, Shop,</span>
              <br />
              Inspire.
            </h1>

            <p className="home-subtitle">
              Curated styles for every occasion - effortlessly elegant, endlessly expressive.
            </p>

            <div className="home-cta-row">
              <Link to="/products" className="home-button home-button--primary">
                Explore Collection
              </Link>

              <button type="button" className="home-button home-button--secondary">
                Lookbook
              </button>
            </div>

            <div className="home-stats">
              {[
                ['12K+', 'Products'],
                ['98%', 'Satisfaction'],
                ['Free', 'Delivery'],
              ].map(([val, label]) => (
                <div key={label}>
                  <div className="home-stat-value">{val}</div>
                  <div className="home-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="home-visual" aria-hidden="true">
            <div style={{ position: 'relative', width: 'min(320px, 100%)', aspectRatio: '3/4' }}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '48% 48% 8% 8% / 42% 42% 10% 10%',
                  background: `
                    radial-gradient(circle at 68% 26%, #d8e2f8 0 18%, transparent 19%),
                    radial-gradient(circle at 52% 20%, #1a2235 0 22%, transparent 23%),
                    radial-gradient(circle at 55% 58%, #ccdaef 0 18%, transparent 19%),
                    linear-gradient(160deg, #1e2940 0 20%, #3a4e73 43%, #6c8ab6 65%, #3b6882 100%)
                  `,
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: '-0.75rem',
                  zIndex: -1,
                  borderRadius: '48% 48% 8% 8% / 42% 42% 10% 10%',
                  filter: 'blur(24px)',
                  opacity: 0.3,
                  background: 'linear-gradient(160deg, #2fdfb7, #426aad)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  right: '-1.5rem',
                  top: '4rem',
                  padding: '0.55rem 0.9rem',
                  border: '1px solid rgba(47,223,183,0.4)',
                  background: 'rgba(12,20,34,0.9)',
                  color: '#2fdfb7',
                  fontSize: '0.65rem',
                  fontWeight: 900,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
              >
                ✦ Editor&apos;s Pick
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: '-2rem',
                  bottom: '3rem',
                  padding: '0.75rem 0.9rem',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(12,20,34,0.88)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div
                  style={{
                    marginBottom: '0.35rem',
                    color: 'rgba(180,190,205,0.6)',
                    fontSize: '0.6rem',
                    fontWeight: 900,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  Colorways
                </div>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {['#3b6882', '#2fdfb7', '#d8e2f8', '#a7543b'].map((c) => (
                    <div
                      key={c}
                      style={{
                        width: '1rem',
                        height: '1rem',
                        borderRadius: '999px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: c,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2rem',
                  width: '7rem',
                  height: '7rem',
                  borderRadius: '999px',
                  pointerEvents: 'none',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.35), transparent 68%)',
                }}
              />
            </div>
          </div>
        </section>

        <div
          style={{
            height: '1px',
            width: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(47,223,183,0.4), transparent)',
          }}
        />

        <section className="home-features">
          {features.map((item, i) => (
            <article
              key={item.title}
              className="home-feature"
              style={{ borderRight: i < features.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
            >
              <div className="home-feature-icon">{item.icon}</div>
              <h3 className="home-feature-title">{item.title}</h3>
              <p className="home-feature-text">{item.text}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}
