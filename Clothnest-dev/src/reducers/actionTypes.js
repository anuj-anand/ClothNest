export const actionTypes = {
  SET_WISHLIST: "Set Wishlist",
  SET_CART: "Set Cart",
  SET_PRODUCTS: "Set Products",
  SET_CATEGORIES: "Set Categories",
  FILTER_CHANGE: "Change Filter",
  RESET_CHANGE: "Reset Filter",
  SET_ADDRESS: "Set Address",
  SET_ORDERS: "Set Orders",
};

export const cartActionTypes = {
  QTY_INCREMENT: "increment",
  QTY_DECREMENT: "decrement",
};

export const filterActionType = {
  SORT_BY: "sortBy",
  CATEGORY: "categories",
  RATING: "rating",
  PRICE_RANGE: "priceRange",
  SEARCH: "search",
  ARR_TREND: "arrivalTrend",
};

export const sortActionType = {
  PRICE_ASCEND: "priceAscend",
  PRICE_DECEND: "priceDescend",
  RATING_ASCEND: "ratingAscend",
  RATING_DECEND: "ratingDescend",
};

export const categoryActionType = {
  MEN: "Mens",
  WOMEN: "Women",
  KIDS: "Kids",
  SUMMER: "Summer",
  WINTER: "Winter",
};
