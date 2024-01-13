import { actionTypes } from "../reducers/actionTypes";
import {
  AddAddressServive,
  AddToCartService,
  AddToWishlistService,
  DeleteAddressServive,
  DeleteFromCartService,
  DeleteFromWishlistService,
  UpdateAddressServive,
} from "../services";
import { useAuth, useData } from "../contexts";
import { ToastHandler } from "../utilities/toastUtils";
import { useNavigate } from "react-router-dom";

export const useWishlistHandler = () => {
  const { token } = useData();
  const { dispatch, setLoader } = useData();

  const toggleWishlist = async (
    product,
    setShowAuthModal,
    cartUpdateRequired = false
  ) => {
    try {
      if (!token) {
        setShowAuthModal(true);
        return;
      }
      setLoader(true);
      let res = null;
      let cartRes = null;
      if (!product.wished) {
        res = await AddToWishlistService(product, token);
        if (cartUpdateRequired) {
          cartRes = await DeleteFromCartService(product._id, token);
        }
        ToastHandler("success", "Added to Wishlist");
      } else {
        res = await DeleteFromWishlistService(product._id, token);
        ToastHandler("warn", "Item Removed from Wishlist");
      }

      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: actionTypes.SET_WISHLIST,
          payload: { wishlist: res.data.wishlist },
        });
      }
      if (cartUpdateRequired) {
        dispatch({
          type: actionTypes.SET_CART,
          payload: { cart: cartRes.data.cart },
        });
      }
    } catch (err) {
      ToastHandler("error", "Error while updating Wishlist");
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  return { toggleWishlist };
};

// Cart

export const useCartHandler = () => {
  const { token } = useData();
  const { dispatch, setLoader } = useData();
  const navigate = useNavigate();

  const addToCart = async (
    product,
    setShowAuthModal,
    wishlistUpdateRequired = false
  ) => {
    try {
      if (!token) {
        setShowAuthModal(true);
        return;
      }

      if (product.carted) {
        navigate("/cart");
        return;
      }
      setLoader(true);
      let res = await AddToCartService({ ...product, quantity: 1 }, token);

      if (res.status === 200 || res.status === 201) {
        ToastHandler("success", "Item added to Cart");
        dispatch({
          type: actionTypes.SET_CART,
          payload: { cart: res.data.cart },
        });

        if (wishlistUpdateRequired) {
          let wishlistResponse = await DeleteFromWishlistService(
            product._id,
            token
          );
          dispatch({
            type: actionTypes.SET_WISHLIST,
            payload: { wishlist: wishlistResponse.data.wishlist },
          });
        }
      }
    } catch (err) {
      ToastHandler("error", `Error while updating Cart`);
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  return { addToCart };
};

export const useCartSummary = () => {
  const { state } = useData();

  const totalCostPrice = () =>
    state.cart.reduce((acc, cur) => acc + cur.quantity * cur.listPrice, 0);

  const totalSellPrice = () =>
    state.cart.reduce((acc, cur) => acc + cur.quantity * cur.sellPrice, 0);

  const totalDiscount = () => totalCostPrice() - totalSellPrice();

  const totalAmount = () => totalCostPrice() - totalDiscount();

  return {
    totalCostPrice,
    totalSellPrice,
    totalDiscount,
    totalAmount,
  };
};

// Address

export const useAddressHandler = () => {
  const { token } = useData();
  const { dispatch, setLoader } = useData();

  const addAddress = async (address) => {
    try {
      setLoader(true);
      const { status: addressStatus, data: addressData } =
        await AddAddressServive(address, token);

      if (addressStatus === 200 || addressStatus === 201)
        dispatch({
          type: actionTypes.SET_ADDRESS,
          payload: { address: addressData.address },
        });
      ToastHandler("success", "New Address added Successfully");
    } catch (err) {
      console.error(err);
      ToastHandler("error", "Error while adding Address");
    } finally {
      setLoader(false);
    }
  };

  const removeAddress = async (addressId) => {
    try {
      setLoader(true);
      const { status: addressStatus, data: addressData } =
        await DeleteAddressServive(addressId, token);

      if (addressStatus === 200 || addressStatus === 201)
        dispatch({
          type: actionTypes.SET_ADDRESS,
          payload: { address: addressData.address },
        });
      ToastHandler("warn", "Address removed Successfully");
    } catch (err) {
      console.error(err);
      ToastHandler("error", "Error while removing Address");
    } finally {
      setLoader(false);
    }
  };

  const updateAddress = async (addressId, address) => {
    try {
      setLoader(true);
      const { status: addressStatus, data: addressData } =
        await UpdateAddressServive(addressId, address, token);

      if (addressStatus === 200 || addressStatus === 201)
        dispatch({
          type: actionTypes.SET_ADDRESS,
          payload: { address: addressData.address },
        });
      ToastHandler("success", "Address updated Successfully");
    } catch (err) {
      console.error(err);
      ToastHandler("error", "Error while updating Address");
    } finally {
      setLoader(false);
    }
  };

  return { addAddress, removeAddress, updateAddress };
};
