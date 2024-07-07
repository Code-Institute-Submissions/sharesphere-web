import { Route, Routes } from "react-router-dom";
import css from "./styles/css/App.module.css";
import NavBar from "./components/NavBar";


function App() {
  return (
    <div className={css.App}>
      <NavBar />
      <Routes>
        <Route path="/" element={<p>ShareSphere home</p>} />
        <Route path="/signin" element={<p>ShareSphere sign in</p>} />
      </Routes>
    </div>
  );
}

export default App;
