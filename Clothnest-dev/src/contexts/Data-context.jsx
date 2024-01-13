import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { actionTypes } from "../reducers/actionTypes";
import { DataReducer, initialState } from "../reducers/reducer";
import { CategoryService, ProductService } from "../services";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const orderArray = ["Mens", "Women", "Kids", "Summer", "Winter"];
  const [loader, setLoader] = useState(false);
  const [state, dispatch] = useReducer(DataReducer, initialState);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editAddress, setEditAddress] = useState({});
  const [couponData, setCouponData] = useState({});
  const [pageNumber, setpageNumber] = useState(0);
  const browserStoredToken = JSON.parse(localStorage.getItem("userToken"));
  const browserStoredUser = JSON.parse(localStorage.getItem("userData"));
  const [activeUser, setActiveUser] = useState(browserStoredUser);
  const [token, setToken] = useState(browserStoredToken?.token);

  const pageChange = ({ selected }) => setpageNumber(selected);

  useEffect(() => {
    {
      (async () => {
        try {
          setLoader(true);

          const { status: prodStatus, data: prodData } = await ProductService();

          if (prodStatus === 200 || prodStatus === 201) {
            dispatch({
              type: actionTypes.SET_PRODUCTS,
              payload: { products: prodData?.products },
            });
          }

          const { status: categoryStatus, data: categoryData } =
            await CategoryService();

          if (categoryStatus === 200 || categoryStatus === 201) {
            dispatch({
              type: actionTypes.SET_CATEGORIES,
              payload: {
                categories: categoryData?.categories.sort(
                  (a, b) =>
                    orderArray.indexOf(a.title) - orderArray.indexOf(b.title)
                ),
              },
            });
          }
        } catch (err) {
          console.error(err.message);
        } finally {
          setLoader(false);
        }
      })();
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        loader,
        setLoader,
        showAddressModal,
        setShowAddressModal,
        editAddress,
        setEditAddress,
        couponData,
        setCouponData,
        pageNumber,
        setpageNumber,
        pageChange,
        activeUser,
        setActiveUser,
        token,
        setToken,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
