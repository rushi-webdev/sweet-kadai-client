import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { fetchSingleOrderDetails } from "../slice/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import IndianCurrency from "../components/IndianCurrency";
import { changeOrderStatus } from "../slice/AdminOrder";
import { toast } from "react-toastify";

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

const StyledForm = styled.form`
margin-top: 1rem;
`;

const StyledLabel = styled.label`
display: block;
margin-bottom: 0.5rem;
`;

const StyledSelect = styled.select`
width: 130px;
padding: 0.5rem;
margin-bottom: 1rem;
margin-right: 1rem;
`;

const StyledInput = styled.input`
padding: 0.5rem;
background-color: ${(props) => (props.isloading ? '#ccc' : '#fff')};
cursor: ${(props) => (props.isloading ? 'not-allowed' : 'pointer')};
`;

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orders.singleOrder);
  const loading = useSelector((state) => state.orders.singleOrder);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const statuses = ["Pending", "Processing", "Shipping", "Delivered"];
  const [isloading, setLoading] = useState(false);
  const [newStatus, setNewStaus] = useState(order.status);

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
  }, [dispatch]);

  useEffect(() => {
    setNewStaus(order.status);
  }, [order]);
  
  const handleStatus = async (e, id) => {
    setLoading(true);
    e.preventDefault();
    await dispatch(changeOrderStatus({ orderId: id, newStatus }));
    setLoading(false);
    toast.success("Status change successfully");
  };

  if (loading == "Pending") {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-100 flex justify-center">
      {order && (
        <div className="w-90 mt-1 rubik">
          <Link to="/admin/orders">
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
          <StyledForm onSubmit={(e) => handleStatus(e, order?._id)}>
            <StyledLabel htmlFor="status">Change Status:</StyledLabel>
            <StyledSelect
              id="status"
              onChange={(e) => setNewStaus(e.target.value)}
              value={newStatus}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </StyledSelect>
            <StyledInput
              type="submit"
              value={isloading ? "Processing" : "Submit"}
              isloading={isloading.toString()}
            />
          </StyledForm>
          <TableContainer>
            <StyledTable style={{ width: isMobile ? "100%" : "70%" }}>
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

export default OrderDetail;
