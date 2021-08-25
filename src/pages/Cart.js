import Layout from "../layout/Layout"
import {Card , CardBody , Container, Row , Col , Button , ButtonGroup} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import {userCart} from "../components/functions/user"
import {FaShoppingBag} from "react-icons/fa"
import ProductCartCard from "../cards/ProductCartCard"
import { Link } from "react-router-dom"


const Cart = ({history}) =>{
const {cart , user} = useSelector((state)=>({...state}))
const dispatch = useDispatch()

const getTotal = () =>{
    return cart.reduce((currentValue , nextValue)=>{
    return currentValue + nextValue.count * nextValue.price
    },0)
    }

    const saveOrderToDb = () => {
        // console.log("cart", JSON.stringify(cart, null, 4));
        userCart(cart, user.token)
        .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
        })
        .catch((err) => console.log("cart save err", err));
        };
        
        const saveCashOrderToDb = () => {
        // console.log("cart", JSON.stringify(cart, null, 4));
        dispatch({
        type: "COD",
        payload: true,
        });
        userCart(cart, user.token)
        .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
        })
        .catch((err) => console.log("cart save err", err));
        };
        




const style={
backgroundColor:"#051937",
color:"white",
fontFamily:"Montserrat",
Text:{
fontFamily:"Montserrat",
color:"black"
},
TitleText:{
    fontFamily:"Montserrat",
    color:"white"
    }
}


return(
<>
<Layout>
<Container>
<Card style={style}>
<CardBody>
<Row>
<Col md={8}>
<h2 style={style.TitleText}>Order Details</h2>
<hr/>
{!cart.length ? (
<div className="text-center">
    <Button tag={Link} to="/" className="btn btn-light"><FaShoppingBag/> is Empty</Button>
</div>
):(
   <>
    {cart.map((p) => (
        <ProductCartCard key={p._id} p={p}/>
    ))} 
  </>
)}
</Col>

<Col>
<h2 style={style.TitleText} >Order Summary</h2>
<hr/>
{cart.map((c,i)=>(
<div key={i}>
<ul className="text-left">
<li>
{c.title} - {c.count} = ₹ {c.price * c.count}
</li>
</ul>
</div>
))}
<hr/>
<Card>
<CardBody>
<h3 className="text-success">Grand Total : ₹ {getTotal()}</h3>
</CardBody>
</Card>
<hr/>
{user ? (
<>
<ButtonGroup>
<Button 
onClick={saveOrderToDb}
disabled={!cart.length} 
color="light">
    Proceed to Checkout
</Button>

<Button
onClick={saveCashOrderToDb}
className="btn btn-warning"
disabled={!cart.length}
>
Pay Cash on Delivery
</Button>
</ButtonGroup>
</>
):(
<Button tag={Link} to={{
pathname:"/login",
state:{from:"cart"}        
}} 
outline color="light">
Login to Checkout
</Button>
)}
</Col>
</Row>
</CardBody>
</Card>
</Container>
</Layout>
</>
)
}
export default Cart