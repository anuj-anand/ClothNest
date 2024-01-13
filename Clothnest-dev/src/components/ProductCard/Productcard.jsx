import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Productcard.css";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { Link } from "react-router-dom";
import {
  useCartHandler,
  useWishlistHandler,
} from "../../customHooks/Customhooks";

export const Productcard = ({ product, setShowAuthModal }) => {
  const { toggleWishlist } = useWishlistHandler();
  const { addToCart } = useCartHandler();

  return (
    <div className="product-card ecom-card">
      <div className="card-image-container">
        <Link to={`/products/${product._id}`}>
          <img src={product.imageUrl} alt="Product Image" loading="lazy" />
        </Link>
      </div>

      {product.newArrival && <p className="badge-item">New Arrival</p>}

      {product.isTrending && <p className="badge-item">Trending</p>}

      <span
        className="heart-icon-container"
        onClick={() => toggleWishlist(product, setShowAuthModal)}
      >
        {!product.wished ? (
          <FavoriteBorderOutlinedIcon className="heart-icon" />
        ) : (
          <FavoriteIcon className="heart-icon favourite-icon" />
        )}
      </span>
      <div className="product-content-container">
        <div className="rating-category-container">
          <p className="rating">
            {product.rating}
            <span className="rating-icon">
              <StarOutlinedIcon />
            </span>
          </p>

          <p className="rating category-container">{product.categoryName}</p>
        </div>

        <p className="item-name">{product.title}</p>

        <p className="price">
          {`₹ ${product.sellPrice}`}
          <span className="mrp">{`₹ ${product.listPrice}`}</span>
          <span className="discount">{`(${Math.ceil(
            ((product.listPrice - product.sellPrice) * 100) / product.listPrice
          )}% Off)`}</span>
        </p>
      </div>

      <div className="btn-action-container">
        {!product.carted ? (
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product, setShowAuthModal)}
          >
            Add to Cart
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={() => addToCart(product, setShowAuthModal)}
          >
            Go to Cart
          </button>
        )}
      </div>
    </div>
  );
};
