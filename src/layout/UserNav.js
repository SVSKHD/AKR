import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Container, Row , ListGroupItem , ListGroup} from "reactstrap"
import Layout from "./Layout"

const UserNav = (props) =>{
    const {user} = useSelector((state)=>({...state}))
    const style={
        backgroundColor:"#051937",
        color:"white",
        fontFamily:"Montserrat",
        Text:{
        fontFamily:"Montserrat",
        color:"black"
        }
        }

return(
<>
<div>
<Layout>
<Container fluid>
<Card style={style}>
<CardBody>
<Row>
<Col md={3}>
<Card className="mb-1">
<CardBody>
<h1 className="text-dark">{user.name}</h1>
</CardBody>
</Card>

<Card>
<CardBody>
<ListGroup>
      <ListGroupItem tag={Link} to="/user/orders" >Orders</ListGroupItem>
      <ListGroupItem tag={Link} to="/user/password">Password</ListGroupItem>
      <ListGroupItem tag={Link} to="/user/wishlist">WishList</ListGroupItem>
      <ListGroupItem tag={Link} to="/user/history">History</ListGroupItem>
      <ListGroupItem tag={Link} to="/contact">Contact Us</ListGroupItem>
</ListGroup>
</CardBody>
</Card>
</Col>


<Col>
{props.children}
</Col>

</Row>
</CardBody>
</Card>
</Container>
</Layout>
</div>
</>
)
}
export default UserNav