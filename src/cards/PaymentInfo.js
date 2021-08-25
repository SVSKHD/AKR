import {Card , CardBody , Container , Row , Col } from "reactstrap"
const PaymentInfo = ({order}) =>{
return(
<>
<Container fluid>
<Card body inverse color="success">
<CardBody>
<h3>Order Details</h3>
<hr/>
<div className="text-white">
<span>OrderId : {order.paymentIntent.id}</span>
        <hr/>
        <span>Amount : {(order.paymentIntent.amount/=100).toLocaleString("en-US",{
            style:"currency",
            currency:"INR"
        })}
        </span>{""}
        <hr/>
        <span>Currency : "INR"</span>{""}
        <hr/>
        <span>method : {order.paymentIntent.payment_method_types[0]} </span>{""}
        <hr/>
        <span>Payment : {order.paymentIntent.status.toUpperCase()}</span>{""}
        <hr/>
        <span>Order on : {""} 
         {new Date().toLocaleString()}
        </span>
        <hr/>
        <span>Status : {order.orderStatus}</span>
</div>
</CardBody>
</Card>
</Container>
</>
)
}
export default PaymentInfo