import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Layout from "../../layout/Layout"
import {auth} from "../../config/firebase"
import {toast} from "react-toastify"
import {Container , Row , Col , Card , CardBody} from "reactstrap"

const  Register = ({history}) =>{
const [email , setEmail] = useState()
// redux
const {user} = useSelector((state)=>({...state}))

useEffect(()=>{
if(user && user.token)history.push("/")
},[user,history])

const handleSubmit = async (e) =>{
e.preventDefault();
const config={
    url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
    handleCodeInApp:true,
};
await auth.sendSignInLinkToEmail(email , config)
toast.success(`Email is sent to ${email}.Click link to complete registration`,{
    position:"bottom-center"
})
window.localStorage.setItem("emailForRegistration" , email)
setEmail("")
}

const RegisterForm = () =>{
    const style={
        backgroundColor:"#051937",
        color:"white",
        fontFamily:"Montserrat"
      }
    return(
        <>
        <div className="text-center">
        <Container>
        <Card style={style}>
        <CardBody>
        <br className="Bottom"/>
        <Row>
        
        <Col>
        <h1 className="HomeFontCommon">
        Aquakart
        </h1>
        <h4 className="HomeFontCommonSUB">
        Registration Form 
        </h4>
        <hr/>
        </Col>

        <Col>
        <Card>
        <CardBody>
        <form onSubmit={handleSubmit}>
         <input
         type="email"
         className="form-control"
         placeholder="Email"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         />
         <br className="mb-2"/>
         <button type="submit" className="btn btn-success">
            Register with Email
         </button>
        </form>
        </CardBody>
        </Card>
        </Col>
        </Row>
        <br className="Bottom"/>
        </CardBody>
        </Card>
        </Container> 
        </div>
        </>
    )
}

return(
<Layout>
{RegisterForm()}
</Layout>
)
} 
export default Register