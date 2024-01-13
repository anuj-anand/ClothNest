import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";

export function ErrorPage() {
  return (
    <>
      <div className="error-container">
        <div className="aside-container">
          <img
            src={
              "https://res.cloudinary.com/ajain8479/image/upload/v1649662035/undraw_under_construction_-46-pa_p5a1tg.svg"
            }
            alt="error-image"
            loading="lazy"
          />
        </div>
        <div className="error-content-container">
          <div className="error-heading">404 Not Found</div>
          <div className="error-sub-heading">
            Looks like you have followed a broken link
          </div>
          <Link className="error-redirect" to="/products">
            Explore Products
          </Link>
        </div>
      </div>
    </>
  );
}
