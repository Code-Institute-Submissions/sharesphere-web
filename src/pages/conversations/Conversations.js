import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosDefaults";
import { Card, Col, Container, Row } from "react-bootstrap";
import Loader from "../../components/Loader";
import css from "../../styles/css/Conversations.module.css";
import Avatar from "../../components/Avatar";

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
              <Col md={6} xl={4}>
                <Card className={`${css.ConvCard}`}>
                  <Card.Body>
                    <div className="d-flex">
                      <Avatar
                        src={conv.is_owner ? conv.owner_image : conv.receiver_image}
                        size={40}
                        alt={`${conv.owner}'s avatar`}
                      />
                      <Card.Title className="ms-2">{conv.topic}</Card.Title>
                    </div>
                    <hr />
                    <Card.Text>{conv.content}</Card.Text>
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
