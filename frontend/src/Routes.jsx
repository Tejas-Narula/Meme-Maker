import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import UserMemes from "./pages/UserMemes";
import Memes from "./pages/Memes";
// import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/user-memes" element={<UserMemes />} />
      <Route path="/memes" element={<Memes />} />
    </Routes>
  );
}

export default App;
