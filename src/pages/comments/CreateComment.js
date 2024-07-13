import React, { useState } from "react";
import { Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import { axiosInstance } from "../../axios/axiosDefaults";

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
      <FormGroup controlId="comment">
        <FormLabel>
          <Form.Control
            className=""
            type="text"
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
      </FormGroup>
      <Button type="submit" variant="success">
        Comment!
      </Button>
    </Form>
  );
};

export default CreateComment;
