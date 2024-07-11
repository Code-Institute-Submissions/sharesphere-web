import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosDefaults";
import { Container, Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { FetchNext } from "../../utils/FetchNext";
import Loader from "../../components/Loader";

const RenderPosts = (props) => {
  const [posts, setPosts] = useState({
    results: [],
    next: true,
  });
  const [hasLoaded, setHasLoaded] = useState(false);

  const { filter } = props;
  const { results, next } = posts;

  useEffect(() => {
    setHasLoaded(false)
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
          dataLength={results.length} //This is important field to render the next data
          next={() => FetchNext(posts, setPosts)}
          hasMore={!!next}
          loader={<Spinner animation="border" variant="secondary" />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You've reched the end!</b>
            </p>
          }
        >
          {console.log(!!next)}
          {results.map((post) => {
            return <p className="mb-4">{post.id}</p>;
          })}
        </InfiniteScroll>
      ) : (
        <Loader center />
      )}
    </Container>
  );
};

export default RenderPosts;
