import React, { useEffect, useRef } from "react";
import { Form, FormGroup, FormLabel } from "react-bootstrap";
import formCSS from "../../styles/css/Forms.module.css";

const EditComment = ({ commentData, setCommentData, handleEdit }) => {
  const target = useRef(null);

  useEffect(() => {
    // Focus the form input field automatically
    target.current.focus();
  }, []);

  return (
    <Form onSubmit={handleEdit}>
      <FormGroup controlId="comment" className="d-flex">
        <FormLabel className="flex-grow-1 mb-0 mt-2 ms-1">
          <Form.Control
            ref={target}
            className={formCSS.FormInput}
            type="text"
            placeholder="Leave a comment!"
            value={commentData.content}
            onChange={(e) => {
              setCommentData({
                ...commentData,
                content: e.target.value,
              });
            }}
          ></Form.Control>
        </FormLabel>
        <button
          className={formCSS.SubmitIconBtn}
          type="submit"
          title="Edit comment"
        >
          <i className="fa-solid fa-pencil"></i>
        </button>
      </FormGroup>
    </Form>
  );
};

export default EditComment;
