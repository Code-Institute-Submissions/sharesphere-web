import React, { useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import formCSS from "../../styles/css/Forms.module.css";

const EditCommentForm = ({ commentData, setCommentData, handleEdit }) => {
  const target = useRef(null);

  useEffect(() => {
    // Focus the form input field automatically
    target.current.focus();
  }, []);

  return (
    <Form onSubmit={handleEdit}>
      {console.log(commentData)}
      <FormGroup controlId={`comment${commentData.id}`}>
        <div className="d-flex mb-0 mt-2 ms-1">
          <FormLabel className="sr-only">
            Edit comment {commentData.id}
          </FormLabel>
          <Form.Control
            ref={target}
            className={formCSS.FormInput}
            type="text"
            placeholder="Edit comment!"
            value={commentData.content}
            onChange={(e) => {
              setCommentData({
                ...commentData,
                content: e.target.value,
              });
            }}
          ></Form.Control>
          <button
            className={formCSS.SubmitIconBtn}
            type="submit"
            title="Edit comment"
          >
            <i className="fa-solid fa-pencil"></i>
          </button>
        </div>
      </FormGroup>
    </Form>
  );
};

export default EditCommentForm;
