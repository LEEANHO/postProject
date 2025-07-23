import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./app/userSlice";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [dbPass, setDbPass] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleId = (e) => setId(e.target.value);
  const handlePass = (e) => setPass(e.target.value);

  const joinClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/" + id);
      const res = await response.text();
      setDbPass(res);

      if (res === pass) {
        dispatch(login(id));
        alert("로그인 성공");
        navigate("/");
      } else {
        alert("비밀번호가 틀렸습니다");
      }
    } catch (err) {
      console.error("요청 실패:", err);
    }
  };

  return (
    <div>
      <div>
        ID
        <input onChange={handleId} />
      </div>
      <div>
        pass
        <input onChange={handlePass} />
      </div>
      <button onClick={joinClick}>로그인</button>
    </div>
  );
};

export default Join;
