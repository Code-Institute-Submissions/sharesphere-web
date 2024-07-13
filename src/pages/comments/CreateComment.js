import React, { useState } from "react";
import { Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import { axiosInstance } from "../../axios/axiosDefaults";
import formCSS from "../../styles/css/Forms.module.css";

const CreateComment = (props) => {
  const { post, setComments, setCommentCount } = props;

  const [commentData, setCommentData] = useState({
    post: post,
    content: "",
  });
  const { content } = commentData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/comments/", commentData);
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setCommentCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup controlId="comment" className="d-flex">
        <FormLabel className="flex-grow-1 mb-0 mt-2 ms-1">
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
    </Form>
  );
};

export default CreateComment;
