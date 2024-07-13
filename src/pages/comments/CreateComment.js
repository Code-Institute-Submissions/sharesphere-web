import React, { useRef, useState } from "react";
import { Form, FormGroup, FormLabel, Overlay, Tooltip } from "react-bootstrap";
import { axiosInstance } from "../../axios/axiosDefaults";
import formCSS from "../../styles/css/Forms.module.css";

const CreateComment = (props) => {
  const { post, setComments, setCommentCount } = props;

  const [commentData, setCommentData] = useState({
    post: post,
    content: "",
  });
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const { content } = commentData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content != "") {
      /**
       * Logic to avoid making post requests if the field is empty
       * and instead shows a tooltip overlay.
       */
      try {
        const { data } = await axiosInstance.post("/comments/", commentData);
        setComments((prevComments) => ({
          ...prevComments,
          results: [data, ...prevComments.results],
        }));
        setCommentCount((prevCount) => prevCount + 1);
        setCommentData({
          ...commentData,
          content: "",
        });
      } catch (error) {
        console.log(error);
      }
    } else if (!show) {
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup controlId="comment" className="d-flex">
        <FormLabel className="flex-grow-1 mb-0 mt-2 ms-1" ref={target}>
          <Form.Control
            className={formCSS.FormInput}
            type="text"
            rows={2}
            placeholder="Leave a comment!"
            value={content}
            onChange={(e) => {
              setCommentData({
                ...commentData,
                content: e.target.value,
              });
            }}
          ></Form.Control>
        </FormLabel>
        <button className={formCSS.SubmitIconBtn} type="submit">
          <i className="fa-regular fa-paper-plane"></i>
        </button>
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

export default CreateComment;
