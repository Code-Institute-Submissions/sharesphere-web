import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.js";
import "./axios/axiosDefaults";
import Alert from "react-bootstrap/Alert";
import css from "./styles/css/App.module.css";
import NavBar from "./components/NavBar";
import SignUpForm from "./pages/authentication/SignUpForm.js";
import SignInForm from "./pages/authentication/SignInForm.js";
import ProfilePage from "./pages/profiles/ProfilePage.js";
import EditProfileForm from "./pages/profiles/EditProfileForm.js";
import CreatePostForm from "./pages/posts/CreatePostForm.js";
import RenderPosts from "./pages/posts/RenderPosts.js";
import PostPage from "./pages/posts/PostPage.js";
import Conversations from "./pages/conversations/Conversations.js";
import ConversationPage from "./pages/conversations/ConversationPage.js";
import { SignInRequired } from "./utils/SignInRequired.js";
import NotFound from "./pages/notfound/NotFound.js";

function App() {
  const [successMessage, setSuccessMessage] = useState();
  const [warningMessage, setWarningMessage] = useState();
  const { loggedInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * useEffect hook that checks if a state has been passed to
     * the location upon navigation.
     * If it has then update the the relevant message state to contain
     * that state so that an alert is displayed notifying the user
     * of, an otherwise unclear, successful CRUD action, or unauthorized
     * request.
     *
     * Clears the message from the location state after
     * the relevant states have been set to avoid it repeating
     * after refreshing the page.
     */
    if (location.state?.success) {
      setSuccessMessage(location.state.success);
      navigate(location.pathname, { replace: true, state: {} });
    }

    if (location.state?.warning) {
      setWarningMessage(location.state.warning);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    /**
     * useEffect hook to handle auto closing a success
     * or warning alert if a message gets set.
     *
     * Cleanup function to remove the timer if the component
     * unmounts before the timer is done.
     * This would happen if the user navigates to a different page
     * before the timer is finished in which case the useEffect hook
     * above gets called again which will restart the timer.
     */
    const clearMessage = (setMessage) => {
      const timer = setTimeout(() => {
        setMessage();
      }, 5000);

      return () => clearTimeout(timer);
    };

    if (successMessage) {
      clearMessage(setSuccessMessage);
    }

    if (warningMessage) {
      clearMessage(setWarningMessage);
    }
  }, [successMessage, warningMessage]);

  return (
    <div className={css.App}>
      <NavBar />
      {/* Alerts for displaying location state succes and warning messages */}
      <div>
        {successMessage && (
          <Alert className={css.Alert} variant="success">
            {successMessage}
          </Alert>
        )}
        {warningMessage && (
          <Alert className={css.Alert} variant="danger">
            {warningMessage}
          </Alert>
        )}
      </div>
      {/*Routing and unauthenticated redirecting for relevant URLs */}
      <Routes>
        <Route
          path="/"
          element={
            <RenderPosts filter={"/posts"} heading={"ShareSphere Feed"} />
          }
        />
        <Route
          path="/following"
          element={
            loggedInUser ? (
              <RenderPosts
                filter={`/posts/?owner__followed__owner__profile=${loggedInUser?.pk}`}
                heading={"Personal Feed"}
              />
            ) : (
              <SignInRequired />
            )
          }
        />
        <Route
          path="/likes"
          element={
            loggedInUser ? (
              <RenderPosts
                filter={`/posts/?likes__owner__profile=${loggedInUser?.pk}`}
                heading={"Your Likes"}
              />
            ) : (
              <SignInRequired />
            )
          }
        />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route
          path="/conversations"
          element={loggedInUser ? <Conversations /> : <SignInRequired />}
        />
        <Route
          path="/conversation/:id"
          element={loggedInUser ? <ConversationPage /> : <SignInRequired />}
        />
        <Route
          path="/profile/edit"
          element={loggedInUser ? <EditProfileForm /> : <SignInRequired />}
        />
        <Route
          path="/post/create"
          element={loggedInUser ? <CreatePostForm /> : <SignInRequired />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
