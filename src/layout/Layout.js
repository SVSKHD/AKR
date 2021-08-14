import Footer from "./Footer"
import NAVB from "./NAV"
import {Container} from "reactstrap"

const Layout = (props) =>{
    return(
      <>
      <div>
      <NAVB/>
      <br className="mb-3"/>
      <Container fluid>
      {props.children}
      </Container>
      <br className="mb-3"/>
      <Footer/>
      </div>
      </>
    )
}
export default Layout