import {Card , CardBody , Container , Button} from "reactstrap"
import {FaHome} from "react-icons/fa"
import { Link } from "react-router-dom"
import Default from "../images/Default.png"

const NotFound = () =>{

return(
<>
<Container>
<br className="Bottom"/>
<Card className="text-center">
<CardBody>
<img src={Default} height="100" width={100} className="img-thumbnail rounded-circle"/>
<br style={{marginBottom:"1rem"}}/>
<h1 className="Hometext2">Sorry the requested page isn't available</h1>
<br/>
<Button outline color="success" tag={Link} to="/"><FaHome size={30}/></Button>
</CardBody>
</Card>
</Container>
</>
)
}
export default NotFound