import Layout from "../../../layout/Layout"
import {Card  , CardBody , Container , Row , Col , ButtonGroup , Button} from "reactstrap"
import AdminNav from "../../../layout/AdminNav"
import AdminNav2 from "../../../layout/Adminnav2"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {getCoupons , removeCoupon , createCoupon} from "../../../components/functions/coupon"
import { toast } from "react-toastify"
import DatePicker from "react-datepicker"
import {FaTimesCircle} from "react-icons/fa"

const CouponCreate = () =>{
    const [name , setName] = useState("")
    const [expiry , setExpiry] = useState("")
    const [discount , setDiscount] = useState("")
    const [loading , setLoading] = useState("")
    const [coupons , setCoupons] = useState([])



    const {user} = useSelector((state)=>({...state}))

    useEffect(()=>{
    loadAllCoupons()
    },[])
    
    const loadAllCoupons = () => getCoupons().then((res)=>setCoupons(res.data))
    
    const handleSubmit = (e) =>{
    e.preventDefault()
    setLoading(true)
    createCoupon({name , expiry , discount},user.token)
    .then((res)=>{
    setLoading(false)
    loadAllCoupons()
    setName("")
    setDiscount("")
    setExpiry("")
    toast.success(`${res.data.name} is created`)
    })
    }
    
    
    const handleRemove = (couponId) =>{
    if(window.confirm("Delete this Coupon")){
    setLoading(true)
    removeCoupon(couponId , user.token)
    .then((res)=>{
    loadAllCoupons()
    setLoading(false)
    toast.error(`Coupon name: ${res.data.name} deleted`)
    })
    .catch((err)=>console.log(err))
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
<AdminNav2
link2="/admin/dashboard"
/>
<form onSubmit={handleSubmit}>
<div className="form-group">
<label className="text-muted">Name</label>
<input
type="text"
className="form-control"
onChange={(e) => setName(e.target.value)}
value={name}
autoFocus
required
/>
</div>

<div className="form-group">
<label className="text-muted">Discount %</label>
<input
type="text"
className="form-control"
onChange={(e) => setDiscount(e.target.value)}
value={discount}
required
/>
</div>

<div className="form-group">
<label className="text-muted">Expiry</label>
<br />
<DatePicker
className="form-control"
selected={new Date()}
value={expiry}
onChange={(date) => setExpiry(date)}
required
/>
</div>
<br/>
<button className="btn btn-outline-success">Save</button>
</form>

<hr style={style.Text}/>
<Row>
{coupons.map((c) => (
<div className="CouponCard" key={c._id}>
<Col md={4}>
<div style={style} className="card">
<div className="card-body text-left">
<div className="CouponCard">Name : {c.name}</div>
<br/>
<div>Expiry: {new Date(c.expiry).toLocaleDateString()}</div>
<br/>
<div>Discount : {c.discount}%</div>
<br/>
<button onClick={()=>{handleRemove(c._id)}} className="btn btn-danger"><FaTimesCircle/></button>
</div>
</div>
</Col>
</div>
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
export default CouponCreate