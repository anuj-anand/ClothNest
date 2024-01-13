import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Auth Service

export const LoginService = async ({ email, password, rememberMe }) =>
  axios.post(`${BASE_URL}auth/login`, { email, password, rememberMe });

export const SignUpService = async ({ firstName, lastName, email, password }) =>
  axios.post(`${BASE_URL}auth/signup`, {
    firstName,
    lastName,
    email,
    password,
  });

export const ResetPasswordService = async ({ email, password }) =>
  axios.post(`${BASE_URL}auth/reset`, { email, password });

// Category Service

export const CategoryService = async () => axios.get(`${BASE_URL}category`);

// Products Service

export const ProductService = async () => axios.get(`${BASE_URL}product`);

export const FetchProductDetailsService = async (id) =>
  axios.get(`${BASE_URL}product/${id}`);

// Wishlist Service

export const GetWishlistService = async (encodedToken) =>
  axios.get(`${BASE_URL}user/wishlist`, {
    headers: { authorization: encodedToken },
  });

export const AddToWishlistService = async (product, encodedToken) =>
  axios.post(
    `${BASE_URL}user/wishlist`,
    { product },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const DeleteFromWishlistService = async (productId, encodedToken) =>
  axios.delete(`${BASE_URL}user/wishlist/${productId}`, {
    headers: {
      authorization: encodedToken,
    },
  });

// Cart Services

export const GetCartService = async (encodedToken) =>
  axios.get(`${BASE_URL}user/cart`, {
    headers: { authorization: encodedToken },
  });

export const AddToCartService = async (product, encodedToken) =>
  axios.post(
    `${BASE_URL}user/cart`,
    { product },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const DeleteFromCartService = async (productId, encodedToken) =>
  axios.delete(`${BASE_URL}user/cart/${productId}`, {
    headers: {
      authorization: encodedToken,
    },
  });

export const QuantityChangeService = async (productId, encodedToken, action) =>
  axios.post(
    `${BASE_URL}user/cart/${productId}`,
    { action },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const ClearCartService = async (encodedToken) =>
  axios.delete(`${BASE_URL}user/cart/clear`, {
    headers: { authorization: encodedToken },
  });

// Address Services

export const GetAddressService = async (encodedToken) =>
  axios.get(`${BASE_URL}user/address`, {
    headers: { authorization: encodedToken },
  });

export const AddAddressServive = async (address, encodedToken) =>
  axios.post(
    `${BASE_URL}user/address`,
    { address },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const DeleteAddressServive = async (addressId, encodedToken) =>
  axios.delete(`${BASE_URL}user/address/${addressId}`, {
    headers: {
      authorization: encodedToken,
    },
  });

export const UpdateAddressServive = async (addressId, address, encodedToken) =>
  axios.post(
    `${BASE_URL}user/address/${addressId}`,
    { address },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

// Orders service routes

export const GetOrdersService = async (encodedToken) =>
  axios.get(`${BASE_URL}user/orders`, {
    headers: {
      authorization: encodedToken,
    },
  });

export const AddToOrdersService = async (encodedToken, order) =>
  axios.post(
    `${BASE_URL}user/orders`,
    { order },
    { headers: { authorization: encodedToken } }
  );
