import Layout from "../../../layout/Layout"
import {Card  , CardBody , Container , Row , Col , ButtonGroup , Button} from "reactstrap"
import AdminNav from "../../../layout/AdminNav"
import AdminNav2 from "../../../layout/Adminnav2"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getCategories, updateCategory } from "../../../components/functions/category"
import { getSub ,updateSub } from "../../../components/functions/SubCategory"
import { toast } from "react-toastify"



const SubUpdate = ({history , match}) =>{

const {user} = useSelector((state)=>({...state}))

const [name , setName] = useState("")
const [loading , setLoading] = useState(false)
const [categories , setCategories] = useState([])
const [parent , setParent] = useState("")


let slug = useParams()

useEffect(()=>{
LoadCategories()
LoadSubCategories()
},[])

const LoadCategories = () =>
getCategories().then((c)=>setCategories(c.data))

const LoadSubCategories = () =>
getSub(match.params.slug).then((category)=>{
    setName(category.data.name)
    setParent(category.data.parent)
})

const handleSubmit = (e) =>{
    e.preventDefault()
    setLoading(true)
    updateSub(match.params.slug, {name},user.token)
    .then(res=>{
    setLoading(false)
    setName("")
    toast.success(`${res.data.name} Succefully Updated Category`)
    history.push("/admin/subcategory")
    LoadSubCategories()
    })
    .catch(err=>{
        console.log(err)
        if(err.response.status === 400) toast.error(err.response.data)
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

const UpdateCategoryForm = () =>{
return(
<div>
    <form onSubmit={handleSubmit}>
    <h4 style={style.Text}>
    Desired Sub-Category Name
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
    <button className="btn btn-outline-success">Update Sub-Category</button>
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
<Row>
<Col>
<h4 style={style.Text}>
Desired Category Name 
</h4>
<br/>
<select
name="category"
className="form-control"
onChange={(e) => setParent(e.target.value)}
>
<option>Please select Category</option>
{categories.length > 0 &&
categories.map((c) => (
<option key={c._id} value={c._id} selected={c._id === parent}>
{c.name}
</option>
))}
</select>
</Col>
<Col>
{UpdateCategoryForm()}
</Col>
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
export default SubUpdate