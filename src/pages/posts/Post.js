import React, { useState } from "react";
import { Card } from "react-bootstrap";
import css from "../../styles/css/Posts.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosInstance } from "../../axios/axiosDefaults";

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

  const [like, setLike] = useState(like_id);
  const [likeCount, setLikeCount] = useState(likes_count);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/likes/", { post: id });
      setLikeCount(likeCount + 1);
      setLike(data.id);
    } catch (error) {
      console.log("Error when liking", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await axiosInstance.delete(`likes/${like}`);
      setLikeCount(likeCount - 1);
      setLike(null);
    } catch (error) {
      console.log("Error when unliking", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={css.PostCard} key={id}>
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
            onClick={like ? handleUnlike : handleLike}
            className={`${like ? `fa-solid ${css.Liked}` : "fa-regular"}
              fa-heart me-1 ${css.Likes}`}
          ></i>
          {likeCount}
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
