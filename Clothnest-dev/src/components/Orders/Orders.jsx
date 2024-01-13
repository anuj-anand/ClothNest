import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts";
import "./Orders.css";

export const Orders = () => {
  const { state } = useData();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const sortedOrders = state?.orders?.sort(
      (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
    );
    setOrders(sortedOrders);
  }, [state]);

  return (
    <div className="order-container">
      <div className="order-placed-container">
        {orders?.length ? (
          orders.map((order) => (
            <div className="order-details-container" key={order.paymentId}>
              <div className="address-details">
                <span className="order-confirm-text">Order Confirmed</span>
                <span className="order-date">
                  {new Date(order.orderDate).toLocaleString()}
                </span>
                <div className="order-paymentId">
                  <span className="order-sub-heading">PaymentId: </span>{" "}
                  {order.paymentId}
                </div>
                <div className="address">
                  <p className="order-sub-heading">Delivered To:</p>
                  <p>{order.deliveryAddress.name}</p>
                  <p>{order.deliveryAddress.street}</p>
                  <p>{order.deliveryAddress.city}</p>
                  <p>
                    {order.deliveryAddress.state} -
                    {order.deliveryAddress.pincode}
                  </p>
                  <p>{`Mobile - ${order.deliveryAddress.phone}`}</p>
                </div>
                <div>
                  <p className="paid-amount">Amount Paid :</p>{" "}
                  <p className="amount">₹{order.amountPaid}</p>
                </div>
              </div>
              <div className="items-details-container">
                {order.items.map((item) => (
                  <div className="item-details" key={item._id}>
                    <div className="item-imamge">
                      <img
                        src={item.imageUrl}
                        alt="product image"
                        loading="lazy"
                      />
                    </div>
                    <div className="item-desc">
                      <p className="item-desc-title">{item.title}</p>
                      <p className="item-desc-qty">Quantity: {item.quantity}</p>
                      <p className="item-desc-price">
                        Price: {item.sell_price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="no-orders">
            <p>No Orders Yet</p>
            <div className="btn-order">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/products")}
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
