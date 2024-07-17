import React, { useEffect, useState } from "react";
import { axiosReq } from "../../axios/axiosDefaults";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import InfiniteScroll from "react-infinite-scroll-component";
import { FetchNext } from "../../utils/Utils";
import Loader from "../../components/Loader";
import css from "../../styles/css/Posts.module.css";
import Post from "./Post";
import PopularProfiles from "../profiles/PopularProfiles";

const RenderPosts = ({filter, heading}) => {
  const [posts, setPosts] = useState({
    results: [],
    next: true,
  });
  const [hasLoaded, setHasLoaded] = useState(false);

  const { results, next } = posts;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setHasLoaded(false);
        const { data } = await axiosReq.get(`${filter}`);
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
      <Row>
        <Col lg={3}></Col>
        <Col lg={6} className="mx-auto">
      <h1>{heading}</h1>
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
        <Col lg={3}>
          <PopularProfiles />
        </Col>
      </Row>
    </Container>
  );
};

export default RenderPosts;
