import { axiosRes } from "../axios/axiosDefaults";

export const followHelper = async (id) => {
  /**
   * Simple helper function to call when handling follows
   *
   * Throws error to avoid carrying on with try logic if
   * the request fails. Like when spamming the follow button.
   */
  try {
    const { data } = await axiosRes.post(`followers/`, { followed: id });
    return data;
  } catch (error) {
    console.log("error when following user", error);
    throw error;
  }
};

export const unfollowHelper = async (id) => {
  /**
   * Simple helper function to call when handling unfollows.
   *
   * Throws error to avoid carrying on with try logic if
   * the request fails. Like when spamming the unfollow button.
   */
  try {
    await axiosRes.delete(`followers/${id}`);
  } catch (error) {
    console.log("error when unfollowing user", error);
    throw error;
  }
};
