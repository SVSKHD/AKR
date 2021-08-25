import {ListGroup, ListGroupItem , Card , CardBody} from "reactstrap" 
import { Link } from "react-router-dom";

const AdminNav = () =>{
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
<Card>
<CardBody>
<ListGroup>
<ListGroupItem tag={Link} to="/admin/allproducts" className="justify-content-between">All Products</ListGroupItem>
<ListGroupItem tag={Link} to="/admin/product" className="justify-content-between">Products</ListGroupItem>
<ListGroupItem tag={Link} to="/admin/password" className="justify-content-between">Password</ListGroupItem>
<ListGroupItem tag={Link} to="/admin/allusers"className="justify-content-between">All Users</ListGroupItem>
<ListGroupItem tag={Link} to="/admin/category"className="justify-content-between">Categories</ListGroupItem>
<ListGroupItem tag={Link} to="/admin/subcategory" className="justify-content-between">Sub Categories </ListGroupItem>
<ListGroupItem tag={Link} to="/admin/coupon" className="justify-content-between">Coupon</ListGroupItem>
<hr/>
<h4 style={style.Text}>Blog-Section</h4>
<ListGroupItem tag={Link} to="/admin/blogcategory" className="justify-content-between">Blog-Category</ListGroupItem>
<ListGroupItem tag={Link} to="/admin/blog" className="justify-content-between">Blogs</ListGroupItem>
</ListGroup>
</CardBody>
</Card>
</>
)
}
export default AdminNav