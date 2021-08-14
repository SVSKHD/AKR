import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import {Container , Row , Col , Card , CardBody , Button , ButtonGroup} from "reactstrap"
import { createOrUpdateUser } from "../../components/functions/auth"
import { auth, Facebook, googleAuthProvider } from "../../config/firebase"
import Layout from "../../layout/Layout"
import {FaGoogle , FaFacebookF} from "react-icons/fa"
import { Link } from "react-router-dom"





const Login = ({history})=>{
const [email , setEmail] = useState("")
const [password , setPassword] = useState("")
const [loading , setLoading] = useState(false)

const {user} = useSelector((state)=>({...state}))

let dispatch = useDispatch();

useEffect(()=>{
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
},[user, history])

const roleBasedRedirect = (res) => {
    // check if intended
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

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
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message,{position:"bottom-center"});
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
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
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message,{
          position:"bottom-center"
        });
      });
  };

  const FacebookLogin = async () => {
    auth
      .signInWithPopup(Facebook)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
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
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message,{
          position:"bottom-center"
        });
      });
  };



    const style={
        backgroundColor:"#051937",
        color:"white",
        fontFamily:"Montserrat"
      }
const loginForm = ()=>(
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
    Login Here 
    </h4>
    <hr/>
    </Col>
    <Col>
    <Card>
    <CardBody>
    <form>
    <input 
            type="email" 
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            autoFocus
            />

           <br/>

            <input 
            type="password" 
            className="form-control"
            placeholder="Your Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            autoFocus
            />
        <br/>
        <ButtonGroup>
        <Button
        onClick={handleSubmit}
        outline color="success"
        disabled={!email || !password}
        >
        Login
        </Button>
        <Button
        onClick={()=>googleLogin()}
        color ="danger"
        >
        <FaGoogle size={25}/>
        </Button>
        {/* <Button
        onClick={()=>FacebookLogin()}
        color ="primary"
        >
        <FaFacebookF size={25}/>
        </Button> */}
        </ButtonGroup>
        
       

    </form>
    <br/>
    <hr/>
    <Button    
    color="danger"
    tag={Link}
    to="/forgot/password"
    >
    Forgot Password
    </Button>

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
return(
<Layout>
{loginForm()}

</Layout>
)
}
export default Login 