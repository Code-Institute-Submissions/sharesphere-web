import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import css from "../styles/css/NavBar.module.css";
import "../styles/css/NavBar.css";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";
import SignOut from "../pages/authentication/SignOut";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const { loggedInUser } = useAuth();
  // Use of the following credited to:
  // https://github.com/mr-fibonacci/moments/blob/bb6657e265fb18360b841e10d9d633dad06f4e5c/src/components/NavBar.js
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const loggedInNav = (
    <>
      <NavLink to={"/following"} className={css.NavLink}>
        Following
      </NavLink>
      <NavLink to={"/likes"} className={css.NavLink}>
        Likes
      </NavLink>
      <NavLink to={"/post/create"} className={css.NavLink}>
        Create post
      </NavLink>
      <NavLink to={`/conversations`} className={css.NavLink}>
        Conversations
      </NavLink>
      <NavLink
        to={`/profile/${loggedInUser?.pk}`}
        className={`${css.NavLink} d-lg-none`}
      >
        Your profile
      </NavLink>
      <div className={`${css.NavLink} d-lg-none`}>
        <SignOut />
      </div>
    </>
  );

  const loggedOutNav = (
    <>
      <NavLink to="/signin" className={css.NavLink}>
        Sign in
      </NavLink>
      <NavLink to="/signup" className={css.NavLink}>
        Sign up
      </NavLink>
    </>
  );

  return (
    <div>
      <Navbar
        expanded={expanded}
        expand="lg"
        className={css.NavBar}
        variant="dark"
      >
        <Container>
          <Link to="/" className={css.NavBarBrand}>
            ShareSphere
          </Link>
          <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto NavLinks">
              <NavLink to="/" className={css.NavLink}>
                Home
              </NavLink>
              {loggedInUser ? loggedInNav : loggedOutNav}
            </Nav>
            {loggedInUser && (
              <div className="d-lg-flex d-none">
                <Link to={`/profile/${loggedInUser.pk}`}>
                  <Avatar
                    src={loggedInUser.profile_image}
                    size={50}
                    alt="Your avatar"
                  />
                </Link>
                <SignOut />
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
