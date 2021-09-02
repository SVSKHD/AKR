
import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, ButtonGroup ,CardTitle, CardText, Row, Col, CardBody } from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import {FaEnvelopeSquare , FaWhatsapp , FaFacebookF , FaPinterestP , FaLinkedinIn} from "react-icons/fa"


const ProductTabs= ({description}) => {
  const [activeTab, setActiveTab] = useState('1');

  const style={
    backgroundColor:"#051937",
    color:"white",
    fontFamily:"Montserrat",
    Text:{
    fontFamily:"Montserrat",
    color:"black"
    }
    }

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Specifications
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Terms and Conditions
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            What you need to know
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            help
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => { toggle('5'); }}
          >
            Contact Us
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '6' })}
            onClick={() => { toggle('6'); }}
          >
            Share
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <br/>
              <Card style={style.Text}>
                <CardBody>
                    {description}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
        <br/>
         <Card className="text-center" style={style.Text}>
            <CardBody>
            <ul>
              <li>Installation is done by concerned Company Crew Men</li>
              <li>Auto Softeners Installation Process will be handled by us</li>
              <li>Plumbing Charges and Plumbing Material are variable in nature</li>
              <li>Bathroom and Washing Water Softeners are installations has to be requested us after Purchase</li>
              <li className="text-success">Immediate Delivery in any part of Hyderabad.</li>
            </ul>
            <h3 className="text-danger">What you need to know</h3>
            <hr/>
            
            <ul>
             <li>Installation is free , when it is a standard installation</li>
             <li>In Complex Scenaria plumber might be needed (if needed we can help you in that)</li>
             <li>Plumbing Charges will be charged if any complex or excess Plumbing Material</li>
             <li>Plumbing material and Plumbing charges will on Client Scope</li>
            </ul>
            </CardBody>
         </Card>
        </TabPane>
        
        <TabPane tabId="3">
        <br/>
         <Card className="text-center" style={style.Text}>
            <CardBody>
            <ul>
              <li className="text-success">Immediate Delivery in any part of Hyderabad, Will Also have Nominal charges with contraint of distance</li>
            </ul>
            </CardBody>
         </Card>
        </TabPane>
        <TabPane tabId="4">
        <br/>
         <Card className="text-center" style={style.Text}>
            <CardBody>
            <Button outline color="dark" tag={Link}>Blogs</Button>
            <br/>
            <h6 className="text-danger">Note: We have listed every issue with our real-time experience, 80 % of cases match our listed problems here, 
                we also have listed out solutions for that, 
                if still problem persists you can contact us.
            </h6>
            </CardBody>
         </Card>
        </TabPane>
        <TabPane tabId="5">
        <br/>
         <Card className="text-center" style={style.Text}>
            <CardBody>
            <Button outline color="dark" tag={Link}>Contact us</Button>
            <br className="mb-3"/>
            <ButtonGroup>
                <Button outline color="dark"><FaEnvelopeSquare size={40}/></Button>
                <Button outline color="success"><FaWhatsapp size={40}/></Button>
            </ButtonGroup>
            </CardBody>
         </Card>
        </TabPane>
        <TabPane tabId="6">
        <br/>
         <Card className="text-center" style={style.Text}>
            <CardBody>
            <ButtonGroup>
                <Button outline color="dark"><FaEnvelopeSquare size={40}/></Button>
                <Button outline color="success"><FaWhatsapp size={40}/></Button>
                <Button outline color="primary"><FaFacebookF size={40}/></Button>
                <Button outline color="danger"><FaPinterestP size={40}/></Button>
                <Button outline color="primary"><FaLinkedinIn size={40}/></Button>
            </ButtonGroup>
            </CardBody>
         </Card>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default ProductTabs;


