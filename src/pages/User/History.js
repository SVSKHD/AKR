import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, Row, Col, Container } from "reactstrap";
import { getUserOrders } from "../../components/functions/user";
import UserNav from "../../layout/UserNav";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ShowPaymentInfo from "../../cards/ShowPaymentInfo";
import Invoice from "../../components/orders/Invoice"


const UserHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    LoadUserOrders();
  },[]);

  const LoadUserOrders = () =>getUserOrders(user.token).then((res) => {
      setOrders(res.data);
    });

   
  const showOrderInCard = (order) => (
    
    <>
      <Row>
        {order.products.map((p, i) => (
          <Col>
            <Card className="text-dark">
              <CardBody>
                <p>Product - Name : {p.product.title}</p>
                <p>Product - Brand : {p.product.brand}</p>
                <p>Price Purchased at : {p.product.price}</p>
                <p>Product Count : {p.count}</p>
                <p>Product-Color : {p.color}</p>
                <p>Product-Currency : "INR"</p>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
     
    </>
  );


  const showDownloadLink = (order) => (
    <PDFDownloadLink
    document={<Invoice order={order}/>}
    fileName="AquaInvoice.pdf"
    className="btn btn-sm btn-block btn-outline-primary"
    >
    Download Invoice
    </PDFDownloadLink>
    );


    const showEachOrder = () => orders.map((order , i)=>(
        <>
        <div key={i}>
        <h3>Order Summary</h3>
        <hr/>
        <Row>

        <Col>
         {showOrderInCard(order)}
        </Col>
         
        <Col>
         <ShowPaymentInfo order={order}/> 
        </Col>
        
        </Row>
        <hr/>
        <br/>
        <div className="row">
        {showDownloadLink(order)}
        </div>
        </div>
        </>
        ))


  return (
    <>
      <div>
        <UserNav>
          <Card>
            <CardBody>
              <h1>User Orders</h1>
              <hr className="text-dark" />
              <Row>
              <h4 className="">{orders.length ? "Purchased Orders" : "No Purchase orders"}</h4>
               {showEachOrder()}
              </Row>
            </CardBody>
          </Card>
        </UserNav>
      </div>
    </>
  );
};
export default UserHistory;
