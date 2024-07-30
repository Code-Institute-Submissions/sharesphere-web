import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { axiosRes } from "../../axios/axiosDefaults";
import formCSS from "../../styles/css/Forms.module.css";
import appCSS from "../../styles/css/App.module.css";
import css from "../../styles/css/Comments.module.css";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const CreateCommentForm = ({ post, setComments, setCommentCount }) => {
  const [commentData, setCommentData] = useState({
    post: post,
    content: "",
  });
  const [posting, setPosting] = useState(false);

  const [show, setShow] = useState(false);
  const target = useRef(null);

  const { loggedInUser } = useAuth();
  const { content } = commentData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content !== "" && !posting) {
      /**
       * Logic to avoid making post requests if the field is empty
       * and instead shows a tooltip overlay.
       */
      try {
        setPosting(true);
        const { data } = await axiosRes.post("/comments/", commentData);
        setComments((prevComments) => ({
          ...prevComments,
          results: [data, ...prevComments.results],
        }));
        setCommentCount((prevCount) => prevCount + 1);
        setCommentData({
          ...commentData,
          content: "",
        });
        setPosting(false);
      } catch (error) {
        setPosting(false);
      }
    } else if (content === "") {
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    }
  };

  return loggedInUser ? (
    <Form onSubmit={handleSubmit}>
      <FormGroup controlId="comment">
        <div className="d-flex mb-0 mt-2 ms-1">
          <FormLabel className="sr-only">Leave a comment</FormLabel>
          <Form.Control
            className={formCSS.FormInput}
            type="text"
            placeholder="Leave a comment!"
            ref={target}
            value={content}
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
            title="Post comment"
          >
            <i className="fa-regular fa-paper-plane"></i>
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
  ) : (
    <div className={css.LoggedOutField}>
      <span>
        Please{" "}
        <Link className={appCSS.SignInPrompt} to={"/signin/"}>
          sign in
        </Link>{" "}
        to leave a comment!
      </span>
    </div>
  );
};

export default CreateCommentForm;
