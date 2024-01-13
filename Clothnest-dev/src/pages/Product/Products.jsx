import React, { useEffect, useState } from "react";
import "./Products.css";
import "../../components/MobileNav/MobileNav.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useData } from "../../contexts";
import useFilterData from "../../customHooks/useFilterData";
import { actionTypes } from "../../reducers/actionTypes";
import {
  Authmodal,
  MobileNav,
  NoItem,
  Path,
  Productcard,
  Sidenav,
} from "../../components";
import ReactPaginate from "react-paginate";

export const Products = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { state, dispatch, setLoader, pageNumber, setpageNumber, pageChange } =
    useData();
  let location = useLocation();
  const navigate = useNavigate();
  let productsPerPage = 6;
  let pageVisited = pageNumber * productsPerPage;

  const products = useFilterData();
  let productsToShow;
  productsToShow = [
    ...products.slice(pageVisited, pageVisited + productsPerPage),
  ];

  useEffect(() => {
    pageChange({ selected: 0 });
    return () => {
      dispatch({
        type: actionTypes.RESET_CHANGE,
      });
    };
  }, [location]);

  return (
    <div className="products-outer-container">
      {showAuthModal && (
        <Authmodal
          navigate={navigate}
          setShowAuthModal={setShowAuthModal}
          path={location.pathname}
        />
      )}
      <Sidenav />
      <div className="products-container">
        <section className="product-menu">
          <div className="page-path-heading">
            <Path path={location.pathname} />
            <span className="product-counter">
              Showing All products ({products ? products.length : 0} products)
            </span>
          </div>
          {products.length === 0 ? (
            <NoItem
              imageUrl={
                "https://res.cloudinary.com/ajain8479/image/upload/v1648042612/E-com%20Images/undraw_void_-3-ggu_wjbii6.svg"
              }
              textContent={"No product found for such filter"}
            />
          ) : (
            <>
              {productsToShow.map((prod) => (
                <Productcard
                  key={prod._id}
                  setShowAuthModal={setShowAuthModal}
                  product={prod}
                />
              ))}
            </>
          )}
        </section>
        <div className="pagination-container">
          <ReactPaginate
            pageCount={Math.ceil(products.length / productsPerPage)}
            previousLabel={"<"}
            nextLabel={">"}
            onPageChange={pageChange}
            containerClassName={"paginateClass"}
            previousLinkClassName={"previousLink"}
            nextLinkClassName={"nextLink"}
            activeLinkClassName={"activeLink"}
            breakLabel={"..."}
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            forcePage={pageNumber}
          />
        </div>
      </div>
      <div className="mobile-nav">
        <MobileNav />
      </div>
    </div>
  );
};
