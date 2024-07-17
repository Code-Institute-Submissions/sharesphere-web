import React from "react";
import { Link } from "react-router-dom";
import appCSS from "../../styles/css/App.module.css";
import css from "../../styles/css/NotFound.module.css";

const NotFound = () => {
  return (
    <div className={css.Wrapper}>
      <h1>This page does not exist</h1>
      <Link className={`${appCSS.Link} btn btn-primary`} to={".."}>
        <i className="fa-solid fa-caret-left"></i> Go back
      </Link>
    </div>
  );
};

export default NotFound;
