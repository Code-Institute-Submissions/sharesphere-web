import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import formCSS from "../../styles/css/Forms.module.css";
import { axiosRes } from "../../axios/axiosDefaults";

const EditCommentForm = ({
  commentData,
  setCommentData,
  setEditToggled,
  id,
}) => {
  const [show, setShow] = useState(false);
  const [posting, setPosting] = useState(false);

  const target = useRef(null);

  useEffect(() => {
    // Focus the form input field automatically
    target.current.focus();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (commentData.content !== "" && !posting) {
      try {
        setPosting(true);
        await axiosRes.put(`/comments/${id}`, commentData);
        setCommentData({
          ...commentData,
          updated_at: "now",
        });
        setEditToggled(false);
        setPosting(false);
      } catch (error) {
        setPosting(false);
        // console.log("Error when updating comment:", error);
      }
    } else if (commentData.content === "") {
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    }
  };

  return (
    <Form onSubmit={handleEdit}>
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
      <Overlay target={target.current} show={show} placement="top">
        {(props) => (
          <Tooltip {...props}>
            <div>Please write a comment first!</div>
          </Tooltip>
        )}
      </Overlay>
    </Form>
  );
};

export default EditCommentForm;
