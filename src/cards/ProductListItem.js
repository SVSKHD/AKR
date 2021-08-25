import {Table} from "reactstrap"
import priceformatter from 'priceformatter';
import { Link } from "react-router-dom";
import {FaCheckCircle , FaTimes} from "react-icons/fa"

const ProductListItems = ({product}) =>{

const style={
backgroundColor:"#051937",
color:"white",
fontFamily:"Montserrat",
Text:{
fontFamily:"Montserrat",
color:"black"
}
}


const {
    price,
    category,
    subs,
    shipping, color , brand, quantity , sold
} = product
return(
<>
<h3 style={style.Text} className="text-center">Specifications</h3>
<Table className="text-center">
<tbody>



<tr>
<td><h5>Price</h5></td>
<td><h5 className="text-success">{priceformatter(price)}</h5></td>
</tr>

<tr>
{category && (
<>
<td>
<h5>Category{" "} : </h5>
</td>
<td>
<h5>
<Link
to={`/category/${category.slug}`}
className="label label-default label-pill pull-xs-right"
>
<h5>{category.name}</h5>
</Link>
</h5>
</td>
</>
)}
</tr>


<tr>
{subs && (
<>
<td>
<h5>Category{" "} : </h5>
</td>
<td>
{subs.map((s) => (
<Link
key={s._id}
to={`/subcategory/${s.slug}`}
className="label label-default label-pill pull-xs-right"
>
<h5>{s.name}</h5>
</Link>
))}
</td>
</>
)}
</tr>



<tr>
<td><h5>Shipping{" "}:</h5></td>
<td>
<h5>{shipping ? <FaCheckCircle className="text-success" size={28}/> : <FaTimes size={28}/>}</h5>
</td>
</tr>


<tr>
<td><h5>Color{" "}:</h5></td>
<td>
<h5>{color}</h5>
</td>
</tr>

<tr>
<td><h5>Brand{" "}:</h5></td>
<td>
<h5>{brand}</h5>
</td>
</tr>

<tr>
<td><h5>Quantity{" "}:</h5></td>
<td>
<h5>{quantity && quantity<50 ? ( <h5 className="text-danger">({quantity}) hurry up</h5> ) : (<h5 className="text-info">({quantity}) in Stock </h5>)}</h5>
</td>
</tr>



</tbody>
</Table>
</>
)
}
export default ProductListItems