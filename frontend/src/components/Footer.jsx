import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
  <div className="footer-grid">

    <div className="footer-brand">
      <p className="name">Aayan</p>
      <p>We specialize in custom website development and ecommerce solutions that are user-friendly, easy to navigate, and built to convert.</p>
      <span className="email">aayan.softwaredev@gmail.com</span>
    </div>

    <div className="footer-col">
      <h4>Services</h4>
      <ul>
        <li><a href="#solutions">Custom websites</a></li>
        <li><a href="#solutions">Ecommerce stores</a></li>
        <li><a href="#solutions">Email marketing</a></li>
        <li><a href="#solutions">Automation</a></li>
      </ul>
    </div>

    <div className="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="#getInTouch">Contact</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#solutions">Solutions</a></li>
      </ul>
    </div>

    <div className="footer-col">
      <h4>Legal</h4>
      <ul>
        <li><a href="/privacy-policy">Privacy policy</a></li>
        <li><a href="/terms-of-service">Terms of service</a></li>
      </ul>
    </div>

  </div>

  <div className="footer-bottom">
    <p>© 2026 Aayan. All rights reserved.</p>
    <div className="socials">
    </div>
  </div>
</footer>
  )
}

export default Footer