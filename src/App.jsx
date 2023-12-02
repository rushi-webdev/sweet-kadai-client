import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import MyAccount from "./pages/MyAccount";
import Dashboard from "./pages/Dashboard";
import ProtectedAdmin from "./ProtectedAdmin";
import Products from "./pages/Products";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Orders from "./components/Orders";
import ErrorPage from "./pages/ErrorPage";
import Checkout from "./pages/Checkout";
import AddProduct from "./components/AddProduct";
import AdminNavbar from "./components/admin/AdminNavbar";
import User from "./components/admin/User";
import Details from "./pages/Details";
import SearchResult from "./pages/SearchResult";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Address from "./components/Address";
import Profile from "./pages/Profile";
import AdminOrders from "./components/AdminOrders";
import OrderDetail from "./components/OrderDetail";
import "./responsive.css";
import SingleOrder from "./components/SingleOrder";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <SignUp />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Navbar />
              <Products />
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <Cart />
            </>
          }
        />
        <Route
          path="/forget-password"
          element={
            <>
              <Navbar />
              <ForgotPassword />
            </>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <>
              <Navbar />
              <ResetPassword />
            </>
          }
        />
        <Route
          path="/product/:id"
          element={
            <>
              <Navbar />
              <Details />
            </>
          }
        />
        <Route
          path="/search/:query"
          element={
            <>
              <Navbar />
              <SearchResult />
            </>
          }
        />
        <Route
          path="/category/:id"
          element={
            <>
              <Navbar />
              <Category />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <ErrorPage />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Navbar />
              <Checkout />
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Navbar />
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/order/:id"
          element={
            <>
              <Navbar />
              <ProtectedRoute>
                <SingleOrder />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/my-account"
          element={
            <>
              <Navbar />
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/address"
          element={
            <>
              <Navbar />
              <ProtectedRoute>
                <Address />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/add-product"
          element={
            <>
              <AdminNavbar />
              <ProtectedAdmin>
                <AddProduct />
              </ProtectedAdmin>
            </>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <>
              <AdminNavbar />
              <ProtectedAdmin>
                <AdminOrders />
              </ProtectedAdmin>
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <AdminNavbar />
              <ProtectedAdmin>
                <User />
              </ProtectedAdmin>
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <AdminNavbar />
              <ProtectedAdmin>
                <Dashboard />
              </ProtectedAdmin>
            </>
          }
        />
        <Route
          path="/admin/:id"
          element={
            <>
              <AdminNavbar />
              <ProtectedAdmin>
                <OrderDetail />
              </ProtectedAdmin>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
