import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosDefaults";
import { Container } from "react-bootstrap";
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
  const [popularProfiles, setPopularProfiles] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);

  const { filter } = props;
  const { results, next } = posts;

  // /profiles/?ordering=-post_count
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

  const fetchProfiles = async () => {
    try {
      const { data } = await axiosInstance.get(`/profiles/?ordering=-post_count`);
      setPopularProfiles(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setHasLoaded(false);
    fetchPosts();
  }, [filter]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <Container className="text-center">
      {console.log(popularProfiles)}
      {hasLoaded ? (
        <InfiniteScroll
          className={css.PostsWrapper}
          style={{ overflow: "hidden" }}
          dataLength={results.length}
          next={() => FetchNext(posts, setPosts)}
          hasMore={!!next}
          loader={
            <div className="mb-2">
              <Loader />
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>No more posts to display!</b>
            </p>
          }
        >
          {results.map((post) => {
            return (
              <Post key={post.id} post={{ ...post }} setPosts={setPosts} />
            );
          })}
        </InfiniteScroll>
      ) : (
        <Loader center />
      )}
    </Container>
  );
};

export default RenderPosts;
