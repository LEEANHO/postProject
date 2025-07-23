import { useSelector, useDispatch } from "react-redux";
import { logout } from "./app/userSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { username, isLoggedIn } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    alert("로그아웃 되었습니다");
  };

  return (
    <div>
      <h2>홈페이지</h2>
      {isLoggedIn ? (
        <>
          <h2>{username}님 어서오세요</h2>
          <div>
            <Link to="/Post">게시판</Link>
          </div>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <>
          <div>
            <Link to="/user/creat">회원가입</Link>
          </div>
          <div>
            <Link to="/user/join">로그인</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
