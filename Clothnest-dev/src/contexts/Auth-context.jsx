import React, { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { actionTypes } from "../reducers/actionTypes";
import {
  GetAddressService,
  GetCartService,
  GetOrdersService,
  GetWishlistService,
  LoginService,
  ResetPasswordService,
  SignUpService,
} from "../services";
import { decodedToken } from "../utilities/helper";
import { ToastHandler } from "../utilities/toastUtils";
import { useData } from "./Data-context";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { dispatch, setLoader, token, setToken, setActiveUser } = useData();
  useEffect(async () => {
    try {
      if (token) {
        if (decodedToken() < Date.now()) {
          localStorage.clear();
          navigate("/");
          setToken();
          setActiveUser();
          ToastHandler("success", "Auto Logged out");
        } else {
          setLoader(true);
          const res = await Promise.allSettled([
            GetWishlistService(token),
            GetCartService(token),
            GetAddressService(token),
            GetOrdersService(token),
          ]);

          if (res[0].status === "fulfilled")
            dispatch({
              type: actionTypes.SET_WISHLIST,
              payload: { wishlist: res[0].value.data.wishlist },
            });
          else throw new Error("Error while fetching wishlist");

          if (res[1].status === "fulfilled")
            dispatch({
              type: actionTypes.SET_CART,
              payload: { cart: res[1].value.data.cart },
            });
          else throw new Error("Error while fetching cart");

          if (res[2].status === "fulfilled")
            dispatch({
              type: actionTypes.SET_ADDRESS,
              payload: { address: res[2].value.data.address },
            });
          else throw new Error("Error while fetching address");

          if (res[3].status === "fulfilled")
            dispatch({
              type: actionTypes.SET_ORDERS,
              payload: { orders: res[3].value.data.orders },
            });
          else throw new Error("Error while fetching orders");
        }
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoader(false);
    }
  }, [token]);

  const loginHandler = async (email, password, rememberMe, redirectionPath) => {
    try {
      setLoader(true);
      const {
        data: { user: foundUser },
        status,
      } = await LoginService({ email, password, rememberMe });
      if (status === 200 || status === 201) {
        ToastHandler("success", "Logged in Successfully....");
        localStorage.setItem(
          "userToken",
          JSON.stringify({ token: foundUser.token })
        );
        localStorage.setItem(
          "userData",
          JSON.stringify({
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email,
          })
        );
        setActiveUser({
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
        });
        setToken(foundUser.token);
        navigate(redirectionPath, { replace: true });
      } else {
        throw new Error();
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404)
          ToastHandler("error", "You are not Registered!");
        else if (err.response.status === 401)
          ToastHandler("error", "Invalid Password");
      } else {
        ToastHandler("error", "Error Occured while Login");
      }
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  const logoutHandler = () => {
    localStorage.clear();
    ToastHandler("success", "Logged out successfully....");
    setToken();
    setActiveUser();
    navigate("/");
  };

  const signUpHandler = async (firstName, lastName, email, password) => {
    try {
      setLoader(true);
      const {
        data: { user: createdUser },
        status,
      } = await SignUpService({ firstName, lastName, email, password });
      if (status === 200 || status === 201) {
        ToastHandler("success", "Signed up Successfully....");
        localStorage.setItem(
          "userToken",
          JSON.stringify({ token: createdUser.token })
        );
        localStorage.setItem(
          "userData",
          JSON.stringify({
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email,
          })
        );
        setActiveUser({
          email: createdUser.email,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
        });
        setToken(createdUser.token);
        navigate("/products");
      } else {
        throw new Error();
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409)
          ToastHandler("error", "We already have an account with this Email");
      } else {
        ToastHandler("error", "Error while SignUp");
      }
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  const resetPasswordHandler = async (email, password) => {
    try {
      setLoader(true);
      const { status, data } = await ResetPasswordService({ email, password });

      if (status === 200 || status === 201) {
        ToastHandler("success", "Password reset Successful....");
        navigate("/login");
      } else {
        throw new Error();
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404)
          ToastHandler("error", "You are not Registered!");
        else if (err.response.status === 400)
          ToastHandler("error", "Guest User Password can't be Changed");
      } else {
        ToastHandler("error", "Error while Password Reset");
      }
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginHandler,
        logoutHandler,
        signUpHandler,
        resetPasswordHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
