import { Link } from "react-router-dom";

function Content() {
  return (
    <div className="content">
      <h2>Welcome to KL University Shop</h2>
      <p>Find the best products at unbeatable prices!</p>
      <Link to="/products" className="btn">Shop Now</Link>
    </div>
  );
}

export default Content;
