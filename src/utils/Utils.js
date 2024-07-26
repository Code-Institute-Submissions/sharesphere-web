import { jwtDecode } from "jwt-decode";
import { axiosRes } from "../axios/axiosDefaults";
import { axiosReq } from "../axios/axiosDefaults";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const FetchNext = async (state, setState) => {
  try {
    const { data } = await axiosReq.get(state.next);
    setState((prevState) => ({
      ...prevState,
      results: [...prevState.results, ...data.results],
      next: data.next,
    }));
    return state;
  } catch (error) {
    console.log("Error when fetching more data:", error);
    return "Something went wrong when loading more data";
  }
};

export const signIn = async (signInData, setLoggedInUser) => {
  const { data } = await axios.post("/dj-rest-auth/login/", signInData);
  setLoggedInUser(data.user);
  localStorage.setItem("loggedInUser", JSON.stringify(data.user));
  setTokenTimestamp(data);
};

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

export const SignInRequired = () => {
  /**
   * Component that can be conditionally used if userLoggedIn context is
   * false when the user attempts to access a page a logged out user can't
   * use.
   * The user will just be redirected with a warning message letting them
   * know that they need to sign in to access that page.
   */
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/signin", {
      state: { warning: "You must be logged in to access that page" },
    });
  }, [navigate]);
};

export const AlreadySignedIn = () => {
  /**
   * Component that can be conditionally used if userLoggedIn context is
   * false when the user attempts to access a page a logged out user can't
   * use.
   * The user will just be redirected with a warning message letting them
   * know that they need to sign in to access that page.
   */
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", {
      state: { success: "You are already signed in" },
    });
  }, [navigate]);
};

// Source:
// https://github.com/mr-fibonacci/moments/blob/bb6657e265fb18360b841e10d9d633dad06f4e5c/src/utils/utils.js#L55C1-L66C3
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh).exp;
  console.log("token refresh:", refreshTokenTimestamp);
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
