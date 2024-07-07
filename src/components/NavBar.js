import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import css from "../styles/css/NavBar.module.css"
import "../styles/css/NavBar.css"

const NavBar = () => {
  return (
    <div>
      <Navbar expand="lg" className={css.NavBar}>
        <Container>
          <Link to="/" className={css.NavBarBrand}>
            ShareSphere
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto NavLinks">
              <NavLink to="/" className={css.NavLink}>
                Home
              </NavLink>
              <NavLink to="/signin" className={css.NavLink}>
                Sign in
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
