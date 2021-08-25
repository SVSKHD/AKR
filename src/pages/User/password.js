import { useState } from "react"
import { toast } from "react-toastify"
import {Card , CardBody } from "reactstrap"
import {Button} from "react-bootstrap"
import { auth } from "../../config/firebase"
import UserNav from "../../layout/UserNav"



const Pass = () =>{

    const [password , setPassword] = useState("")
    const [loading , setLoading] = useState(false)
     
  


    const handleSubmit = async(e) =>{
        e.preventDefault()
        await auth.currentUser.updatePassword(password)
        .then(()=>{
        toast.success("Password Updated")
        setLoading(true)
        })
        .catch(err=>{
         setLoading(false)
         toast.error(err.message)
        })
        }



const passwordUpdateForm = () =>(
<form onSubmit={handleSubmit}>
    <label>Password Update</label>
    <br className="mb-3"/>
    <input type="password" 
    onChange={e=>setPassword(e.target.value)}
    placeholder="Enter your New password"
    className="form-control"
    disabled={loading}
    />
    <br className="mb-3"/>
    <button disabled={!password || password.length<6 || loading} className="btn btn-dark">
        Submit
    </button>
</form>
)


return(
<>
<UserNav>
<Card>
<CardBody>
<h1 className="text-dark">Change Your Password</h1>
<hr className="text-dark"/>
{passwordUpdateForm()}
</CardBody>
</Card>
</UserNav>
</>
)
}
export default Pass