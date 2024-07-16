import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosDefaults";
import { Card, Col, Container, Row } from "react-bootstrap";
import Loader from "../../components/Loader";
import css from "../../styles/css/Conversations.module.css";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";

const Conversations = () => {
  const [conversationsList, setConversationsList] = useState({});
  const [hasLoaded, setHadLoaded] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      setHadLoaded(false);
      try {
        const { data } = await axiosInstance.get(`/messages/`);
        setConversationsList(data);
        setHadLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversations();
  }, []);

  return (
    <Container>
      <Row>
        <div className="text-center">
          <h1>Your conversations</h1>
        </div>
        {hasLoaded ? (
          <>
            {conversationsList.results.map((conv) => (
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
                        {!conv.is_owner ? "From @" + conv.owner : "To @" + conv.receiver_name}
                      </span>
                      <span className="ms-1 opacity-75">{conv.created_at}</span>
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
            ))}
          </>
        ) : (
          <Loader center />
        )}

        {console.log(conversationsList)}
      </Row>
    </Container>
  );
};

export default Conversations;
