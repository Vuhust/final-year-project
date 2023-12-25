import React, {useState} from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAddressCard, faQrcode} from '@fortawesome/free-solid-svg-icons';
import { IoLogOut , IoQrCodeSharp } from "react-icons/io5";
import { CiEdit  } from "react-icons/ci";
import {useDispatch} from "react-redux";
import {setPage} from "../../appSlice";
import {comopentShow} from "../common/common";
import {fetchQr, setShow} from "../qr/qrSlice";


function Header() {
  // const dispatch= useDispatch();
  const dispatch = useDispatch()

  return (
    <>
      <Navbar bg="dark" variant="dark" >
        <Container>
          <Navbar.Brand  onClick={(e) => dispatch(setPage({page: 'HOME'}))} > Giới thiệu  </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link  onClick={(e) => dispatch(setPage(comopentShow.SUB_ACCOUNT)) } >Tài khoản</Nav.Link>
            <Nav.Link onClick={(e) => dispatch(setPage(comopentShow.ALL_SUB_ACCOUNT))} >Tất cả tài khoản</Nav.Link>
            {/*<Nav.Link >Pricing</Nav.Link>*/}
          </Nav>
        </Container>
        <Nav>
          <NavDropdown drop="start" title={<FontAwesomeIcon icon={faAddressCard}/>} id="collapsible-nav-dropdown">
            <NavDropdown.Item  onClick={(e) => {
              localStorage.clear();
              dispatch(setPage(comopentShow.LOGIN))
            }}>
              <IoLogOut/> Thoát
            </NavDropdown.Item>
            <NavDropdown.Item onClick={(e) => dispatch(setPage(comopentShow.FORM_SETTING))}>
              <CiEdit /> Cài đặt
            </NavDropdown.Item>
            <NavDropdown.Item onClick={(e) =>fetchQr()}>
              <IoQrCodeSharp/> Mã qr 2 FA
            </NavDropdown.Item>


          </NavDropdown>
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;
