import { Link, useNavigate } from "react-router-dom";

function Header() {
  const name = localStorage.getItem("username");
  const role = localStorage.getItem("role") || "user";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    navigate("/login", { replace: true });
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isAdminSession = isLoggedIn && role === "admin";

  const handleAuthClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      navigate("/login");
    }
  };

  return (
    <header>
      <h1>KL Cart</h1>
      <nav>
        {!isAdminSession && <Link to="/">Home</Link>}
        {!isAdminSession && <Link to="/Products1">Products</Link>}
        {!isAdminSession && <Link to="/cart">Cart</Link>}
        {isAdminSession && <Link to="/admin/approve-orders">Dashboard</Link>}
      </nav>
      <div id="user-display">{name ? `Welcome, ${name}!` : ""}</div>
      <div id="auth-button">
        <button onClick={handleAuthClick}>{isLoggedIn ? "Logout" : "Login"}</button>
      </div>
    </header>
  );
}

export default Header;
