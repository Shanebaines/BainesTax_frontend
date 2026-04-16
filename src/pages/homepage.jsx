import './hamepage.css'
import { Link } from 'react-router-dom'

const features = [
	{
		title: 'Fast & Free Delivery',
		text: 'Express shipping and easy order tracking for every purchase.'
	},
	{
		title: 'Secured Money',
		text: 'Protected checkout and verified payment options for safe shopping.'
	},
	{
		title: 'Return Policy',
		text: 'Simple exchange and return process designed for convenience.'
	},
	{
		title: 'Customer Support',
		text: 'Dedicated help team available to guide your fashion choices.'
	}
]

export default function HomePage() {
	return (
		<div className="home-shell">
			<div className="home-card">
				<header className="top-nav">
					<div className="brand">BAINES TAX</div>

					<nav className="nav-links" aria-label="Primary">
						<a href="#">Home</a>
						<a href="#">Shop</a>
						<a href="#">Pages</a>
						<a href="#">Contact</a>
					</nav>

					<div className="nav-actions">
						<Link to="/login">Log In</Link>
						<span className="action-dot">|</span>
						<a href="#">Cart</a>
					</div>
				</header>

				<section className="hero">
					<div className="hero-copy">
						<p className="eyebrow">NEW COLLECTION</p>
						<h1>Dress to Impress Discover, Shop, Inspire</h1>
						<p className="script-text">Our unique products</p>

						<div className="hero-cta-row">
							<button type="button">EXPLORE MORE</button>

							<article className="mini-card" aria-label="Featured style">
								<div className="mini-image"></div>
								<div className="mini-dots">
									<span></span>
									<span></span>
									<span></span>
								</div>
							</article>
						</div>
					</div>

					<div className="hero-visual" aria-hidden="true">
						<div className="portrait-shape"></div>
						<div className="shine"></div>
					</div>
				</section>

				<section className="service-strip" aria-label="Store benefits">
					{features.map((item) => (
						<article className="feature" key={item.title}>
							<div className="feature-icon">O</div>
							<h3>{item.title}</h3>
							<p>{item.text}</p>
						</article>
					))}
				</section>
			</div>
		</div>
	)
}
