import './logingpage.css'
import { Link } from 'react-router-dom'

export default function LoginPage() {
    return (
        <div className="loom-shell">
            <div className="fabric-bg" aria-hidden="true"></div>
            <Link to="/" className="brand-corner">BAINES TAX</Link>

            <main className="login-card" role="main">
                <h1>Login Now</h1>

                <form className="login-form">
                    <input id="email" type="email" placeholder="Email@example.com" />
                    <input id="password" type="password" placeholder="Password" />

                    <label className="stay-logged" htmlFor="keep-logged">
                        <input id="keep-logged" type="checkbox" defaultChecked />
                        <span>Keep me logged in</span>
                    </label>

                    <button type="submit">Log In</button>
                    <a href="#" className="forgot-link">Forgot Password?</a>
                </form>
            </main>
        </div>
    )
}