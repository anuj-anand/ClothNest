import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useData } from "../../contexts";
import { useLocation, useNavigate } from "react-router-dom";
import { Cartcard, NoItem, Path } from "../../components";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ToastHandler } from "../../utilities/toastUtils";
import { useCartSummary } from "../../customHooks/Customhooks";

export const Cart = () => {
  const { state, setLoader, couponData, setCouponData } = useData();
  const CartList = [...state.cart];
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const location = useLocation();
  const { totalCostPrice, totalDiscount, totalAmount } = useCartSummary();
  const navigate = useNavigate();

  const totalQuantity = state.cart.reduce((acc, cur) => acc + cur.quantity, 0);

  const couponsAvailable = [
    {
      id: 1,
      title: "Get Flat ₹ 499 off on orders above ₹ 1999/-",
      minCartValue: 2000,
      discount: 499,
    },
    {
      id: 2,
      title: "Summer Sale! , Flat ₹ 999 off on orders above ₹ 3999/-",
      minCartValue: 4000,
      discount: 999,
    },
    {
      id: 3,
      title: "Get Flat ₹ 999 off on orders above ₹ 4999/-",
      minCartValue: 5000,
      discount: 999,
    },
  ];

  const applyCouponHandler = () => {
    if (!couponData.discount) {
      ToastHandler("error", "Select any coupon");
      return;
    }
    totalAmount(couponData.discount);
    totalDiscount(couponData.discount);
    setIsCouponApplied(true);
    setIsCouponModalOpen(false);
    ToastHandler("success", "Coupon Applied Successfully!");
  };

  const removeCouponHandler = () => {
    totalAmount((amount) => amount - couponData.discount);
    totalDiscount((discount) => discount - couponData.discount);
    setIsCouponApplied(false);
    ToastHandler("warn", "Coupon Removed Successfully!");
    setCouponData({});
  };

  return (
    <div className="cart-outer-container">
      {isCouponModalOpen && (
        <div className="coupon-modal-container">
          <div className="coupon-modal">
            <h4 className="coupon-modal-heading">Available Coupons</h4>
            <div className="close-icon">
              <CloseOutlinedIcon
                className="icon close-icon"
                onClick={() => {
                  setIsCouponModalOpen(false);
                  setIsCouponApplied(false);
                }}
              />
            </div>
            <div className="coupon-list">
              {couponsAvailable.map((coupon) => (
                <div
                  key={coupon.id}
                  className={`coupon-item ${
                    totalAmount() < coupon.minCartValue &&
                    "apply-coupon-disabled"
                  }`}
                >
                  <input
                    type="radio"
                    onChange={(e) => setCouponData(coupon)}
                    name="coupon"
                    checked={couponData.id === coupon.id}
                    disabled={totalAmount() < coupon.minCartValue}
                    id={coupon.id}
                  />
                  <label htmlFor={coupon.id}>{coupon.title}</label>
                </div>
              ))}
            </div>
            <div
              className={`apply-coupon ${
                !couponData.title && "apply-coupon-disabled"
              }`}
              onClick={applyCouponHandler}
            >
              Apply Coupon
            </div>
          </div>
        </div>
      )}
      <div className="cart-wish-path">
        <Path path={location.pathname} />
      </div>
      <h3 className="main-heading">My Cart ({state.cart.length} items)</h3>
      <main>
        {CartList.length !== 0 ? (
          <div className="cart-main">
            <section className="cart-section">
              {CartList.map((item) => (
                <Cartcard key={item._id} cartItem={item} />
              ))}
            </section>

            <section className="cart-summary-outer">
              <aside className="cart-summary">
                <h3 className="summary-heading">Cart Summary</h3>

                <div className="horizontal-rule"></div>
                <div className="pricing-details">
                  <div className="summary-items">
                    <label htmlFor="">Price ({totalQuantity} items)</label>
                    <p>₹ {totalCostPrice()}</p>
                  </div>
                  <div className="summary-items">
                    <label htmlFor="">Total Discount</label>
                    <p>- ₹ {totalDiscount()}</p>
                  </div>
                  <div className="summary-items">
                    <label htmlFor="">Delivery Charges</label>
                    {totalAmount() > 999 ? (
                      <div className="free-delivery-container">
                        <span>FREE</span>
                        <p className="free-delivery">₹ 499</p>
                      </div>
                    ) : (
                      <p>+ ₹ 499</p>
                    )}
                  </div>
                  <p className="no-delivery-charge">
                    {totalAmount() > 999
                      ? "Free delivery on orders above ₹ 999"
                      : `Add item worth ₹ ${
                          999 - totalAmount()
                        } to get Free delivery`}
                  </p>
                  {isCouponApplied && (
                    <>
                      <div className="summary-items">
                        <label htmlFor="">Coupon Discount</label>
                        <p>- ₹ {couponData.discount}</p>
                      </div>
                      <p
                        className="no-delivery-charge remove-link"
                        onClick={removeCouponHandler}
                      >
                        Remove Coupon
                      </p>
                    </>
                  )}
                </div>

                <div className="horizontal-rule"></div>

                <div className="final-amount">
                  <div className="summary-items">
                    <label htmlFor="">Total Amount</label>
                    <p>
                      ₹{" "}
                      {totalAmount() > 999
                        ? isCouponApplied
                          ? totalAmount() - couponData.discount
                          : totalAmount()
                        : totalAmount() + 499}
                    </p>
                  </div>

                  <p className="savings">
                    {" "}
                    Congrats ! You have saved ₹{" "}
                    {isCouponApplied
                      ? totalDiscount() - couponData.discount
                      : totalDiscount()}
                    on this order{" "}
                  </p>
                </div>

                <div className="horizontal-rule"></div>

                {!isCouponApplied && (
                  <div className="coupon-container">
                    <span>
                      <DiscountOutlinedIcon className="icon" />
                    </span>
                    <div
                      className="coupon-heading"
                      onClick={() => setIsCouponModalOpen(true)}
                    >
                      Apply Coupons
                    </div>
                  </div>
                )}
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate("/checkout", {
                      replace: false,
                      state: {
                        cartItems: totalQuantity,
                        cartValue:
                          totalAmount() > 999
                            ? isCouponApplied
                              ? totalAmount() - couponData.discount
                              : totalAmount()
                            : totalAmount() + 499,
                      },
                    })
                  }
                >
                  Proceed to Checkout
                </button>
              </aside>
            </section>
          </div>
        ) : (
          <NoItem
            imageUrl={
              "https://res.cloudinary.com/ajain8479/image/upload/v1648041156/E-com%20Images/empty-cart_j45eue.svg"
            }
            textContent={"Have a look into our Product Collections"}
            isButtonVisible={true}
            buttonContent={"Start Shopping"}
          />
        )}
      </main>
    </div>
  );
};
