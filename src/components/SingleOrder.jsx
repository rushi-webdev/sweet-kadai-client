import axios from "axios";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { fetchSingleOrderDetails } from "../slice/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import IndianCurrency from "../components/IndianCurrency";
import OrderStatusProgressBar from "./ProgressBarContainer";

// Define your styled components outside of the functional component
const TableContainer = styled.div`
  overflow-x: auto;
  max-width: 100%;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  margin-bottom: 20px;
`; 

const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
`;

const SingleOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orders.singleOrder);
  const loading = useSelector((state) => state.orders.singleOrder);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const statuses = ["Pending", "Processing", "Shipping", "Delivered"];

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
    dispatch(fetchSingleOrderDetails(id));
  }, [dispatch, id]);

  if (loading=="Pending") {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-100 flex justify-center">
      {order && (
        <div className="w-90 mt-1 rubik">
          <Link to="/orders">
            <p className="black flex align-center rubik">
              <FaLongArrowAltLeft style={{ marginRight: ".3rem" }} />
              Order
            </p>
          </Link>
          <h3 className="mt-1" style={{ fontSize: isMobile ? "1rem" : "" }}>
            OrderID #{order?._id}
          </h3>
          <p className="mt-1">
            By{" "}
            <span style={{ fontWeight: "bold" }}>
              {order?.user?.firstname} {order?.user?.lastname}
            </span>
          </p>
          <p>
            Created at{" "}
            <span style={{ fontWeight: "bold" }}>
              {formatOrderDate(order?.orderDate)}
            </span>
          </p>
          <div className="mt-1">
            <p>
              Shipping Address:{" "}
              <span style={{ fontWeight: "bold" }}>
                {order?.shippingAddress?.houseNo},
                {order?.shippingAddress?.landmark},
                {order?.shippingAddress?.village},
                {order?.shippingAddress?.district},
                {order?.shippingAddress?.state}-
                {order?.shippingAddress?.pincode}
              </span>
            </p>
          </div>
          <OrderStatusProgressBar currentStatus={order?.status} />
          <TableContainer>
            <StyledTable style={{width:isMobile?"100%":"70%"}}>
              <thead>
                <tr>
                  <StyledTh>Product Name</StyledTh>
                  <StyledTh>Image</StyledTh>
                  <StyledTh>Quantity</StyledTh>
                  <StyledTh>Price</StyledTh>
                </tr>
              </thead>
              <tbody>
                {order?.items?.map((ord, index) => (
                  <tr key={index}>
                    <StyledTd>{ord?.product?.name}</StyledTd>
                    <StyledTd>
                      <img
                        style={{ height: "100px" }}
                        src={ord?.product?.images?.[0]}
                        alt=""
                      />
                    </StyledTd>
                    <StyledTd>{ord?.quantity}</StyledTd>
                    <StyledTd>
                      <IndianCurrency amount={ord?.price} />
                    </StyledTd>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default SingleOrder;
