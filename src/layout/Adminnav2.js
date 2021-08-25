import { Link } from "react-router-dom"
import { ButtonGroup , Button } from "reactstrap"
import {FaHome , FaArrowCircleLeft} from "react-icons/fa"

const AdminNav2 = ({link1 , link2}) =>{
return(
<>
<ButtonGroup>
<Button outline color="dark" tag={Link} to={link1}>
<FaArrowCircleLeft size={30}/>
</Button>
<Button outline color="dark" tag={Link} to={link2}>
<FaHome size={30}/>
</Button>
</ButtonGroup>
<hr className="text-black"/>
</>
)
}
export default AdminNav2