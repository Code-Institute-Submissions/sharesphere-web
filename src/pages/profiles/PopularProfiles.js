import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosDefaults";

const PopularProfiles = () => {
  const [popularProfiles, setPopularProfiles] = useState({});

  const fetchProfiles = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/profiles/?ordering=-post_count`
      );
      setPopularProfiles(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return <div>PopularProfiles</div>;
};

export default PopularProfiles;
