import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Layout from "../../../layout/Layout"
import {DeleteProduct , getProductbyCount} from "../../../components/functions/product"
import {Card , Col , Row , CardBody, Container} from "reactstrap"
import { toast } from "react-toastify"
import AdminNav from "../../../layout/AdminNav"
import AdminNav2 from "../../../layout/Adminnav2"
import AdminProductCard from "../../../cards/AdminProductCard"

const AllProduct = () =>{
const [products , setProducts] = useState([])
const [loading , setLoading] = useState(false)

const {user} = useSelector((state)=>({...state}))

useEffect(()=>{
getProductbyCount(100)
.then((res)=>{
    setProducts(res.data)
    setLoading(false)
})
.catch(err=>{
    setLoading(false)
    console.log(err)
})
},[])

const loadAllProducts = () => {
setLoading(true);
getProductbyCount(100)
    .then((res) => {
    setProducts(res.data);
    setLoading(false);
    })
    .catch((err) => {
    setLoading(false);
    console.log(err);
    });
};

const handleDelete = (slug) =>{
let answer = window.confirm("Delete ? ")
if(answer){
    DeleteProduct(slug , user.token)
    .then((res)=>{
        loadAllProducts()
        toast.error(`${res.data.title}. is deleted`)
    })
    .catch((err)=>{
        if(err.response.status === 400) toast.error(err.response.data)
        console.log(err)
    })
}
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
<Row>
<Col md={3}>
<AdminNav/>
</Col>

<Col>
<Card>
<CardBody>
<AdminNav2/>
<Row>
{products.map((product) => (
<Col className="mb-2" md={6} key={product._id}>
<AdminProductCard
product={product}
handleRemove={handleDelete}
/>
</Col>
))}
</Row>

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
export default AllProduct