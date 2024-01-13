import React from "react";
import { useData } from "../contexts";
import {
  filterByArrTrend,
  filterByCategories,
  filterByPriceRange,
  filterByRating,
  filterBySearch,
  filterBySort,
} from "../utilities/filterUtils";

export default function useFilterData() {
  const { state } = useData();
  const { filters, products } = state;
  const { sortBy, categories, rating, search, priceRange, arrivalTrend } =
    filters;

  let filteredData = [...products];

  filteredData = filterBySearch(filteredData, search);
  filteredData = filterBySort(filteredData, sortBy);
  filteredData = filterByRating(filteredData, rating);
  filteredData = filterByCategories(filteredData, categories);
  filteredData = filterByPriceRange(filteredData, priceRange);
  filteredData = filterByArrTrend(filteredData, arrivalTrend);
  return filteredData;
}
