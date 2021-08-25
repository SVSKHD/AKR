import Layout from "../../../layout/Layout"
import {Card  , CardBody , Container , Row , Col} from "reactstrap"
import AdminNav from "../../../layout/AdminNav"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getCategory, updateCategory } from "../../../components/functions/category"
import { toast } from "react-toastify"
import AdminNav2 from "../../../layout/Adminnav2"


const CatUpdate = ({history , match}) =>{
    const {user} = useSelector((state)=>({...state}))
const [name , setName] = useState("")
const [loading , setLoading] = useState(false)

let slug = useParams()


useEffect(()=>{
LoadCategories()
},[])

const LoadCategories = () =>
getCategory(match.params.slug).then((category)=>setName(category.data.name))




const style={
backgroundColor:"#051937",
color:"white",
fontFamily:"Montserrat",
Text:{
fontFamily:"Montserrat",
color:"black"
}
}


const handleSubmit = (e) =>{
e.preventDefault()
setLoading(true)
updateCategory(match.params.slug, {name},user.token)
.then(res=>{
setLoading(false)
setName("")
toast.success(`${res.data.name} Succefully Updated Category`)
history.push("/admin/category")
})
.catch(err=>{
console.log(err)
if(err.response.status === 400) toast.error(err.response.data)
})
}


const UpdateCategoryForm = () =>{
return(
<div>
<form onSubmit={handleSubmit}>
<h4 style={style.Text}>
Desired Category Name
</h4>
<br/>
<input
type="text"
className="form-control"
onChange={(e)=>setName(e.target.value)}
autoFocus
value={name}
required
/>
<br/>
<button className="btn btn-outline-success">Update Category</button>
</form>
</div>
)
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
<AdminNav2
link2="/admin/dashboard"
/>
<hr/>
{UpdateCategoryForm()}
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
export default CatUpdate