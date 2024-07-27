import React, { useEffect, useState } from "react";
import { axiosReq } from "../../axios/axiosDefaults";
import Container from "react-bootstrap/Container";
import Loader from "../../components/Loader";
import css from "../../styles/css/Posts.module.css";
import Post from "./Post";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState();
  const [hasLoaded, setHasLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setHasLoaded(false);
    const fetchPost = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost(post);
        setComments(comments);
        setHasLoaded(true);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchPost();
  }, [id]);

  return (
    <Container className={css.PostsWrapper}>
      {hasLoaded ? (
        <Post
          post={{ ...post }}
          comments={comments}
          setComments={setComments}
        />
      ) : (
        <Loader center />
      )}
    </Container>
  );
};
export default PostPage;
