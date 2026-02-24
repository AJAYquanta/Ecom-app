import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Styles.css"; 

const DEFAULT_PRODUCTS = [
  
  { id: 101, title: "ipone 16 pro max", price: 10, thumbnail: "https://www.bing.com/th/id/OIP.wGJryIEA2OMCmdQKVPIgtgHaE7?w=273&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2", category: "Electronics" },
  { id: 102, title: "iphone 17 pro max", price: 20, thumbnail: "https://www.bing.com/th/id/OIP.N0g12LAEm5QWvnNtD2pbJQHaEK?w=245&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2", category: "Electronics" },
  { id: 103, title: "New Balance classic brount", price: 499, thumbnail: "https://th.bing.com/th/id/OIP.NGhCRhAth0C8blDy8Ns8zgHaEO?w=284&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3", category: "Footwear" },
  { id: 104, title: "New Balance green mounts", price: 389, thumbnail: "https://sneakernews.com/wp-content/uploads/2023/04/New-Balance-Fresh-Foam-More-Trail-V3-Covert-Green-MTMORNGN-2.jpg", category: "Footwear" },
  { id: 105, title: "Rolex Submariner", price: 171, thumbnail: "https://www.watchclub.com/upload/watches/originali/watch-club-rolex-submariner-date-116613lb-rolexwarrantyto2024-ref-116613lb-year-2019-14676-wb.pngwb.png9.jpg", category: "Watches" },
  { id: 106, title: "New Balance blue clicks limited Edition", price: 459, thumbnail: "https://www.newbalance.com.au/dw/image/v2/AASX_PRD/on/demandware.static/-/Library-Sites-NBAU-NBNZ/default/dw900453dd/test-comp-images/2024_Comp_Assets/740-blue-mega-nav.jpg", category: "Footwear" },
  { id: 107, title: "New Balance art works exp", price: 18999, thumbnail: "https://tse3.mm.bing.net/th/id/OIP.x6658gplZxlS37a8UbJ6UAHaLn?rs=1&pid=ImgDetMain&o=7&rm=3", category: "Footwear" },
  { id: 108, title: "New Balance new grade fuel cell", price: 149, thumbnail: "https://th.bing.com/th/id/OIP.zx3s4iG0-kXxSYppwidZFwHaE7?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3", category: "Footwear" },
  { id: 109, title: "Nike Air Max", price: 139, thumbnail: "https://tse2.mm.bing.net/th/id/OIP.tAZtpLwas9yqBLsTpL9-5QHaEK?rs=1&pid=ImgDetMain&o=7&rm=3", category: "Footwear" }
];

function Products1() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const userRole = localStorage.getItem("role") || "user";

  useEffect(() => {
    const catalog = JSON.parse(localStorage.getItem("catalogProducts"));
    if (catalog?.length) {
      setProducts(catalog);
      return;
    }

    localStorage.setItem("catalogProducts", JSON.stringify(DEFAULT_PRODUCTS));
    setProducts(DEFAULT_PRODUCTS);
  }, []);

  const handleAddToCart = (product) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role") || "user";

    if (isLoggedIn === "true") {
      if (role === "admin") {
        alert("Admin cannot add products to cart. Use Admin panel to manage products and approvals.");
        navigate("/admin/approve-orders");
        return;
      }

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart)); 
      alert("Product added to cart");
    } else {
      alert("Please login first!");
      navigate("/login");
    }
  };

  const deleteProductAsAdmin = (productId) => {
    if (userRole !== "admin") {
      return;
    }

    const updatedProducts = products.filter((item) => item.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem("catalogProducts", JSON.stringify(updatedProducts));
    alert("Product deleted by admin");
  };

  return (
    <>
      <Header />

      <section className="products">   {/* must match CSS */}
        {products.map((p) => (
          <div className="product" key={p.id}>  {/* must match CSS */}
            <img src={p.thumbnail} alt={p.title} />
            <h3>{p.title}</h3>
            <p>Category: {p.category}</p>
            <p>Rs. {p.price}</p>
            <button onClick={() => handleAddToCart(p)}>
              Add to Cart
            </button>
            {userRole === "admin" && (
              <button onClick={() => deleteProductAsAdmin(p.id)} style={{ marginTop: "8px", backgroundColor: "#d9534f" }}>
                Delete Product
              </button>
            )}
          </div>
        ))}
      </section>

      <Footer />
    </>
  );
}

export default Products1;
