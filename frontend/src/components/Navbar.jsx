import "./navbar.css";

const Navbar = () => {
  return (
    <div className="cont-nav">
        <nav className="cont-nav-inner">
            <h2 className="logo-nav" onClick={() => window.location.href="/"}>Aayan</h2>
            <button className="btn-nav" onClick={() => window.location.href="#getInTouch"}>Send a Message</button>
        </nav>
    </div>
  )
}

export default Navbar;