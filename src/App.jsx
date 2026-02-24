import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import "./components/Styles.css"
import Products from "./components/Products"
import Cart from "./components/Cart"
import Login from "./components/Login"
import Products1 from "./components/Products1"
import Signup from "./components/Signup"
import ApproveOrders from "./components/ApproveOrders"
import Page1 from "./components/Page1"
import Page2 from "./components/Page2"

const getAuthState = () => ({
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "user"
});

function AdminBlockedRoute({ children }) {
  const { isLoggedIn, role } = getAuthState();
  if (isLoggedIn && role === "admin") {
    return <Navigate to="/admin/approve-orders" replace />;
  }
  return children;
}

function AdminOnlyRoute({ children }) {
  const { isLoggedIn, role } = getAuthState();
  if (!isLoggedIn || role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function LoginRoute() {
  const { isLoggedIn, role } = getAuthState();
  if (isLoggedIn && role === "admin") {
    return <Navigate to="/admin/approve-orders" replace />;
  }
  if (isLoggedIn) {
    return <Navigate to="/Products1" replace />;
  }
  return <Login />;
}

function App(){
  return(
    <>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route
        path="/"element={<AdminBlockedRoute><Home /></AdminBlockedRoute>}
      />
      <Route
        path="/products"
        element={<AdminBlockedRoute><Products /></AdminBlockedRoute>}
      />
      <Route
        path="/cart"
        element={<AdminBlockedRoute><Cart /></AdminBlockedRoute>}
      />
      <Route path="/login" element={<LoginRoute />} />
      <Route
        path="/Products1"
        element={<AdminBlockedRoute><Products1 /></AdminBlockedRoute>}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/page1" element={<Page1 />} />
      <Route path="/page2" element={<Page2 />} />
      <Route
        path="/admin/approve-orders"
        element={<AdminOnlyRoute><ApproveOrders /></AdminOnlyRoute>}
      />
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
