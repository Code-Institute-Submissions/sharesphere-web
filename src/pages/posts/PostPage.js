import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosDefaults";
import { Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { FetchNext } from "../../utils/FetchNext";
import Loader from "../../components/Loader";
import css from "../../styles/css/Posts.module.css";
import Post from "./Post";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState()
  const [hasLoaded, setHasLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setHasLoaded(false);
    const fetchPost = async () => {
      try {
        const [{data: post}, {data: comments}] = await Promise.all([
          axiosInstance.get(`/posts/${id}`),
          axiosInstance.get(`/comments/?post=${id}`)
        ]);
        setPost(post);
        setComments(comments)
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [id]);

  return (
    <Container className={css.PostsWrapper}>
      {console.log(comments)}
      {hasLoaded ? <Post {...post} comments={{...comments.results}} /> : <Loader center />}
    </Container>
  );
};
export default PostPage;
