import { useState , useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../layout/Layout"
import {Container , Card , CardBody , Row , Col , Input} from "reactstrap"
import { Button } from "react-bootstrap"
import {
    getUserCart,
    emptyUserCart,
    applyCoupon,
    saveUserAddress,
    saveUserPhone,
    createCashOrderForUser
} from "../components/functions/user"
import { toast } from "react-toastify"





const Checkout = ({history}) =>{
const [products , setProducts] = useState([])
const [total , setTotal] = useState(0)
const [address , setAddress] = useState("")
const [phone  , setPhone] = useState("")
const [addressSaved , setAddressSaved] = useState(false)
const [phonesaved , setPhoneSaved] = useState(false)
const [coupon , setCoupon] = useState("")

const [totalAfterDiscount , setTotalAfterDiscount] = useState(0)
const [discountedError , setDiscountError] = useState("")
const {user ,COD } = useSelector((state)=>({...state}))
const couponTrueOrFalse = useSelector((state) => state.coupon);

const dispatch = useDispatch()

useEffect(()=>{
    getUserCart(user.token)
    .then(res=>{
    console.log("User Cart Res")
    setProducts(res.data.products)
    setTotal(res.data.cartTotal)
    })
    },[])



const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
    console.log("RES ON COUPON APPLIED", res.data);
    if (res.data) {
    setTotalAfterDiscount(res.data);
    // update redux coupon applied true/false
    dispatch({
    type: "COUPON_APPLIED",
    payload: true,
    });
    }
    // error
    if (res.data.err) {
    setDiscountError(res.data.err);
    // update redux coupon applied true/false
    dispatch({
    type: "COUPON_APPLIED",
    payload: false,
    });
    }
    });
    };

const showApplyCoupon = () =>(
<>
<Input
onChange={(e)=>setCoupon(e.target.value)}
value={coupon}
type="text"
placeholder="Place the valid Coupon"
className="form-control"
/>
<br/>
<button onClick={applyDiscountCoupon} className="btn btn-success">Apply</button>
</>
)

const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
    console.log("USER CASH ORDER CREATED RES ", res);
    // empty cart form redux, local Storage, reset coupon, reset COD, redirect
    if (res.data.ok) {
    // empty local storage
    if (typeof window !== "undefined") localStorage.removeItem("cart");
    // empty redux cart
    dispatch({
    type: "ADD_TO_CART",
    payload: [],
    });
    // empty redux coupon
    dispatch({
    type: "COUPON_APPLIED",
    payload: false,
    });
    // empty redux COD
    dispatch({
    type: "COD",
    payload: false,
    });
    // mepty cart from backend
    emptyUserCart(user.token);
    // redirect
    setTimeout(() => {
    history.push("/user/history");
    }, 1000);
    }
    });
    };

const emptyCart = () => {
// remove from local storage
if (typeof window !== "undefined") {
localStorage.removeItem("cart");
}
// remove from redux
dispatch({
type: "ADD_TO_CART",
payload: [],
});
// remove from backend
emptyUserCart(user.token).then((res) => {
setProducts([]);
setTotal(0);
setTotalAfterDiscount(0);
setCoupon("");
toast.success("Cart is empty. Continue shopping.",{
position:"bottom-center",
});
});
};

const showProductSummary = () =>
products.map((p, i) => (
<div key={i}>
<p className="CartQuantity">
{p.product.title} ({p.color}) x {p.count} = ₹ {" "}
{p.product.price * p.count}
</p>
</div>
));

const showAddress = () =>{
return(
<>
<CardBody>
<h2>Address</h2>
<hr/>
<Input
type="textarea"
className="form-control"
placeholder="Place Your Address Here"
onChange={(e)=>setAddress(e.target.value)}
value={address}
required
/>
<br/>
<button onClick={saveAddressToDb} className="btn btn-success">
Save Address
</button>
</CardBody>
</>
)
}

const saveAddressToDb = () => {
saveUserAddress(user.token, address).then((res) => {
if (res.data.ok) {
setAddressSaved(true);
toast.success("Address saved" , {
position:"bottom-center"
});
}
});
};

const showPhone =()=>{
return(
<>
<div>
<CardBody>
<h2>Phone</h2>
<hr/>
<input
maxLength={10}
onChange={(e)=>setPhone(e.target.value)}
value={phone}
placeholder="Place Your Phone NO"
className="form-control"
required
/>
<br/>
<button 
onClick={SavePhoneToDB} 
className="btn btn-success"
>
Save Phone
</button>
</CardBody>
</div>
</>
)
}

const SavePhoneToDB =() =>{
console.log(phone)
saveUserPhone(user.token, phone).then((res)=>{
if(res.data.ok){
setPhoneSaved(true)
toast.success("Phone Saved",{
position:"bottom-center"
})
}
})
}


const style={
backgroundColor:"#051937",
color:"white",
fontFamily:"Montserrat"
}

return(
<Layout>
<Container>
<Card style={style}>
<CardBody>
<Row>

<Col md={8}>
<h2>Contact Details</h2>
<hr/>
<Row>
<Col>
{showAddress()}
</Col>

<Col>
{showPhone()}
</Col>
</Row>
<br/>
<Container fluid>
<Card>
<CardBody>
<h5 className="text-success">Coupon</h5>
{showApplyCoupon()}
</CardBody>
</Card>
</Container>
</Col>

<Col md={4}>
<h2>Final Price Summary</h2>
<hr/>
{showProductSummary()}
<p className="CartQuantity">Cart Total : ₹ {total} </p>
<hr/>
{totalAfterDiscount > 0 && (
<p className="bg-success text-white p-2">Dsicount Applied : {totalAfterDiscount}</p>
)}
<hr/>
<div class="btn-group" role="group" aria-label="Basic example">


{COD  ? (
<Button
color="light"
disabled={ !addressSaved || !phonesaved || !products.length}
onClick={createCashOrder}
>
Place Order
</Button>
):(
<Button
className="btn btn-success"
disabled={ !addressSaved || !phonesaved || !products.length}
onClick={()=>history.push("/payment")}
>
Place Order
</Button>
)}

<br/>
</div>


<hr/>
<Button 
onClick={emptyCart} 
className="btn btn-danger">
Empty Cart
</Button>
</Col>

</Row>
<br/>

</CardBody>
</Card>
</Container>
</Layout>
)
}
export default Checkout