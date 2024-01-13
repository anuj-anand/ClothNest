import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData, useAuth } from "../../contexts";
import { useWishlistHandler } from "../../customHooks/Customhooks";
import { actionTypes, cartActionTypes } from "../../reducers/actionTypes";
import { DeleteFromCartService, QuantityChangeService } from "../../services";
import { ToastHandler } from "../../utilities/toastUtils";
import "./Cartcard.css";

export const Cartcard = ({ cartItem }) => {
  const { token } = useData();
  const { state, dispatch, setLoader } = useData();
  const { toggleWishlist } = useWishlistHandler();
  const navigate = useNavigate();

  const [{ wished }] = state.products.filter(
    (wish) => wish._id === cartItem._id
  );

  cartItem.wished = wished;

  const deleteCartHandler = async () => {
    try {
      setLoader(true);
      const { data, status } = await DeleteFromCartService(cartItem._id, token);
      ToastHandler("success", "Item removed from Cart");

      if (status === 200 || status === 201) {
        dispatch({
          type: actionTypes.SET_CART,
          payload: { cart: data.cart },
        });
      }
    } catch (err) {
      ToastHandler("error", "Error while updating Cart");
    } finally {
      setLoader(false);
    }
  };

  const incrementQtyHandler = async () => {
    try {
      setLoader(true);
      const { status, data } = await QuantityChangeService(
        cartItem._id,
        token,
        {
          type: cartActionTypes.QTY_INCREMENT,
        }
      );

      if (status === 200 || status === 201) {
        ToastHandler("success", "Item quantity incremented");
        dispatch({
          type: actionTypes.SET_CART,
          payload: { cart: data.cart },
        });
      }
    } catch (err) {
      ToastHandler("error", "Error while updating Cart");
    } finally {
      setLoader(false);
    }
  };

  const decrementQtyHandler = async () => {
    try {
      setLoader(true);
      if (cartItem.quantity === 1) {
        deleteCartHandler();
        return;
      }
      const { status, data } = await QuantityChangeService(
        cartItem._id,
        token,
        {
          type: cartActionTypes.QTY_DECREMENT,
        }
      );

      if (status === 200 || status === 201) {
        ToastHandler("success", "Item quantity decremented");
        dispatch({
          type: actionTypes.SET_CART,
          payload: { cart: data.cart },
        });
      }
    } catch (err) {
      ToastHandler("error", "Error while updating Cart");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="product">
      <div
        className="product-img"
        onClick={() => navigate(`/products/${cartItem._id}`)}
      >
        <img src={cartItem.imageUrl} alt="product image" loading="lazy" />
      </div>
      <div className="product-content">
        <h4 className="product-name">{cartItem.title}</h4>
        <div className="product-pricing">
          <div className="price">
            <p className="sell-price">{`₹ ${cartItem.sellPrice}`}</p>
            <p className="cost-price">{`₹ ${cartItem.listPrice}`}</p>
          </div>
          <div className="discount">{`(${Math.ceil(
            ((cartItem.listPrice - cartItem.sellPrice) * 100) /
              cartItem.listPrice
          )}% Off)`}</div>
        </div>
        <div className="quantity">
          <label>Quantity:</label>
          <div className="quantity-container">
            <div className="minus" onClick={decrementQtyHandler}>
              -
            </div>
            <div className="qty">{cartItem.quantity}</div>
            <div className="plus" onClick={incrementQtyHandler}>
              +
            </div>
          </div>
        </div>
        <div className="btn-container">
          <button className="btn" onClick={deleteCartHandler}>
            Remove from Cart
          </button>
          {cartItem.wished ? (
            <button className="btn btn-tertiary">
              <Link to="/wishlist">Go to Wishlist</Link>
            </button>
          ) : (
            <button
              className="btn btn-tertiary"
              onClick={() => toggleWishlist(cartItem, null, true)}
            >
              Move to Wishlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
