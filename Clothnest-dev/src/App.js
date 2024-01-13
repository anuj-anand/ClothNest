import { Routes, Route } from "react-router-dom";
import {
  Cart,
  Checkout,
  ErrorPage,
  Home,
  Login,
  ProductDetails,
  Products,
  Profile,
  ResetPassword,
  Signup,
  Wishlist,
} from "./pages";
import { useData } from "./contexts";
import {
  Address,
  Loading,
  Navbar,
  Orders,
  PrivateRoute,
  ProfileDetails,
  ScrollToTop,
} from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { loader } = useData();

  return (
    <>
      <ScrollToTop />
      {loader && <Loading />}
      <ToastContainer
        position="bottom-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        theme="colored"
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        >
          <Route path="details" element={<ProfileDetails />} />
          <Route path="address" element={<Address />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
