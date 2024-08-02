import React from "react";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { IoMenu } from "react-icons/io5";
import logo from "../assets/imagenes/logo-sge-circle.png";

const NavBarSmall = ({ show, handleClose, handleShow }) => {
  return (
    <Navbar bg="light" expand="lg" className="d-lg-none p-0">
      <Container fluid className="navBarMenu">
        <Navbar.Brand href="#" className="text-light">
          <img src={logo} alt="imagen logo" className="logoOfCanvas" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          onClick={handleShow}
          className="my-2"
        >
          <span className="text-light">
            <IoMenu />
          </span>
        </Navbar.Toggle>
        <Navbar.Offcanvas
          show={show}
          onHide={handleClose}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          className="navBarMenu "
        >
          <Offcanvas.Header
            closeButton
            className="text-light"
          ></Offcanvas.Header>
          <Offcanvas.Body className="offcanvas-body">
            <Sidebar
              handleClose={handleClose}
              className="sidebar-full-height"
            />
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBarSmall;
