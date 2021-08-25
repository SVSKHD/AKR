

import {BrowserRouter as Router , Route , Switch} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import { useDispatch } from "react-redux";
import { useEffect , lazy , Suspense } from "react";
import {auth} from "./config/firebase"
import {currentUser} from "./components/functions/auth"
import {FaSpinner} from "react-icons/fa"

import "react-datepicker/dist/react-datepicker.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// privaterouets
import AdminRoute from "./components/Routes/AdminRoute";
import UserRoute from "./components/Routes/UserRoute";
import password from "./pages/User/password";





// pages
const Home = lazy(()=>import("./pages/Home"))
// auth
const Register = lazy(()=>import("./pages/auth/Register"))
const Login = lazy(()=>import("./pages/auth/Login"))
const RegisterComplete = lazy(()=>import("./pages/auth/RegitserComplete"))
const ForgotPassword = lazy(()=>import("./pages/auth/ForgotPassword"))
// shop
const Shop = lazy(()=>import("./pages/Shop"))
// routes
const Product = lazy(()=>import("./pages/product/Product"))
const Cart = lazy(()=>import("./pages/Cart"))
const Checkout = lazy(()=>import("./pages/Checkout"))
const Payment = lazy(()=>import("./pages/Payment"))
const FAQ = lazy(()=>import("./pages/faq"))
// notfound
const NotFound = lazy(()=>import("./pages/NotFound"))
// Admin
const AdminDashboard = lazy(()=>import("./pages/Admin/AdminDashboard"))
// category
const CatCreate = lazy(()=>import("./pages/Admin/category/Category"))
const CatUpdate = lazy(()=>import("./pages/Admin/category/CategoryUpdate"))
// subcate
const SubCreate = lazy(()=>import("./pages/Admin/subcategory/SubCreate"))
const SubUpdate = lazy(()=>import("./pages/Admin/subcategory/Subupdate"))
const CouponCreate = lazy(()=>import("./pages/Admin/Coupon/CouponCreate"))
// product
const AllProduct = lazy(()=>import("./pages/Admin/Product/AllProduct"))
const ProductCreate = lazy(()=>import("./pages/Admin/Product/ProductCreate"))
// user
const UserDashboard = lazy(()=>import("./pages/User/UserDashboard"))
const Password = lazy(()=>import("./pages/User/password"))

// cartsidebar
const SideDrawer = lazy(()=>import("./layout/Drawer"))



// import Register from "./pages/auth/Register";
// import Login from "./pages/auth/Login";
// import Shop from "./pages/Shop";
// import RegisterComplete from "./pages/auth/RegitserComplete";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import Product from "./pages/product/Product"
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Payment from "./pages/Payment";
// // admin

// import  from "./pages/Admin/AdminDashboard";






function Routing() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
    const idTokenResult = await user.getIdTokenResult();
    console.log("user", user);
    // save in DB
    currentUser(idTokenResult.token)
    .then((res) => {
    dispatch({
    type: "LOGGED_IN_USER",
    payload: {
    name: res.data.name,
    email: res.data.email,
    token: idTokenResult.token,
    role: res.data.role,
    _id: res.data._id,
    },
    });
    })
    .catch((err) => console.log(err));
    }
    });
    // cleanup
    return () => unsubscribe();
    }, [dispatch]);


  return (
  <div>
    
    <Suspense
    fallback={
      <div className="col text-center p-5 Loader">
      <h1 className="Loaderfont">Aquakart</h1>
      <FaSpinner className="Rotate" size={30}/>
      </div>
    }
    >

    <Router>
    <SideDrawer/>
    <ToastContainer/>
    <Switch>
    
    <Route exact path="/" component={Home}/>
    <Route exact path="/register" component={Register}/>
    <Route exact path="/register/complete" component={RegisterComplete}/>
    <Route exact path="/forgot/password" component={ForgotPassword}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/Shop" component={Shop}/>
    <Route exact path="/cart" component={Cart}/>
    <Route exact path="/checkout" component={Checkout}/>
    <Route exact path="/payment" component={Payment}/>
    {/* about */}
    <Route exact path="/faq" component={FAQ}/>
    {/* /* product */}
    <Route exact path="/product/:slug" component={Product}/>
    {/* admin */}
    <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/> 
    <AdminRoute exact path="/admin/category" component={CatCreate}/>
    <AdminRoute exact path="/admin/category/:slug" component={CatUpdate}/>
    <AdminRoute exact path="/admin/subcategory" component={SubCreate}/>
    <AdminRoute exact path="/admin/subcategory/:slug" component={SubUpdate}/>
    <AdminRoute exact path="/admin/coupon" component={CouponCreate}/>
    {/* adminproduct */}
    <AdminRoute exact path="/admin/allproducts" component={AllProduct}/>
    <AdminRoute exact path="/admin/product" component={ProductCreate}/>
    {/* userRoutes */}
    <UserRoute exact path="/user/dashboard" component={UserDashboard}/>
    <UserRoute exact path="/user/password" component={password}/>
    {/* notfound */}
    <Route exact path="*" component={NotFound}/>
    </Switch>
    </Router>
    </Suspense>
  </div>
  );
}

export default Routing;
