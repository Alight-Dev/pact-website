export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__logo">PACT</span>
        <p className="footer__copy">© {year} Pact. All rights reserved.</p>
        <ul className="footer__links">
          <li><a href="#privacy">Privacy</a></li>
          <li><a href="mailto:support@pactapp.io">Contact</a></li>
        </ul>
      </div>
    </footer>
  )
}
