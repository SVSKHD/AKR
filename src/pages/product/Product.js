import { useEffect, useState } from "react";
import ProductCard from "../../cards/ProductCard"
import Layout from "../../layout/Layout"
import {getProduct , getRelated , productStar} from "../../components/functions/product"
import {addToWishlist} from "../../components/functions/user"
import {ShowAverage} from "../../components/functions/Ratings"
import { Container , Card ,CardBody ,Row , Col , ButtonGroup , Button , Table} from "reactstrap";
import {Carousel} from "react-responsive-carousel"
import Default from "../../images/Default.png"
import ProductListItems from "../../cards/ProductListItem"
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import StarRating from "react-star-ratings"
import RatingModal from "../../components/Modals/RatingModal"
import {FaHeart , FaCartPlus } from "react-icons/fa"
import ProductTabs from "../../components/Tabs/ProductTab";



const Product = ({match}) =>{

const [tooltip, setTooltip] = useState("Click to add");
const [product , setProduct] = useState({})
const [related , setRelated] = useState({})
const [star , setStar] = useState(0)

const {slug} = match.params
const dispatch = useDispatch()
const history = useHistory()
const {user , cart} = useSelector((state)=>({...state}))



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
    setTooltip("Added");

    // add to reeux state
    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });
    
    dispatch({
      type: "SET_VISIBLE",
      payload: unique,
    });

  }
};



const handleAddToWishlist = (e) => {
  e.preventDefault();
  addToWishlist(product._id, user.token).then((res) => {
    console.log("ADDED TO WISHLIST", res.data);
    toast.success("Added to wishlist" , {position:"bottom-center"});
    history.push("/user/wishlist");
  });
};


const onStarClick = (newRating , name) =>{
setStar(newRating)
productStar(name , star,user.token).then(res=>{
    console.log("rating Clicked", res.data)
    loadSingleproduct()
})
.catch(err=>console.log(err))
}






useEffect(()=>{ 
loadSingleproduct()
if (product.ratings && user) {
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );
  existingRatingObject && setStar(existingRatingObject.star); // current user's star
}
},[slug])

const loadSingleproduct = () =>{
getProduct(slug).then((res)=>{
    setProduct(res.data)
    getRelated(res.data._id).then(res=>setRelated(res.data))
})
console.log(related)
}

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
<h1 style={style.TitleText}>{product.title}</h1>
<hr/>
<Row>
<Col>
{product.images && product.images.length ? (
<Carousel showArrows={true} showIndicators={true} autoPlay >
{product.images && product.images.map((i)=><img src={i.url} key={i.public_id}/>)}
</Carousel>
):(
<Card cover={<img src={Default} className="mb-3"/>}>
</Card>
)}  
</Col>
<Col>
<Card>
<CardBody>

<ProductListItems product={product}/>
{product && product.ratings && product.ratings.length > 0 ? 
            ShowAverage(product) :  "No ratings Yet"}
<hr style={style.Text}/>

<div className="text-center">
<ButtonGroup size="lg">
  <Button onClick={handleAddToCart} outline color="dark"><FaCartPlus size={40}/></Button>
  <Button onClick={handleAddToWishlist} outline color="danger"><FaHeart size={40}/></Button>
  
  <Button outline color="warning">
  <RatingModal onClick={onStarClick}>
  <StarRating
  name={product._id}
  numberOfStars={5}
  rating={2}
  changeRating={onStarClick}
  isSeletable={true}
  starRatedColor="#002d80"
  />
  </RatingModal>
  </Button>

</ButtonGroup>

</div>
</CardBody>
</Card>
</Col>
</Row>
<br className="mb-3"/>
<ProductTabs
description={product.description}
/>
<br/>
<h3 style={style.TitleText}>Related Products</h3>
<hr/>

<Row>
{related.length > 0 ?  related.map((r)=>(
<Col md={6}>
<ProductCard  product={r}/>
</Col>
)):"No Related Products"}
</Row>

</CardBody>
</Card>
</Container>
</Layout>
</>
)
}
export default Product