import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FruitWorld from "./aa";
import CreateAccount from "./CreateAccount";
import Home from "./Home";
import Join from "./Join";
import Post from "./Post";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/creat" element={<CreateAccount />} />
        <Route path="/user/join" element={<Join />} />
        <Route path="/Post" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
