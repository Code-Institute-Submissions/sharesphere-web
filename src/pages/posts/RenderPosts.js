import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosDefaults";
import { Col, Container, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { FetchNext } from "../../utils/FetchNext";
import Loader from "../../components/Loader";
import css from "../../styles/css/Posts.module.css";
import Post from "./Post";
import PopularProfiles from "../profiles/PopularProfiles";

const RenderPosts = (props) => {
  const [posts, setPosts] = useState({
    results: [],
    next: true,
  });
  const [hasLoaded, setHasLoaded] = useState(false);

  const { filter } = props;
  const { results, next } = posts;

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

  useEffect(() => {
    setHasLoaded(false);
    fetchPosts();
  }, [filter]);

  return (
    <Container className="text-center">
      <Row>
        <Col lg={2}></Col>
        <Col lg={8} className="mx-auto">
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
        </Col>
        <Col lg={2}>
          <PopularProfiles />
        </Col>
      </Row>
    </Container>
  );
};

export default RenderPosts;
