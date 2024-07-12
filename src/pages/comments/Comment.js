import React from "react";
import postCSS from "../../styles/css/Posts.module.css";
import css from "../../styles/css/Comments.module.css";
import { Card } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";

const Comment = (props) => {
  const {
    content,
    id,
    is_owner,
    owner,
    post,
    profile_id,
    profile_image,
    updated_at,
    created_at,
  } = props;
  return (
    <Card className={css.CommentCard}>
      <Link className={postCSS.OwnerLink} to={`/profile/${profile_id}`}>
        <Avatar src={profile_image} size={25} alt="Comment owner" />
        <div className="ms-1">
          <span>{owner}</span>
        </div>
        <div className={postCSS.PostTime}>
          <span className="ms-1 me-1">·</span>
          <span>{created_at}</span>
        </div>
      </Link>
      <hr className={postCSS.ContentSeparator} />
      <Card.Body className={css.CommentBody}>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Comment;
