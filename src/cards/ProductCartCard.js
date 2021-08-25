import { toast } from "react-toastify"
import {Card , CardBody , Container , Button , Row , Col} from "reactstrap"
import {Fatimes , FaCheckCircle , FaTimesCircle} from "react-icons/fa"
import { useDispatch } from "react-redux"
import Default from "../images/Default.png"
import ModalImage from "react-modal-image"


const ProductCartCard = ({p}) =>{
    const dispatch = useDispatch()
    const handleQuantityChange = (e) => {
        // console.log("available quantity", p.quantity);
        let count = e.target.value < 1 ? 1 : e.target.value;
        
        if (count > p.quantity) {
        toast.error(`Max available quantity: ${p.quantity}`);
        return;
        }
        
        let cart = [];
        
        if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        }
        
        cart.map((product, i) => {
        if (product._id == p._id) {
        cart[i].count = count;
        }
        });
        
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
        type: "ADD_TO_CART",
        payload: cart,
        });
        }
    };


    const handleRemove = () => {
        // console.log(p._id, "to remove");
        let cart = [];
        
        if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        }
        // [1,2,3,4,5]
        cart.map((product, i) => {
        if (product._id === p._id) {
        cart.splice(i, 1);
        }
        });
        
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
        type: "ADD_TO_CART",
        payload: cart,
        });
        }
        };


return(
<>
<div className="text-dark mb-2">
<Card>
<CardBody>
<Row>
<Col>
{p.images.length ? (
<ModalImage small={p.images[0].url} large={p.images[0].url} />
) : (
<ModalImage small={Default} large={Default} />
)}
</Col>

<Col>
<h5>Name : {p.title}</h5>
<h6>Price : ₹ {p.price}</h6>
<h6>Brand : {p.brand}</h6>
<hr/>

<div className="row">
<div className="col-md-4">
<h5>Quantity : </h5>
</div>
<div className="col-md-8">
<input
type="number"
className="form-control"
value={p.count}
onChange={handleQuantityChange}
/>
</div>
</div>

<hr/>

<div className="row">
<div className="col-md-4">
<h5>Shipping : </h5>
</div>
<div className="col-md-8">
{p.shipping === "Yes" ? (
<FaCheckCircle className="text-success" size={25} />
) : (
<FaTimesCircle className="text-danger" size={25}/>
)}
</div>
</div>
<hr/>
<Button
shape="round"
onClick={handleRemove}
className="btn btn-danger"
><FaTimesCircle/> Remove From Cart
</Button>

</Col>
</Row>
</CardBody>
</Card>
</div>
</>
)
}
export default ProductCartCard