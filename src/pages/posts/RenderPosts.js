import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosDefaults";
import { Container, Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { FetchNext } from "../../utils/FetchNext";
import Loader from "../../components/Loader";
import css from "../../styles/css/Posts.module.css";
import Post from "./Post";

const RenderPosts = (props) => {
  const [posts, setPosts] = useState({
    results: [],
    next: true,
  });
  const [hasLoaded, setHasLoaded] = useState(false);

  const { filter } = props;
  const { results, next } = posts;

  useEffect(() => {
    setHasLoaded(false);
    const fetchPosts = async () => {
      try {
        const { data } = await axiosInstance.get(`${filter}`);
        setPosts({
          results: data.results,
          next: data.next,
        });
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [filter]);

  return (
    <Container className="text-center">
      {hasLoaded ? (
        <InfiniteScroll
          className={css.PostsWrapper}
          dataLength={results.length}
          next={() => FetchNext(posts, setPosts)}
          hasMore={!!next}
          loader={<Spinner animation="border" variant="secondary" />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>No more posts to display!</b>
            </p>
          }
        >
          {results.map((post) => {
            return <Post key={post.id} {...post} />;
          })}
        </InfiniteScroll>
      ) : (
        <Loader center />
      )}
    </Container>
  );
};

export default RenderPosts;
