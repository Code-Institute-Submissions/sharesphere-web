import React, { useEffect, useState } from "react";
import { axiosRes } from "../../axios/axiosDefaults";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Loader from "../../components/Loader";
import css from "../../styles/css/Conversations.module.css";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { FetchNext } from "../../utils/Utils";

const Conversations = () => {
  const [conversations, setConversations] = useState({});
  const [hasLoaded, setHadLoaded] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      setHadLoaded(false);
      try {
        const { data } = await axiosRes.get(`/messages/`);
        setConversations(data);
        setHadLoaded(true);
      } catch (error) {
        return;
      }
    };
    fetchConversations();
  }, []);

  return (
    <Container>
      <div className="text-center">
        <h1>Your conversations</h1>
      </div>
      {hasLoaded ? (
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={conversations.results.length}
          next={() => FetchNext(conversations, setConversations)}
          hasMore={!!conversations.next}
          loader={
            <div className="d-flex mb-2 justify-content-center">
              <Loader />
            </div>
          }
        >
          <Row>
            {conversations.results.length > 0 ? (
              conversations.results.map((conv) => (
                <Col md={6} xl={4} key={conv.id}>
                  <Card className={`${css.ConvCard}`}>
                    <Card.Body className={css.ConvBody}>
                      <div className="d-flex">
                        <Link
                          to={`/profile/${
                            !conv.is_owner ? conv.owner_id : conv.receiver
                          }`}
                          aria-label={`${
                            !conv.is_owner ? conv.owner : conv.receiver_name
                          }'s profile`}
                        >
                          <Avatar
                            src={
                              !conv.is_owner
                                ? conv.owner_image
                                : conv.receiver_image
                            }
                            size={40}
                            alt={`${
                              !conv.is_owner ? conv.owner : conv.receiver_name
                            }'s avatar`}
                          />
                        </Link>

                        <h2 className="ms-2 card-title h5">{conv.topic}</h2>
                      </div>
                      <div className={css.ConvInfo}>
                        <span>
                          {!conv.is_owner
                            ? "From @" + conv.owner
                            : "To @" + conv.receiver_name}
                        </span>
                        <span className="ms-1 opacity-75">
                          {conv.created_at}
                        </span>
                      </div>
                      <hr className={css.ConvSeparator} />
                      <Link
                        className={css.ConvLink}
                        to={`/conversation/${conv.id}`}
                        aria-label={`go to ${conv.topic} conversation`}
                      >
                        <Card.Text className={css.ConvContent}>
                          {conv.content}
                        </Card.Text>
                        <div className={css.ConvReplies}>
                          <i className="fa-solid fa-comments me-1"></i>
                          <span>
                            {conv.replies_count}
                            <span className="sr-only">replies</span>
                          </span>
                        </div>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div className="mt-4 text-center">
                <h2>You are not part of any conversations yet</h2>
                <p>
                  You can start with another user by visitng their profile and
                  tapping the message/envelope icon!
                </p>
              </div>
            )}
            {/* Maps over every conversation retrieved once the api fetch is complete */}
          </Row>
        </InfiniteScroll>
      ) : (
        <Loader center />
      )}
    </Container>
  );
};

export default Conversations;
