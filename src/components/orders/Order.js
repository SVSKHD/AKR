import { Card , CardBody , Row , Col, Container } from "reactstrap"
import {FaTimes , FaCheckCircle} from "react-icons/fa"
import PaymentInfo from "../../cards/PaymentInfo"

const  Order = ({orders , handleStatusChange}) =>{
const text = {
color:"grey",
marginBottom:"3px",
customer:{
color:"grey"
}
}
const Orderdetals = (order) =>(
<>

{order.products.map((p,i)=>(


<Card style={text} key={i}>
<CardBody>
<h3 className="text-dark">Product Details</h3>
<hr/>
<h4>Product Name : {p.product.title}</h4>
<h4>Price : {p.product.price}</h4>
<h4>Brand : {p.product.brand}</h4>
<h4>Color : {p.product.color}</h4>
<h4>Count : {p.product.count}</h4>
<h4>Shipping : 
{p.product.shipping === "Yes" ? (
<FaCheckCircle style={{ color: "green" }} size={30} />
) : (
<FaTimes style={{ color: "red" }} size={30} />
)}</h4>
<hr/>
<h3 className="text-dark">Customer Details</h3>
<hr/>
<div style={text.customer}>
<h4 >Customer Id : {order.orderdBy}</h4>
<hr/>
<h4 >Customer Name  : {order.userDetails?.name} </h4>
<hr/>
<h4 >Customer Phone  :  {order.userDetails?.phone} </h4>
<hr/>
<h4 >Customer Email  : {order.userDetails?.email}</h4>
<hr/>
<h4 >Customer Address  : {order.userDetails?.address}</h4>
</div>
</CardBody>
</Card>


))}

</>
)
return(
<>

<div className="row">
{orders.map((order) => ( 
<>

<div>
<Card className="mb-1">
<CardBody>
<Row>
<Col>
<PaymentInfo order={order}/>
<br/>

<div className="container">
<Card body inverse color="warning">
<CardBody>
<h3 className="text-dark">Delivery Status Details Update</h3>
<hr className="text-dark"/>
<div className="row">
<div className="col-md-4 text-dark">Delivery Status</div>
<div className="col-md-8">
<select
onChange={(e) =>
handleStatusChange(order._id, e.target.value)
}
className="form-control"
defaultValue={order.orderStatus}
name="status"
>
<option value="Not Processed">Not Processed</option>
<option value="Cash On Delivery">Cash On Delivery</option>
<option value="Processing">Processing</option>
<option value="Dispatched">Dispatched</option>
<option value="Cancelled">Cancelled</option>
<option value="Completed">Completed</option>
</select>
</div>
</div>
</CardBody>
</Card>
</div>

<hr/>
</Col>
<Col>
{Orderdetals(order)}
<hr/>
</Col>
</Row>
</CardBody>
</Card>


</div>
</>
))}

</div>
</>
)
}
export default Order

