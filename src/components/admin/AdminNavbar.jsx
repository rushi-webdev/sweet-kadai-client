import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div className="w-100 flex justify-center bg-dark-red">
      <div className="w-95 flex align-center" style={{height:"60px"}}>
        <Link className="mr-1 white rubik" to="/">Home</Link>
        <Link className="mr-1 white rubik" to="/add-product">Products</Link>
        <Link className="mr-1 white rubik" to="/admin/orders">Orders</Link>
        <Link className="mr-1 white rubik" to="/users">User</Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
