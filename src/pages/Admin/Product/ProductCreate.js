import Layout from "../../../layout/Layout"
import {Card ,CardBody , Container , Col , Row} from "reactstrap"
import AdminNav from "../../../layout/AdminNav"
import AdminNav2 from "../../../layout/Adminnav2"
import ProductForm from "../../../components/forms/ProductForm"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getCategories , getCategorySubs } from "../../../components/functions/category"
import {CreateProduct} from "../../../components/functions/product"
import { toast } from "react-toastify"
import FileUploader from "../../../components/forms/FileUpload"
import { set } from "lodash"



const initialState = {
    title: "",
    subtitle:"",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Kent", "3M", "Grundfos", "IonExchange"],
    color: "",
    brand: "",
  };




const ProductCreate = () =>{

  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading , setLoading] = useState(false)
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(()=>{
    LoadCategories()
  },[])

  const LoadCategories = () =>{
    getCategories().then((c)=>setValues({...values , categories:c.data}))
  }
 

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateProduct(values, user.token)
      .then((res) => {
        console.log(res);
        toast.success(`${res.data.title} Product name Created`)
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err)
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCatagoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

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
{loading ? "...Loading" : "Error Occured"}
<hr/>
<FileUploader
values={values}
setValues={setValues}
setLoading={setLoading}
/>
<ProductForm
values={values}
handleChange={handleChange}
handleSubmit={handleSubmit}
setValues={setValues}
handleCategoryChange={handleCatagoryChange}
subOptions={subOptions}
showSub={showSub}
/>




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
export default ProductCreate