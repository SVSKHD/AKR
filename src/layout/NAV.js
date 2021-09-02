
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
  Button,
  Container
} from 'reactstrap';
import {FaCartPlus , FaHome , FaShoppingBag , FaCartArrowDown} from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory , Link } from 'react-router-dom';
import firebase  from 'firebase';
import Layout from './Layout';


const NAVB = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  

  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch()
  let { user , cart } = useSelector((state) => ({ ...state }));
  let history = useHistory()

  const style={
    backgroundColor:"#051937",
    color:"white",
    fontFamily:"Montserrat"
  }
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const Logout = () =>{
    firebase.auth().signOut()
    dispatch({
      type:"LOGOUT",
      payload:null
    })
    history.push("/login")
  }



  return (
    
    <div>
      <br/>
      <Container fluid>
      <Navbar className="NAVB"  dark expand="md">
        <Container fluid>
        <NavbarBrand className="NAVBT" href="/">
          <Button outline color="light">
          <FaHome size={28}/>
          </Button>
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            
            <NavItem>
            <ButtonGroup>
              <Button href="/Shop" outline color="light"><FaShoppingBag size={28}/></Button>
              <Button href="/cart" outline color="light">
                <FaCartArrowDown size={28}/>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                </span>
              </Button>
            </ButtonGroup>
            </NavItem>
            
           

            {/* <UncontrolledDropdown nav inNavbar >
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
            
          </Nav>
          {!user && (
          <Nav navbar>
            <NavItem>
              <NavLink href="/login">Signin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/register">Signup</NavLink>
            </NavItem>
          </Nav>
          )} 
          {user && user.role==="admin" && (
          <Nav navbar >
             <UncontrolledDropdown  nav inNavbar>
              <DropdownToggle nav caret>
              {user.email && user.email.split("@")[0]} Dashboard
              </DropdownToggle>
              <DropdownMenu style={style} right>
                <DropdownItem>
               
                <Button size="lg" tag={Link} to="/admin/dashboard"> DashBoard </Button>
            
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                 <Button onClick={Logout} color="danger">Logout</Button>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          )}

          {user && user.role==="subscriber" && (
          <Nav navbar>
             <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              {user.email && user.email.split("@")[0]} Dashboard
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <Link to="/user/dashboard"> DashBoard </Link>
                </DropdownItem>
                <DropdownItem>
                 <NavItem>
                 <Link to="/user/wishlist">WishList</Link>
                 </NavItem>
                 </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                 <Button onClick={Logout} color="danger">Logout</Button>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          )}

        </Collapse>
      </Container>
      </Navbar>
      </Container>
    </div>
  );
}

export default NAVB;
