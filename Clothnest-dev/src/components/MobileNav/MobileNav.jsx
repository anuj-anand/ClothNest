import React, { useState } from "react";
import { useData } from "../../contexts";
import { actionTypes, filterActionType } from "../../reducers/actionTypes";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
export const MobileNav = () => {
  const { state, dispatch, pageChange } = useData();
  const [showNav, setShowNav] = useState(false);

  const maxValue = state.products.reduce(
    (acc, cur) => (acc > Number(cur.sellPrice) ? acc : Number(cur.sellPrice)),
    0
  );

  const clearFilterHandler = () => {
    dispatch({
      type: actionTypes.RESET_CHANGE,
    });
    pageChange({ selected: 0 });
  };

  const sortChangeHandler = (e) => {
    dispatch({
      type: actionTypes.FILTER_CHANGE,
      payload: {
        filterType: filterActionType.SORT_BY,
        filterValue: e.target.value,
      },
    });
    pageChange({ selected: 0 });
  };

  const ratingChangeHandler = (e) => {
    dispatch({
      type: actionTypes.FILTER_CHANGE,
      payload: {
        filterType: filterActionType.RATING,
        filterValue: e.target.value,
      },
    });
    pageChange({ selected: 0 });
  };

  const categoryChangeHandler = (e) => {
    dispatch({
      type: actionTypes.FILTER_CHANGE,
      payload: {
        filterType: filterActionType.CATEGORY,
        filterSubType: e.target.value,
        filterValue: !state.filters.categories[e.target.value],
      },
    });
    pageChange({ selected: 0 });
  };

  const priceRangeChangeHandler = (e) => {
    dispatch({
      type: actionTypes.FILTER_CHANGE,
      payload: {
        filterType: filterActionType.PRICE_RANGE,
        filterValue: e.target.value,
      },
    });
    pageChange({ selected: 0 });
  };

  return (
    <>
      <div
        className="mobileNav-heading"
        onClick={() => setShowNav((nav) => !nav)}
      >
        Apply Filters
        <span className="arrow-icon">
          {!showNav ? (
            <KeyboardArrowUpIcon className="mui-icon" />
          ) : (
            <KeyboardArrowDownIcon className="mui-icon" />
          )}
        </span>
      </div>
      {showNav && (
        <div className="mobileNav-filter-content">
          <section className="mobileNav-filter-menu">
            <div className="mobileNav-filter-header">
              <span
                className="mobileNav-filter-clear"
                onClick={clearFilterHandler}
              >
                Clear Filters
              </span>
            </div>
            <div className="mobileNav-submenu-container">
              <article className="mobileNav-filter-submenu">
                <h3 className="mobileNav-submenu-heading">Sort by</h3>
                <div className="mobileNav-submenu-content">
                  <select
                    onChange={(e) => sortChangeHandler(e)}
                    value={state.filters.sortBy}
                    className="mobileNav-filter-select"
                  >
                    <option value="">Select</option>
                    <option value="priceAscend">Price Low to High</option>
                    <option value="priceDescend">Price High to Low</option>
                    <option value="ratingAscend">Rating Low to High</option>
                    <option value="ratingDescend">Rating High to Low</option>
                  </select>
                </div>
              </article>

              <article className="mobileNav-filter-submenu">
                <h3 className="mobileNav-submenu-heading">
                  <label className="price-label" htmlFor="range">
                    Price Range
                  </label>
                </h3>
                <div className="mobileNav-submenu-content price-range">
                  <span className="min-price">50</span>
                  <span className="mid-price">{maxValue / 2}</span>
                  <span className="max-price">{maxValue}</span>
                  <input
                    type="range"
                    name="price"
                    min="50"
                    step="100"
                    max={maxValue}
                    id="range"
                    value={state.filters.priceRange}
                    onChange={priceRangeChangeHandler}
                  />
                </div>
              </article>

              <article className="mobileNav-filter-submenu">
                <h3 className="mobileNav-submenu-heading">Category</h3>
                <div className="mobileNav-submenu-content">
                  {Object.keys(state.filters.categories).map((cat) => {
                    return (
                      <div className="field" key={cat}>
                        <input
                          type="checkbox"
                          name={cat}
                          id={cat}
                          checked={state.filters.categories[cat]}
                          value={cat[0].toUpperCase() + cat.slice(1)}
                          onChange={(e) => categoryChangeHandler(e)}
                        />
                        <label htmlFor={cat}>
                          {cat[0].toUpperCase() + cat.slice(1)}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </article>

              <article className="mobileNav-filter-submenu">
                <h3 className="mobileNav-submenu-heading">Rating</h3>
                <div className="mobileNav-submenu-content">
                  <div className="mobileNav-submenu-content">
                    {[4, 3, 2].map((item) => {
                      return (
                        <div className="field" key={item}>
                          <input
                            type="radio"
                            name="Rating"
                            id={`${item}+`}
                            value={`${item}`}
                            checked={state.filters.rating === `${item}`}
                            onChange={(e) => ratingChangeHandler(e)}
                          />
                          <label htmlFor={`${item}+`}>
                            {item} Stars &amp; above
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
