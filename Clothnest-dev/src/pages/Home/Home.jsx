import React from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../contexts";
import { actionTypes, filterActionType } from "../../reducers/actionTypes";

export const Home = () => {
  const { dispatch, state } = useData();
  const navigate = useNavigate();
  
  const categoryClickHandler = (category) => {
    dispatch({
      type: actionTypes.FILTER_CHANGE,
      payload: {
        filterType: filterActionType.CATEGORY,
        filterSubType: category,
        filterValue: true,
      },
    });
    navigate("/products");
  };

  const arrTrendClickHandler = (filter) => {
    dispatch({
      type: actionTypes.FILTER_CHANGE,
      payload: {
        filterType: filterActionType.ARR_TREND,
        filterValue: filter,
      },
    });
    navigate("/products");
  };

  return (
    <main>
      <div className="home-hero">
        <div className="home-hero-text-overlay">
          A door towards your next Outfit.
          <div className="home-hero-shop-btn">
            <Link to="/products" className="home-hero-button">
              <div className="btn-bg"></div>
              <div className="arrow">
                <div className="arrowline arrowline-1"></div>
                <div className="arrowline arrowline-2"></div>
                <div className="arrowline arrowline-3"></div>
              </div>
              <span className="btn-text">Shop Now</span>
            </Link>
          </div>
        </div>
      </div>

      <section className="home-section-category">
        <h2 className="section-heading">Shop by Category</h2>

        <div className="categories">
          {state.categories?.map((category) => {
            return (
              <article
                key={category._id}
                className="category-article"
                onClick={() => categoryClickHandler(category.title)}
              >
                <div className="category-overlay">{category.title}</div>
                <img
                  src={category.imageURL}
                  alt={category.altText}
                  loading="lazy"
                />
              </article>
            );
          })}
        </div>
      </section>

      <section className="home-section-arrival">
        <h2 className="section-heading">Shop by Arrivals / Trending</h2>

        <div className="arrivals">
          <article
            className="new-arrivals"
            onClick={() => arrTrendClickHandler("newArrival")}
          >
            <div className="arrival-image">
              <img
                src="https://res.cloudinary.com/ajain8479/image/upload/v1648041156/E-com%20Images/arrival_mqp8rn.webp"
                alt="New arrivals"
                loading="lazy"
              />
            </div>
            <div className="arrival-content">
              <h2 className="content-subheading">New Arrivals</h2>
              <div>
                <h3 className="content-heading">Fresh in Stocks</h3>
                <p className="content-para">
                  Stay updated with our latest arrivals in each caterory
                </p>
              </div>
            </div>
          </article>

          <article
            className="new-stocks"
            onClick={() => arrTrendClickHandler("isTrending")}
          >
            <div className="arrival-image">
              <img
                src="https://res.cloudinary.com/ajain8479/image/upload/v1648041157/E-com%20Images/trending_gpaqfg.webp"
                alt="Trending"
                loading="lazy"
              />
            </div>
            <div className="arrival-content">
              <h2 className="content-subheading">Trending</h2>
              <div>
                <h3 className="content-heading">Trending Brands </h3>
                <p className="content-para">
                  Follow the trend with the most bought products
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};
