import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__logo">PACT</span>
        <p className="footer__copy">© {year} Pact. All rights reserved.</p>
        <ul className="footer__links">
          <li><Link to="/terms">Terms</Link></li>
          <li><Link to="/privacy">Privacy</Link></li>
          <li><a href="mailto:yawsnr33@gmail.com">Contact</a></li>
        </ul>
      </div>
    </footer>
  )
}
