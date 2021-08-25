import {Container , Card , CardBody , Row , Col} from "reactstrap"
import CategoryList from "../category/categorylist"
import SubList from "../components/sub/sublist"
const Footer = () =>{
  const style={
    backgroundColor:"#051937",
    color:"white",
    fontFamily:"Montserrat"
  }
  const date = new Date().getFullYear()
  return(
      <>
      <Container fluid>
      <Card style={style}>
      <CardBody>
      <div>
          <Row>
          <Col>
          <h1 className="FOOTB">AquaKart</h1>
          </Col>
          <Col>
          </Col>
          <Col>
          <div className="text-center">
          <SubList/>
          <CategoryList/>
          </div>
          </Col>
          </Row>
      </div>
      <hr/>
      <h4 className="text-center FOOTBB"><b>AquaKart © {date}</b></h4>
      </CardBody>
      </Card>
      </Container>
      </>
    )
}
export default Footer