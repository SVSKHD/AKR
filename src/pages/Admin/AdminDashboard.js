import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Container , Row , Col , Card , CardBody 
} from "reactstrap"
import AdminNav from "../../layout/AdminNav";
import Layout from "../../layout/Layout"
import {getOrders , changeStatus} from "../../components/functions/admin"
import {toast} from "react-toastify"
import Order from "../../components/orders/Order"
import AdminNav2 from "../../layout/Adminnav2";


const AdminDashboard = () =>{
const [orders, setOrders] = useState([])
const {user} = useSelector((state)=>({...state}))

useEffect(()=>{
loadOrders()
},[])

const loadOrders = () =>getOrders(user.token).then(res=>{
console.log(res.data)
setOrders(res.data)
})

const handleChnage = (orderId , orderStatus) =>{
changeStatus(orderId , orderStatus , user.token).then(res=>{
toast.success("Status Updated" ,{
position:"bottom-center"
})
loadOrders()
})
}




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
<Layout>
<Container fluid>
<Card style={style}>
<CardBody>
<h1>Admin Dashboard</h1>
<hr/>
<Row>
<Col md="3">

<AdminNav/>

</Col>

<Col md="9">
<Card>
<CardBody>
<AdminNav2
link2="/admin/dashboard"
/>
<h1 style={style.Text}>Orders</h1>
<hr/>


<Order orders={orders} handleStatusChange={handleChnage}/>


</CardBody>
</Card>
</Col>
</Row>
</CardBody>
</Card>
</Container>
</Layout>
</>
)
}
export default AdminDashboard