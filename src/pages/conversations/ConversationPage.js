import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosDefaults";
const ConversationPage = () => {
  const [hasLoaded, setHadLoaded] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchConversation = async () => {
      setHadLoaded(false);
      try {
        const [{ data: conversation }, { data: replies }] = await Promise.all([
          axiosInstance.get(`/messages/${id}`),
          axiosInstance.get(`/replies/?message=${id}`),
        ]);
        console.log("conv", conversation);
        console.log("replies", replies);
        setHadLoaded(true)
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversation()
  }, [id]);

  return <div>ConversationPage {id}</div>;
};

export default ConversationPage;
