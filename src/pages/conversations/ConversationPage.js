import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosDefaults";
import CreateReplyForm from "../replies/CreateReplyForm";
const ConversationPage = () => {
  const [hasLoaded, setHadLoaded] = useState(false);
  const [modalShow, setModalShow] = useState(false)
  const [conversation, setConversation] = useState({})
  const [replies, setReplies] = useState({})

  const { id } = useParams();

  useEffect(() => {
    const fetchConversation = async () => {
      setHadLoaded(false);
      try {
        const [{ data: conversation }, { data: replies }] = await Promise.all([
          axiosInstance.get(`/messages/${id}`),
          axiosInstance.get(`/replies/?message=${id}`),
        ]);
        setConversation(conversation)
        console.log("conv", conversation);
        console.log("replies", replies);
        setHadLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversation();
  }, [id]);

  return (
    <div>
      <button onClick={() => setModalShow(true)} type="button">
        Reply
      </button>
      <CreateReplyForm id={id} topic={conversation.topic} show={modalShow} onHide={() => setModalShow(false)} />
      {id}
    </div>
  );
};

export default ConversationPage;
