import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Path } from "../../components";
import "./Profile.css";

export const Profile = () => {
  const location = useLocation();
  return (
    <>
      <div className="cart-wish-path">
        <Path path={location.pathname} />
      </div>
      <div className="profile-page-container">
        <div className="tab-container">
          <NavLink to="details">My Profile</NavLink>
          <NavLink to="address">Addresses</NavLink>
          <NavLink to="orders">My Orders</NavLink>
        </div>
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </>
  );
};
