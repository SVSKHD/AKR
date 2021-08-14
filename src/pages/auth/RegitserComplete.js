import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../../layout/Layout"
import {Container , Card , CardBody , Row , Col} from "reactstrap"
import { toast } from "react-toastify"
import { createOrUpdateUser } from "../../components/functions/auth"
import { auth } from "../../config/firebase"





const RegisterComplete =({history})=>{
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
     
    let dispatch = useDispatch()
    let {user} = useSelector((state)=>({...state}))
    
    useState(()=>{
        setEmail(window.localStorage.getItem("emailForRegistration"))
        console.log(window.location.href)
        console.log(window.localStorage.getItem("emailForRegistration"))
       },[user,history])
       const handleSubmit = async (e) => {
        e.preventDefault();
        // validation
        if (!email || !password) {
          toast.error("Email and password is required",{
            position:"bottom-center"
          });
          return;
        }
    
        if (password.length < 6) {
          toast.error("Password must be at least 6 characters long",{
            position:"bottom-center"
          });
          return;
        }
    
        try {
          const result = await auth.signInWithEmailLink(
            email,
            window.location.href
          );
          //   console.log("RESULT", result);
          if (result.user.emailVerified) {
            // remove user email fom local storage
            window.localStorage.removeItem("emailForRegistration");
            // get user id token
            let user = auth.currentUser;
            await user.updatePassword(password);
            const idTokenResult = await user.getIdTokenResult();
            // redux store
            console.log("user", user, "idTokenResult", idTokenResult);
    
            createOrUpdateUser(idTokenResult.token)
              .then((res) => {
                dispatch({
                  type: "LOGGED_IN_USER",
                  payload: {
                    name: res.data.name,
                    email: res.data.email,
                    token: idTokenResult.token,
                    role: res.data.role,
                    _id: res.data._id,
                  },
                });
              })
              .catch((err) => console.log(err));
    
            // redirect
            history.push("/");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message,{position:"bottom-center"});
        }
      };
     
    const RegisterForm = () =>{
        const style={
            backgroundColor:"#051937",
            color:"white",
            fontFamily:"Montserrat"
          }
        return(
            <Container className="text-center">
            
            <Card style={style}>
            <CardBody>
            <br className="Bottom"/>
            <Row>
            <Col>
            <h1 className="HomeFontCommon">
            Aquakart
            </h1>
            <h4 className="HomeFontCommonSUB">
            Complete Your Registration
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
               disabled
               />
             
               <br className="mb-2"/>

               <input 
               type="password" 
               className="form-control"
               placeholder="password"
               value={password}
               onChange={(e)=>setPassword(e.target.value)}
               />
             
               <br className="mb-3"/>
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
        )
    }



    return(
    <Layout>
        {RegisterForm()}
    </Layout>
    )
}
export default RegisterComplete