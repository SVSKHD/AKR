
import {BrowserRouter as Router , Route , Switch} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import { useDispatch } from "react-redux";
import { useEffect , lazy , Suspense } from "react";
import {auth} from "./config/firebase"
import {currentUser} from "./components/functions/auth"
// pages
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Shop from "./pages/Shop";
import RegisterComplete from "./pages/auth/RegitserComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";



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
    <Router>
    <Suspense>

   
    <ToastContainer/>
    <Switch>
    
    <Route exact path="/" component={Home}/>
    <Route exact path="/register" component={Register}/>
    <Route exact path="/register/complete" component={RegisterComplete}/>
    <Route exact path="/forgot/password" component={ForgotPassword}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/Shop" component={Shop}/>
    </Switch>
    </Suspense>
    </Router>
  </div>
  );
}

export default Routing;
