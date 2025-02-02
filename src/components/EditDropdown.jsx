import React from "react";
import css from "../styles/css/EditDropdown.module.css";
import Dropdown from "react-bootstrap/Dropdown";

// https://github.com/mr-fibonacci/moments/blob/bb6657e265fb18360b841e10d9d633dad06f4e5c/src/components/MoreDropdown.js#L8-L17
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className={`fas fa-ellipsis ${css.ToggleIcon}`}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

ThreeDots.displayName = "ThreeDots";

export const EditDropdown = ({ confirmDelete, toggleEdit }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={ThreeDots}></Dropdown.Toggle>
      <Dropdown.Menu className={css.Menu}>
        {toggleEdit && (
          <Dropdown.Item aria-label="edit" onClick={toggleEdit}>
            Edit
          </Dropdown.Item>
        )}
        {confirmDelete && (
          <Dropdown.Item aria-label="delete" onClick={confirmDelete}>
            Delete
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
