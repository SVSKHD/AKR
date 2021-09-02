import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody , Col , Row} from "reactstrap"
import { getWishlist, removeWishlist } from "../../components/functions/user";
import UserNav from "../../layout/UserNav"
import {Link} from "react-router-dom"
import { FaTimesCircle } from "react-icons/fa"


const WishList = () =>{
    const [wishlist, setWishlist] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(()=>{
      loadWishlist()
    },[])

    const loadWishlist = () =>
      getWishlist(user.token).then((res) => {
        // console.log(res);
        setWishlist(res.data.wishlist);
      });
    
    const handleRemove = (productId) =>
      removeWishlist(productId, user.token).then((res) => {
        loadWishlist();
      });



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
<div>
 <UserNav>
     <Card>
         <CardBody>
             <h1>WishList</h1>
             <hr className="text-dark"/>
             <br/>
             <Row>
             {wishlist.map((p) => (
                <Col md={4}>
                <div key={p._id} className="alert alert-secondary">
                <Link to={`/product/${p.slug}`}>{p.title}</Link>
                <span
                    onClick={() => handleRemove(p._id)}
                    className="btn btn-sm float-right"
                >
                    <FaTimesCircle className="text-danger" />
                </span>
                </div>
                </Col>
            ))}
            </Row>
         </CardBody>
     </Card>
</UserNav>   
</div>
</>
)
}
export default WishList