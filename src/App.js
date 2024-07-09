import { Route, Routes } from "react-router-dom";
import css from "./styles/css/App.module.css";
import NavBar from "./components/NavBar";
import SignUp from "./pages/authentication/SignUp.js"
import "./axios/axiosDefaults";
import SignIn from "./pages/authentication/SignIn.js";
import ProfilePage from "./pages/profiles/ProfilePage.js";


function App() {
  return (
    <div className={css.App}>
      <NavBar />
      <Routes>
        <Route path="/" element={<p>ShareSphere home</p>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/profile/:id/message" element={<p>send message to user</p>} />
        <Route path="/profile/edit" element={<p>edit</p>} />
        <Route path="*" element={<p>Nothing on this page, 404</p>} />
      </Routes>
    </div>
  );
}

export default App;
