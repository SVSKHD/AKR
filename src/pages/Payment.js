import Layout from "../layout/Layout"
import {Card , CardBody , Container ,Row ,Col} from "reactstrap"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import StripePayment from "../components/paymentgateway/Stripe"


const promise  = loadStripe(process.env.REACT_APP_STRIPE_KEY)
const Payment = () =>{
    const style={
        backgroundColor:"#051937",
        color:"white",
        fontFamily:"Montserrat",
        Text:{
        fontFamily:"Montserrat",
        color:"black"
        },
        TitleText:{
            fontFamily:"Montserrat",
            color:"white"
            }
        }
return(
<>
<Layout>
    <Container>
      <Card style={style}>
          <CardBody>
              <h1 style={style.TitleText}>Payment Options</h1>
              <hr/>
              
    
              <Elements stripe={promise}>
                <StripePayment/>
              </Elements>
             
              
          </CardBody>
      </Card>
    </Container>
</Layout>
</>    
)
}
export default Payment