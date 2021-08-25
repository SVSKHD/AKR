import {useState , useEffect} from"react"
import { toast } from "react-toastify"
import Layout from "../../../layout/Layout"
import {Card  , CardBody , Container , Row , Col , ButtonGroup , Button} from "reactstrap"
import {getSubs , createSub , removeSub} from "../../../components/functions/SubCategory"
import {getCategories} from "../../../components/functions/category"
import {Link} from "react-router-dom"
import AdminNav from "../../../layout/AdminNav"
import { useSelector } from "react-redux"
import AdminNav2 from "../../../layout/Adminnav2"
import {FaEdit , FaTimes} from "react-icons/fa"
import SearchForm from "../../../components/forms/SearchForm"




const SubCreate = () =>{
const {user} = useSelector(state=>({...state}))

const [name , setName] = useState("")
const [loading , setLoading] = useState(false)
const [categories , setCategories] = useState("")
const [category , setCategory] = useState("")
const [keyword , setkeyword] = useState("")
const [subs , setSubs] = useState([])

useEffect(()=>{
LoadCategories()
LoadSubCategories()
},[])


const LoadCategories = () =>
getCategories().then((c) => setCategories(c.data));

const LoadSubCategories = () => getSubs().then((s) => setSubs(s.data));

const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(name)
    setLoading(true)
    createSub({name, parent:category }, user.token)
    .then(res=>{
    setLoading(false)
    setName("")
    toast.success(`${res.data.name} Succefully created Sub-Category`)
    LoadSubCategories()  
})
    .catch(err=>{
        console.log(err)
        setLoading(false)
        if(err.response.status === 400) toast.error(err.response.data)
    })
}

const handleRemove = async(slug) =>{
    if(window.confirm("Delete ? ")){
        setLoading(true)
        removeSub(slug , user.token)
        .then(res=>{
            setLoading(false)
            toast.error(` ${res.data.name} deleted`)
            LoadSubCategories()
        })
        .catch(err=>{
         if(err.response.status === 400){ 
            setLoading(false)
            toast.error(err.response.data) 
         }
      })
    }
}

const searched = (keyword) =>(c)=>c.name.toLowerCase().includes(keyword)

const SubCategoryForm = () =>{
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
            required
            />
            <br/>
            <button className="btn btn-outline-success">Create Sub-Category</button>
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
<Layout>
<Container fluid>
<Card style={style}>
<CardBody>
<Row>
<Col md={3}>

<AdminNav/>
</Col>

<Col md={9}>

<Card>
<CardBody>
<AdminNav2 
link2="/admin/dashboard"
/>
<Row>
<Col>
<h4 style={style.Text}>
Desired Category Name
</h4>
<br/>
<select
name="category"
className="form-control"
onChange={(e) => setCategory(e.target.value)}
>
<option>Please select Category</option>
{categories.length > 0 &&
categories.map((c) => (
<option key={c._id} value={c._id}>
{c.name}
</option>
))}
</select>
</Col>
<Col>
{SubCategoryForm()}
</Col>
</Row>
<br/>
<h3 style={style.Text}>Sub-Categories Search</h3>
<SearchForm 
   Keyword={keyword}
   setKeyword={setkeyword}
/>
<hr style={style.Text}/>
<h3 style={style.Text}>Sub-Categories List</h3>
<hr style={style.Text}/>
<Row>
{subs.filter(searched(keyword)).map((subcategory) => (
<Col md={4} className="mb-1">
<div style={style.Text} className="card">
<div className="card-body">
<div class="Cardtitle">
{subcategory.name}
</div>
<hr/>
<ButtonGroup class="btn-group btn-group-sm" role="group" aria-label="...">
<Button 
onClick={()=>handleRemove(subcategory.slug)} 
outline color="danger"
>
<FaTimes/>
</Button>
<Button outline color="warning" >
<Link  to={`/admin/subcategory/${subcategory.slug}`}>    
<FaEdit size={30} />
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
</>    
)
}
export default SubCreate