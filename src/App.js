import { Route, Routes } from "react-router-dom";
import css from "./styles/css/App.module.css";
import NavBar from "./components/NavBar";
import SignUp from "./pages/authentication/SignUp.js";
import "./axios/axiosDefaults";
import SignIn from "./pages/authentication/SignIn.js";
import ProfilePage from "./pages/profiles/ProfilePage.js";
import EditProfile from "./pages/profiles/EditProfile.js";
import CreatePost from "./pages/posts/CreatePost.js";
import RenderPosts from "./pages/posts/RenderPosts.js";
import { useAuth } from "./context/AuthContext.js";
import PostPage from "./pages/posts/PostPage.js";
import Conversations from "./pages/conversations/Conversations.js";

function App() {
  const { loggedInUser } = useAuth();

  return (
    <div className={css.App}>
      <NavBar />
      <Routes>
        <Route path="/" element={<RenderPosts filter={"/posts"} />} />
        <Route
          path="/following"
          element={
            <RenderPosts
              filter={`/posts/?owner__followed__owner__profile=${loggedInUser?.pk}`}
            />
          }
        />
        <Route
          path="/likes"
          element={
            <RenderPosts
              filter={`/posts/?likes__owner__profile=${loggedInUser?.pk}`}
            />
          }
        />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="*" element={<p>Nothing on this page, 404</p>} />
      </Routes>
    </div>
  );
}

export default App;
