import Layout from "../../layout/Layout"
import {Card , CardBody , Container ,Row , Col} from "reactstrap"

const ForgotPassword = () =>{

const style={
backgroundColor:"#051937",
color:"white",
fontFamily:"Montserrat"
}

const ForgotPasswordForm = () =>(
<>
<div>
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
Login Here 
</h4>
</Col>
<Col>
<Card>
<CardBody>
<input

/>
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
{ForgotPasswordForm()}
</Layout>
)
}
export default ForgotPassword