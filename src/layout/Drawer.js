import React from "react";
import { Drawer} from "antd";
import { Card , CardBody ,Button} from "reactstrap"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Default from "../images/Default.png";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    marginBottom:"5px"
  };

  const style={
    backgroundColor:"#051937",
    color:"white",
    fontFamily:"Montserrat",
    Text:{
    fontFamily:"Montserrat",
    color:"black"
    }
    }

  return (
    <>
    <div>
    <Drawer
      style={style.Text}
      className="text-center"
      title={`Cart / ${cart.length} Product`}
      placement="right"
      closable={false}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images[0] ? (
              <>
              <Card className="mb-1">
                <CardBody>
                <img src={p.images[0].url} style={imageStyle} />
                <p className="text-center bg-dark text-light">
                  {p.title} x {p.count}
                </p>
                </CardBody>
                </Card>
              </>
            ) : (
              <>
              <Card className="mb-1">
                <CardBody>
                <img src={Default} style={imageStyle} />
                <p className="text-center bg-dark text-light">
                  {p.title} x {p.count}
                </p>
                </CardBody>
              </Card>
              </>
            )}
          </div>
        </div>
      ))}

      <Link to="/cart">
        <Button
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
          color ="dark"
        >
          Go To Cart
        </Button>
      </Link>
    </Drawer>
    </div>
    </>
  );
};

export default SideDrawer;
