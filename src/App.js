import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import css from "./styles/css/App.module.css";
import NavBar from "./components/NavBar";
import SignUpForm from "./pages/authentication/SignUpForm.js";
import "./axios/axiosDefaults";
import SignInForm from "./pages/authentication/SignInForm.js";
import ProfilePage from "./pages/profiles/ProfilePage.js";
import EditProfileForm from "./pages/profiles/EditProfileForm.js";
import CreatePostForm from "./pages/posts/CreatePostForm.js";
import RenderPosts from "./pages/posts/RenderPosts.js";
import { useAuth } from "./context/AuthContext.js";
import PostPage from "./pages/posts/PostPage.js";
import Conversations from "./pages/conversations/Conversations.js";
import ConversationPage from "./pages/conversations/ConversationPage.js";
import Alert from "react-bootstrap/Alert";

function App() {
  const { loggedInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState();

  useEffect(() => {
    /**
     * useEffect hook that checks if a state has been passed to
     * the location upon navigation.
     * If it has then update the successMessage state to contain
     * that state so that an alert is displayed notifying the user
     * of, an otherwise unclear, successful CRUD action.
     *
     * Clears the success message from the location state after
     * the successMessage state has been set to avoid it repeating
     * after refreshing the page.
     */
    if (location.state?.success) {
      setSuccessMessage(location.state.success);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    /**
     * useEffect hook to handle auto closing a success alert
     * if the successMessage gets set.
     *
     * Cleanup function to remove the timer if the component
     * unmounts before the timer is done.
     * This would happen if the user navigates to a different page
     * before the timer is finished in which case the useEffect hook
     * above gets called again which will restart the timer.
     */
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className={css.App}>
      <NavBar />
      <div>
        {successMessage && (
          <Alert className={css.SuccessAlert} variant="success">
            {successMessage}
          </Alert>
        )}
        {/* Rest of your conversations page content */}
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <RenderPosts
              filter={"/posts"}
              heading={"ShareSphere Feed"}
            />
          }
        />
        <Route
          path="/following"
          element={
            <RenderPosts
              filter={`/posts/?owner__followed__owner__profile=${loggedInUser?.pk}`}
              heading={"Personal Feed"}
            />
          }
        />
        <Route
          path="/likes"
          element={
            <RenderPosts
              filter={`/posts/?likes__owner__profile=${loggedInUser?.pk}`}
              heading={"Your Likes"}
            />
          }
        />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/conversation/:id" element={<ConversationPage />} />
        <Route path="/profile/edit" element={<EditProfileForm />} />
        <Route path="/post/create" element={<CreatePostForm />} />
        <Route path="*" element={<p>Nothing on this page, 404</p>} />
      </Routes>
    </div>
  );
}

export default App;
