import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {FaStar , FaTimes} from "react-icons/fa"

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
 
  
  const style={
    backgroundColor:"#051937",
    color:"white",
    fontFamily:"Montserrat",
    Text:{
    fontFamily:"Montserrat",
    color:"black"
    }
    }


  let history = useHistory();
  let { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setModal(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      <div onClick={handleModal}>    
       {user ? <FaStar size={40}/> : "Login to leave rating"}
      </div>
      <Modal
        style={style.Text}
        centered
        isOpen={modal}
        toggle={toggle}
        onOk={() => {
          setModal(false);
          toast.success("Thanks for your review. It will apper soon");
        }}
        onCancel={() => setModal(false)}
      >
      <ModalHeader>
          <h5>Leave the rating</h5>
      </ModalHeader>
      <ModalBody>
      {children}
      </ModalBody>
      <ModalFooter>
          <Button outline color="danger" onClick={toggle}><FaTimes size={30}/></Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default RatingModal;
