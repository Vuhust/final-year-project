import React, {useState} from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { IoLogOut } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import {useDispatch} from "react-redux";
import {setPage} from "../../appSlice";


function Header() {
  // const dispatch= useDispatch();
  const dispatch = useDispatch()

  return (
    <>
      <Navbar bg="dark" variant="dark" >
        <Container>
          <Navbar.Brand  onClick={(e) => dispatch(setPage({page: 'HOME'}))} > Giới thiệu  </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link  onClick={(e) => dispatch(setPage({page:'SUB_ACCOUNT' }))} >Tài khoản</Nav.Link>
            <Nav.Link onClick={(e) => dispatch(setPage({page:'ALL_SUB_ACCOUNT' }))} >Tất cả tài khoản</Nav.Link>
            {/*<Nav.Link >Pricing</Nav.Link>*/}
          </Nav>
        </Container>
        <Nav>
          <NavDropdown drop="start" title={<FontAwesomeIcon icon={faAddressCard}/>} id="collapsible-nav-dropdown">
            <NavDropdown.Item>
              <IoLogOut/>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <CiEdit/>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;
