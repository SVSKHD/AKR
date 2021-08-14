
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
import {FaCartPlus , FaHome , FaShoppingBag} from "react-icons/fa"



const NAVB = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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
              <Button outline color="light">
                <FaCartPlus size={25}/>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                2 cart
                <span class="visually-hidden">unread messages</span>
                </span>
              </Button>
            </ButtonGroup>
            </NavItem>
            
           

            <UncontrolledDropdown nav inNavbar>
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
            </UncontrolledDropdown>
            
          </Nav>
          <Nav navbar>
            <NavItem>
              <NavLink href="/login">Signin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/register">Signup</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
      </Navbar>
      </Container>
    </div>
  );
}

export default NAVB;
