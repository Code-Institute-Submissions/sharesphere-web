import React from "react";
import { Card } from "react-bootstrap";
import css from "../../styles/css/Posts.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Post = (props) => {
  const {
    title,
    content,
    image,
    id,
    owner,
    is_owner,
    profile_id,
    profile_image,
    likes_count,
    like_id,
    comments_count,
    updated_at,
  } = props;

  return (
    <Card className={css.PostCard} key={id}>
      {console.log(props)}
      <Card.Img className={css.PostImg} variant="top" src={image} alt={title} />
      <Link className={css.OwnerLink} to={`/profile/${profile_id}`}>
        <Avatar src={profile_image} size={30} alt="Post owner" />
        <div className="ms-1">
          <span>{owner}</span>
        </div>
        <div className={css.PostTime}>
          <span className="ms-1 me-1">·</span>
          <span>{updated_at}</span>
        </div>
      </Link>
      <hr className={css.ContentSeparator} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
      <div className={css.PostStats}>
        <span>
          <i
            className={`${like_id ? `fa-solid ${css.Liked}` : "fa-regular"}
              fa-heart me-1 ${css.Likes}`}
          ></i>
          {likes_count}
        </span>
        <span>
          <i className={`fa-regular fa-comments me-1 ${css.Comments}`}></i>
          {comments_count}
        </span>
      </div>
    </Card>
  );
};

export default Post;
