import axios from "axios"

export const RazorPayment = (authtoken, coupon) =>
axios.post(
`${process.env.REACT_APP_API}/razorpay`,
{ couponApplied: coupon },
{
headers: {
authtoken,
},
}
);