import { sortActionType } from "../reducers/actionTypes";

export const filterBySearch = (products, filterValue) => {
  return filterValue === ""
    ? products
    : products.filter((prod) =>
        prod.title.toLowerCase().includes(filterValue.toLowerCase())
      );
};

export const filterBySort = (products, filterValue) => {
  switch (filterValue) {
    case sortActionType.PRICE_ASCEND:
      return [...products].sort((a, b) => a.sellPrice - b.sellPrice);
    case sortActionType.PRICE_DECEND:
      return [...products].sort((a, b) => b.sellPrice - a.sellPrice);
    case sortActionType.RATING_ASCEND:
      return [...products].sort((a, b) => a.rating - b.rating);
    case sortActionType.RATING_DECEND:
      return [...products].sort((a, b) => b.rating - a.rating);
    default:
      return products;
  }
};

export const filterByRating = (products, filterValue) => {
  switch (filterValue) {
    case "4":
      return products.filter((prod) => prod.rating > 4);
    case "3":
      return products.filter((prod) => prod.rating > 3);
    case "2":
      return products.filter((prod) => prod.rating > 2);
    case "1":
      return products.filter((prod) => prod.rating > 1);
    default:
      return products;
  }
};

export const filterByCategories = (products, filterValue) => {
  const selectedCategories = Object.keys(filterValue).filter(
    (key) => filterValue[key]
  );

  return selectedCategories.length === 0
    ? products
    : products.filter((prod) => {
        if (selectedCategories.includes(prod.categoryName)) return prod;
      });
};

export const filterByPriceRange = (products, filterValue) =>
  products.filter((prod) => prod.sellPrice <= Number(filterValue));

export const filterByArrTrend = (products, filterValue) =>
  !filterValue ? products : products.filter((prod) => prod[filterValue]);
