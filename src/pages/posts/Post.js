import React from "react";
import { Card } from "react-bootstrap";
import css from "../../styles/css/Posts.module.css";

const Post = (props) => {
  const { title, content, image, id } = props

  return (
    <Card className={css.PostCard} key={id}>
      <Card.Img className={css.PostImg} variant="top" src={image} alt={title} />
      <hr className={css.ContentSeparator} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
