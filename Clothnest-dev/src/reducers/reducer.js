import { actionTypes } from "./actionTypes";

let maxValue;

export const initialState = {
  filters: {
    sortBy: "",
    categories: {},
    rating: "",
    search: "",
    priceRange: 0,
    arrivalTrend: "",
  },
  products: [],
  wishlist: [],
  cart: [],
  categories: [],
  address: [],
  orders: [],
};

export const DataReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS:
      maxValue = action.payload.products.reduce(
        (acc, cur) => (acc > cur.sellPrice ? acc : cur.sellPrice),
        0
      );

      return {
        ...state,
        products: action.payload.products.map((prod) => ({
          ...prod,
          wished: false,
          carted: false,
        })),
        filters: {
          ...state.filters,
          priceRange: maxValue,
        },
      };

    case actionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories,
        filters: {
          ...state.filters,
          categories: action.payload.categories.reduce(
            (acc, curr) => ({ ...acc, [curr.title]: false }),
            {}
          ),
        },
      };

    case actionTypes.SET_CART:
      return {
        ...state,
        cart: [...action.payload.cart],
        products: state.products.map((prod) => ({
          ...prod,
          carted: action.payload.cart.some((item) => item._id === prod._id),
        })),
      };

    case actionTypes.SET_WISHLIST:
      return {
        ...state,
        wishlist: [...action.payload.wishlist],
        products: state.products.map((prod) => ({
          ...prod,
          wished: action.payload.wishlist.some((wish) => wish._id === prod._id),
        })),
      };

    case actionTypes.SET_ADDRESS:
      return {
        ...state,
        address: action.payload.address,
      };

    case actionTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
      };

    case actionTypes.FILTER_CHANGE:
      if (action.payload.filterType === "categories") {
        const { filters } = state;
        const { categories } = filters;
        const newCategory = {
          ...categories,
          [action.payload.filterSubType]: action.payload.filterValue,
        };
        return {
          ...state,
          filters: {
            ...state.filters,
            categories: { ...newCategory },
          },
        };
      } else {
        return {
          ...state,
          filters: {
            ...state.filters,
            [action.payload.filterType]: action.payload.filterValue,
          },
        };
      }

    case actionTypes.RESET_CHANGE:
      maxValue = state.products.reduce(
        (acc, cur) =>
          acc > Number(cur.sellPrice) ? acc : Number(cur.sellPrice),
        0
      );

      return {
        ...state,
        filters: {
          ...state.filters,
          sortBy: "",
          rating: "",
          categories: Object.keys(state.filters.categories).reduce(
            (acc, curr) => ({ ...acc, [curr]: false }),
            {}
          ),
          priceRange: maxValue,
          arrivalTrend: "",
        },
      };

    default:
      return state;
  }
};
