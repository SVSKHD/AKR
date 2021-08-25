import {Card , CardBody , Alert , Tooltip , ButtonGroup , Button ,Row , Col, CardFooter} from "reactstrap"
import {FaCartPlus , FaEye} from "react-icons/fa"
import Default from "../images/Default.png"
import { useDispatch } from "react-redux"
import _ from "lodash"
import { useState } from "react"
import { Link } from "react-router-dom"
import {ShowAverage} from "../components/functions/Ratings"


const ProductCard = ({product}) =>{
const [alert , setAlert] = useState("Available")

const [tooltipOpen , setTooltipOpen] = useState(false)
const toggle = () => setTooltipOpen(!tooltipOpen)


const dispatch = useDispatch()
// destructirize
const {title , description , images , slug , price , quantity} = product
    // styles
const style={
backgroundColor:"#051937",
color:"white",
fontFamily:"Montserrat"
}

// add to cart
const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setAlert("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };



return(
<>
<Card className="mb-1 ProductCard">
<CardBody>
<Row>
<Col md={4}>
<img  
src={images && images.length ? images[0].url : Default} 
className="img-thumbnail"/>
</Col>
<Col md={8}>
<h4 className="text-dark">{title}</h4>
{product && product.ratings && product.ratings.length > 0 ? 
ShowAverage(product) :  "No ratings Yet"}
<h5 className="text-dark">{description.substring(0,20)}</h5>
<h2 className="text-success">₹{price}</h2>

</Col>
</Row>
</CardBody>

<CardFooter style={style}>
<Row>
<Col>
<ButtonGroup size="lg">
<Button onClick={handleAddToCart} outline color="light">
<FaCartPlus size={30}/>
</Button>
<Button tag={Link} to={`/product/${slug}`} outline color="light"><FaEye size={30}/></Button>
</ButtonGroup>
</Col>
<Col>

</Col>
</Row>
</CardFooter>
</Card>
</>
)
}
export default ProductCard