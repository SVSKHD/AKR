import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Layout from "../../../layout/Layout"
import {Card , CardBody , Container , Row , Col , ButtonGroup , Button} from "reactstrap"
import AdminNav from "../../../layout/AdminNav"
import AdminNav2 from "../../../layout/Adminnav2"
import { createCategory , getCategories , removeCategory} from "../../../components/functions/category"
import { toast } from "react-toastify"
import SearchForm from "../../../components/forms/SearchForm"
import {FaEdit , FaTimes} from "react-icons/fa"
import { Link } from "react-router-dom"


const CatCreate = () =>{

    const [name , setName] = useState("")
    const [loading , setLoading] = useState(false)
    const [categories , setCategories] = useState([])
    const [keyword , setKeyword] = useState("")
    
    
    useEffect(()=>{
    LoadCategories()
    },[])
    
    const LoadCategories = () =>
        getCategories().then((c)=>setCategories(c.data))
    
    
    
    const {user} = useSelector(state=>({...state}))
    
    
const handleRemove = async(slug) =>{
if(window.confirm("Delete ? ")){
setLoading(true)
removeCategory(slug , user.token)
.then(res=>{
setLoading(false)
toast.error(` ${res.data.name} deleted`)
LoadCategories()
})
.catch(err=>{
if(err.response.status === 400) toast.error(err.response.data)
})
}
}

const handleSubmit = (e) =>{
e.preventDefault()
setLoading(true)
createCategory({name},user.token)
.then(res=>{
setLoading(false)
setName("")
toast.success(`${res.data.name} Succefully created Category`)
})
.catch(err=>{
    console.log(err)
    if(err.response.status === 400) toast.error(err.response.data)
})
}



const search = (keyword) => (c) => c.name.toLowerCase().includes(keyword)





const CategoryForm = () =>{
return(
<div>
<form onSubmit={handleSubmit}>
<input
type="text"
className="form-control"
onChange={(e)=>setName(e.target.value)}
autoFocus
required
/>
<br/>
<button 
className="btn btn-outline-success">Create Category</button>
</form>
</div>
)
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
<div>
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
<h4 style={style.Text}>
Desired Category Name
</h4>
<hr/>
{CategoryForm()}
<br/>
<h3 style={style.Text}>Categories Search</h3>
<br/>
<SearchForm 
   Keyword={keyword}
   setKeyword={setKeyword}
/>
<hr style={style.Text}/>
<Row>
{categories.filter(search(keyword)).map((category)=>(
   <Col md={3}>
   <div style={style} className="card mb-1">
   <div className="card-body">
   <div class="Cardtitle">
       {category.name}
   </div>
   <hr/>
   <ButtonGroup>
      <Button outline color="danger" onClick={()=>handleRemove(category.slug)} type="button" class="btn btn-raised"><FaTimes size={30}/></Button>
      <Button outline color="warning" type="button" class="btn btn-raised">
          <Link  to={`/admin/category/${category.slug}`} className="icon">    
          <FaEdit size={30}/>
          </Link>
      </Button>
   </ButtonGroup>
   </div>
   </div>
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
</div>
</>
)
}
export default CatCreate