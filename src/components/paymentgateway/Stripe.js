import {CardElement , useStripe , useElements} from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import {useSelector , useDispatch} from "react-redux"
import { createPaymentIntent } from "../../components/functions/stripe"
import {createOrder , emptyUserCart} from "../../components/functions/user"
import {Link} from "react-router-dom"
import {FaRupeeSign} from "react-icons/fa"
import axios from "axios"
import Default from "../../images/Default.png"
import "../../stripe.css"
import { RazorPayment } from "../functions/razorpay"
import Password from "antd/lib/input/Password"
import {useHistory} from "react-router-dom"


const StripePayment = () =>{
const dispatch = useDispatch()
const {user , coupon} = useSelector((state)=>({...state}))

const [succeded , setSucceeded] = useState(false)
const [error , setError] = useState(null)
const [processing , setProcessing] = useState("")
const [disabled , setDisabled] = useState(true)
const [clientSecret , setClientSecret] = useState("")

const [cartTotal , setCartTotal] = useState(0)
const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
const [payable , setPayable] = useState(0)
const [razor ,setRazor] = useState({})
const [razoruser , setRazorUser] = useState({
  name:"",
  email:"",
  phone:""
})


const history = useHistory()
const stripe = useStripe()
const elements = useElements()

useEffect(()=>{
  setRazorUser({
    name:user.name,
    email:user.email,
    contact:user.phone
  })
    createPaymentIntent(user.token).then((res)=>{
        console.log("create payment intent" , res.data)
        setCartTotal(res.data.cartTotal)
        setClientSecret(res.data.clientSecret)
        setTotalAfterDiscount(res.data.totalAfterDiscount)
        setPayable(res.data.payable)        
    })
    RazorPayment(user.token).then((res)=>{
      setRazor(res.data)
     })
},[])
console.log("Razor" , razor)    
console.log("User" , razoruser)


const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          // empty cart from local storage
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          // empty cart from redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          // reset coupon to false
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          // empty cart from database
          emptyUserCart(user.token);
        }
      });
      // empty user cart from redux store and local storage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const loadScript = (src) =>{
    return new Promise((resolve)=>{
      const script = document.createElement('script')
      script.src = src
      script.onload = () =>{
        resolve(true)
      }
      script.onerror = () =>{
        resolve(false)
      }
      document.body.appendChild(script)
    })
    
  }

  const displayRazorPay =async () =>{
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    
    if(!res){
      alert("razorpay isn't available")
      return
    }
    
 

    const options = {
      key: "rzp_test_YR3jEnw0FpssGB",
      currency: razor.currency,
      amount: razor.amount,
      name: "Aquakart | EnterPrises",
      description: 'Aquakart Payment Gateway',
      order_id: razor.id,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        
        history.push("/user/razorpay/orders")
      },
      prefill: {
        name:`${razoruser.name}`,
        email:`${razoruser.email}`,
        contact:`${razoruser.phone}`
      },
    };
    
    const paymentObject = new window.Razorpay(options)
		paymentObject.open()
  }



const handleChange =async  (e) =>{

setDisabled(e.empty)
setError(e.error ? e.error.message : "")
}



// style
const cartStyle = {
    style: {
    base: {
    color: "#32325d",
    fontFamily: "Arial, sans-serif",
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
    color: "#32325d",
    },
    },
    invalid: {
    color: "#fa755a",
    iconColor: "#fa755a",
    },
    },
    };



return(
<>
<div>
<div>

</div>
<div></div>
<hr/>
<div className="row">
<div className="col-md-7">

<div className="card">
<div className="card-body">
<h5>Product Price Details</h5>
<hr/>
<h5 className="HometextDark">Amount : <FaRupeeSign/> {cartTotal}</h5>
</div>
</div>
<br/>
{!succeded && (
<div>
{coupon && totalAfterDiscount !== undefined ? (
<div className="card">
<div className="card-body">
<div className="alert alert-success">{`Total after discount: ₹  ${totalAfterDiscount}`}</div>
</div>
</div>
) : (
<p className="alert alert-danger">No coupon applied</p>
)}

</div>
)}
</div>
<div className="col-md-5">
<hr/>
Place your Following details here
<hr/>
<p className={succeded ? "result-message" : "result-message hidden"}>
Payment Successful.{" "}
<Link to="/user/history">See it in your purchase history.</Link>
</p>
<hr/>

<div className="text-center">
<button 
onClick={displayRazorPay}
className="btn btn-light"
> Pay with Razorpay </button>
</div>

<form 
id="payment-form" 
className="stripe-form"
onSubmit={handleSubmit}
>
<CardElement
id="card-element"
options={cartStyle}
onChange={handleChange}
/>

<button 
className="stripe-button"
disabled={processing || disabled || succeded}
>
<span id="button-text">
{processing ? (<div className="spinner" id="spinner"></div>):"Pay"} </span>
</button>
<hr/>
{error && (
    <div className="card-error" role="alert">
      {error}
    </div>
)}

</form>


</div>

</div>
</div>
</>
)
}
export default StripePayment