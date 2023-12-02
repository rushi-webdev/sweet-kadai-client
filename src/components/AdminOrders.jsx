import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, changeOrderStatus } from "../slice/AdminOrder";
import "./adminOrder.css";
import { Link } from "react-router-dom";
import IndianCurrency from "../components/IndianCurrency"
const OrderListComponent = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.adminOrders);
  const orderStatuses = ["Pending", "Processing", "Shipping", "Delivered"];
  const [orderId, setOrderId] = useState();
  const [newStatus, setNewStatus] = useState("");
  const [orderStatusMap, setOrderStatusMap] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("All");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await dispatch(changeOrderStatus({ orderId, newStatus }));
  //   await dispatch(getAllOrders());
  // };

  const formatOrderDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // const handleStatusChange = (orderId, status) => {
  //   setOrderStatusMap((prevStatusMap) => ({
  //     ...prevStatusMap,
  //     [orderId]: status,
  //   }));
  // };

  const handleStatusFilterChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    if (selectedStatus === "All") {
      return true; // Show all orders
    } else {
      return order.status === selectedStatus;
    }
  });

  return (
    <div className="w-100 flex justify-center">
      <div className="w-95">
        <div>
          {status === "loading" && <p>Loading...</p>}
          {status === "succeeded" && (
            <div>
              <label htmlFor="statusFilter">Filter by Status:</label>
              <select
                id="statusFilter"
                value={selectedStatus}
                onChange={handleStatusFilterChange}
              >
                <option value="All" key="All">
                  All
                </option>
                {orderStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <table className="rubik">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>Order ID</th>
                    <th style={{ textAlign: "center" }}>Total Item</th>
                    <th style={{ textAlign: "center" }}>Total Amount</th>
                    <th style={{ textAlign: "center" }}>Status</th>
                    <th style={{ textAlign: "center" }}>Order Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) =>
                    order.items.map((item, index) => (
                      <tr key={`${order._id}-${item.product._id}`}>
                        {index === 0 ? (
                          <>
                            <td className="black" rowSpan={order.items.length} style={{ textAlign: 'center' }}>
                              <Link to={`/admin/${order._id}`} className="black">
                                {order._id}
                              </Link>
                            </td>
                            <td rowSpan={order.items.length} style={{ textAlign: 'center' }}>{order.items.length}</td>
                            <td rowSpan={order.items.length} style={{ textAlign: 'center' }}>
                            <IndianCurrency amount={order.totalAmount}/>
                            </td>
                            <td rowSpan={order.items.length} style={{ textAlign: 'center' }}>
                              <button data-status={order.status.toUpperCase()}>
                                {order.status}
                              </button>
                            </td>
                            <td rowSpan={order.items.length} style={{ textAlign: 'center' }}>
                            {formatOrderDate(order.orderDate)}
                            </td>
                          </>
                        ) : null}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderListComponent;
