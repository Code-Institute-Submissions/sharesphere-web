import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import css from "../styles/css/NavBar.module.css"
import "../styles/css/NavBar.css"
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { loggedInUser } = useAuth();

  return (
    <div>
      <Navbar expand="lg" className={css.NavBar} variant="dark"> 
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
              <NavLink to="/signup" className={css.NavLink}>
                Sign up
              </NavLink>
            {loggedInUser ? (<p>You are authenticated, { loggedInUser.username }</p>) : (
              <p>You are not authenticated</p>
            )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
