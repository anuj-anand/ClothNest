import React from "react";
import "./Wishlist.css";
import { useData } from "../../contexts";
import { useLocation } from "react-router-dom";
import { NoItem, Path, Wishlistcard } from "../../components";

export const Wishlist = () => {
  const { state } = useData();
  const location = useLocation();
  const wishList = state.products.filter((wish) => wish.wished);

  return (
    <>
      <div className="cart-wish-path">
        <Path path={location.pathname} />
      </div>
      <h3 className="main-heading">
        My Wishlist ({state.wishlist.length} items)
      </h3>

      {state.wishlist.length === 0 ? (
        <NoItem
          imageUrl={
            "https://res.cloudinary.com/ajain8479/image/upload/v1648041156/E-com%20Images/empty-wish_mh42hg.svg"
          }
          textContent={"Have a look into our Product Collections"}
          isButtonVisible={true}
          buttonContent={"Start Wishing"}
        />
      ) : (
        <main className="wishlist-main">
          <section className="wishlist-product-menu">
            {wishList.map((item) => (
              <Wishlistcard key={item._id} wishItem={item} />
            ))}
          </section>
        </main>
      )}
    </>
  );
};
