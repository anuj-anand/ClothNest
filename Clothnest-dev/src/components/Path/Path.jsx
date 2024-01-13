import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import "./Path.css";
import { Link } from "react-router-dom";

export const Path = ({ path }) => {
  const arrPath = path.split("/").filter((i) => i);

  return (
    <div className="page-path">
      <Link to="/" className="path-item">
        <HomeIcon />
        <span>Home</span>
      </Link>
      {arrPath[0] === "products" && !arrPath[1] && (
        <Link to={`/products`} className="path-item">
          / Products
        </Link>
      )}
      {arrPath[0] === "products" && arrPath[1] && (
        <>
          <Link to={`/products`} className="path-item">
            / Products
          </Link>
          <Link to={``} className="path-item">
            / {arrPath[1]}
          </Link>
        </>
      )}
      {arrPath[0] === "profile" && arrPath[1] === "details" && (
        <>
          <Link to={`/profile/details`} className="path-item">
            / My Profile
          </Link>
        </>
      )}
      {arrPath[0] === "profile" && arrPath[1] === "address" && (
        <>
          <Link to={`/profile/details`} className="path-item">
            / My Profile
          </Link>
          <Link to={`/profile/address`} className="path-item">
            / My Addresses
          </Link>
        </>
      )}
      {arrPath[0] === "profile" && arrPath[1] === "orders" && (
        <>
          <Link to={`/profile/details`} className="path-item">
            / My Profile
          </Link>
          <Link to={`/profile/orders`} className="path-item">
            / My Orders
          </Link>
        </>
      )}
      {arrPath[0] === "cart" && !arrPath[1] && (
        <>
          <Link to={`/products`} className="path-item">
            / Products
          </Link>
          <Link to={``} className="path-item">
            / Cart
          </Link>
        </>
      )}
      {arrPath[0] === "wishlist" && !arrPath[1] && (
        <>
          <Link to={`/products`} className="path-item">
            / Products
          </Link>
          <Link to={``} className="path-item">
            / Wishlist
          </Link>
        </>
      )}
    </div>
  );
};
