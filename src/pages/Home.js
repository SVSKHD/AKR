import { useState } from "react";
import ProductCard from "../cards/ProductCard";
import Layout from "../layout/Layout";
import {Container , Row , Col} from "reactstrap"

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
    <Layout>
    <LandingpageSchema/>
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