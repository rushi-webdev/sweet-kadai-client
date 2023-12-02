import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { fetchUserOrders } from "../slice/OrderSlice";
import IndianCurrency from "./IndianCurrency";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const loading = useSelector((state) => state.orders.loading);
  const error = useSelector((state) => state.orders.error);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  useEffect(() => {
    const userId = secureLocalStorage.getItem("userId");
    dispatch(fetchUserOrders(userId));
  }, [dispatch]);

  if (loading === "pending") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="w-100 flex justify-center">
      <ul style={{ width: isMobile ? "95%" : "70%" }}>
        <h3 className="flex rubik mt-1">Order List</h3>
        {orders.map((order) => (
          <li key={order._id}>
            <ul>
              {order?.items?.map((item) => (
                <li
                  key={item?.product?._id}
                  className="flex mt-2 justify-between rubik"
                  style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                >
                  <Link to={`/order/${order._id}`}>
                    <img
                      width={isMobile ? "80px" : "100px"}
                      height={isMobile ? "80px" : ""}
                      src={item?.product?.images[1]}
                      alt=""
                      style={{ flex: ".5" }}
                      className="mt-1 mb-1 ml-1 mr-1"
                    />
                  </Link>
                  <Link to={`/order/${order._id}`}>
                    {!isMobile && (
                      <p
                        style={{ flex: "1", color: "black" }}
                        className="flex justify-center mt-1 mb-1"
                      >
                        Product Name: {item?.product?.name}
                      </p>
                    )}
                  </Link>
                  {!isMobile && (
                    <p
                      style={{ flex: "1" }}
                      className="flex justify-center mt-1 mb-1"
                    >
                      Quantity: {item.quantity}
                    </p>
                  )}
                  {!isMobile && (
                    <p
                      style={{ flex: "1" }}
                      className="flex justify-center mt-1 mb-1"
                    >
                      Price: <IndianCurrency amount={item.price} />
                    </p>
                  )}
                  {!isMobile && (
                    <p
                      style={{ flex: "1" }}
                      className="flex justify-center mt-1 mb-1"
                    >
                      Status: {order.status}
                    </p>
                  )}

                  {isMobile && (
                    <div
                      className="flex direction justify-center"
                      style={{ flex: "1.5" }}
                    >
                      <Link to={`/order/${order._id}`}>
                        <p
                          className="ellipsis overflow-hidden"
                          style={{
                            minWidth: "100%",
                            width: "100px",
                            color: "black",
                          }}
                        >
                          Name:{item?.product?.name}
                        </p>
                      </Link>
                      <p>Quantity:{item?.quantity}</p>
                      <p>Price:{item?.price}</p>
                      <button data-status={order.status.toUpperCase()}>
                        {order.status}
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
