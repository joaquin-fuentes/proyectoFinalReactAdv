import React from "react";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import Sidebar from "./Sidebar";

const NavBarSmall = ({ show, handleClose, handleShow }) => {
  return (
    <Navbar bg="light" expand="lg" className="d-lg-none">
      <Container fluid>
        <Navbar.Brand href="#">Menu</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
        <Navbar.Offcanvas
          show={show}
          onHide={handleClose}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Sidebar handleClose={handleClose} />
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBarSmall;
