import { useState } from "react";
import ProductCard from "../cards/ProductCard";
import Layout from "../layout/Layout";
import {Container , Row , Col} from "reactstrap"
import Seo from "../components/seo"

// functions

import {getProductbyCount} from "../components/functions/product"
import { useEffect } from "react";
import LandingpageSchema from "../schema/LandingSchema";


const Home = () =>{
const [products , setProducts] = useState([])
const [loading , setLoading] = useState(false)
   

useEffect(()=>{
loadAllProducts()
},[])

const loadAllProducts = () =>{
setLoading(true)
getProductbyCount(4).then((res)=>{
    setProducts(res.data)
    setLoading(false)
})
}

return(
    <>
    <Seo
    title={`AquaKart | Best Budget market`}
    description={`Aquakart is all about your basic home need with the best prices and with all flexible options in payments and many more, avail of our services and rest yourself `}
    keywords={`Aquakart , Flipkart , Bathroom Water Softeners , Water RO Purifiers , many more in Regular Use of Home`}
    image={`https://aquakart.store/static/media/Default.9c4634fa.png`}
    />
    <LandingpageSchema/>
    <Layout>
    
    
    <Container>
    <Row>
    <Col>
    <h1 className="HomeText">AquaKart</h1>
    <h2 className="Hometext2">Best Budget Mart</h2>
    </Col>
    <Col>

    </Col>
    </Row>
    </Container>
    <br/>
    <Container>
    <div className="text-center">
    <Row>
    {products.map((product)=>{
    return(
    <>
    <Col md="6">
    <ProductCard
    product={product}
    />
    </Col>
    </>
    )    
    })}
    </Row>
    </div>
    </Container>
    </Layout>
    </>
)
}
export default Home