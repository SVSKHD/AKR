import {Card , CardBody ,Col , Row , CardFooter , ButtonGroup , Button} from "reactstrap"
import {FaTimes , FaEdit} from "react-icons/fa"
import { Link } from "react-router-dom"
import Default from "../images/Default.png"

const AdminProductCard = ({product , handleRemove}) =>{

const {title , description , images , slug} = product

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
<Card style={style.Text}>
<CardBody>
<Row>

<Col>
<img
src={images && images.length ? images[0].url : Default}
style={{ height: "250px", objectFit: "cover" }}
className="p-1"
/>
</Col>


<Col>
<h2>{title}</h2>
<hr/>
<h4>{description}</h4>
</Col>

</Row>
</CardBody>
<CardFooter style={style}>
<ButtonGroup>
<Button tag={Link} 
to={`/admin/product/${slug}`} 
outline color="light">
<FaEdit size={40}/>
</Button>
<Button onClick={()=>{handleRemove(slug)}}  outline color="danger"><FaTimes size={40}/></Button>
</ButtonGroup>
</CardFooter>
</Card>
</div>
</>
)
}
export default AdminProductCard