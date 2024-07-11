import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosDefaults";
import { Container } from "react-bootstrap";

const RenderPosts = (props) => {
  const [posts, setPosts] = useState({
    results: []
  });

  const { filter } = props;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log(filter);
        const data = await axiosInstance.get(filter);
        console.log(data.data.results);
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: data.data.results,
        }));
      } catch (error) {
        console.log(error)
      }
    };
    fetchPosts();
  }, [filter]);

  return (
    <Container>
      {posts.results.map((post) => {
        return <p>{post.id}</p>
      })}
    </Container>
  )
};

export default RenderPosts;
