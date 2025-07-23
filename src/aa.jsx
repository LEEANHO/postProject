import { useState, useEffect, useRef } from "react";

const SelectFruit2 = () => {
  const [fruit, setFruit] = useState("");
  const [fruits, setFruits] = useState([]);
  const searchKeyRef = useRef("");
  const engNameRef = useRef("");
  const imgRef = useRef("");

  const handleSearchClicked = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/fruit/" + searchKeyRef.current.value
      );
      if (!res.ok) throw new Error("検索失敗");
      const data = await res.text(); // 문자열일 경우
      setFruit(data);
    } catch (err) {
      console.error(err);
      setFruit("エラーが発生しました");
    }
  };

  const handleRegClicked = async () => {
    try {
      const res = await fetch("http://localhost:5000/fruit/reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: engNameRef.current.value,
          img: imgRef.current.value,
        }),
      });
      if (!res.ok) throw new Error("登録失敗");
      const data = await res.json();
      setFruits(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelClicked = async (fruit_id) => {
    try {
      const res = await fetch("http://localhost:5000/fruits/del/" + fruit_id, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("削除失敗");
      const data = await res.json();
      setFruits(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchAllFruits = async () => {
      try {
        const res = await fetch("http://localhost:5000/fruits/all");
        if (!res.ok) throw new Error("取得失敗");
        const data = await res.json();
        setFruits(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllFruits();
  }, []);

  return (
    <div>
      <h2>Fruit List</h2>
      <table>
        <tbody>
          {fruits.map((f, i) => {
            return (
              <tr key={i}>
                <td>{f.fruit_id}</td>
                <td>{f.fruit_img}</td>
                <td>
                  <button onClick={() => handleDelClicked(f.fruit_id)}>
                    削除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
      <div>
        <h2>Fruit Regist</h2>
        <div>
          英文名：
          <input ref={engNameRef} />
        </div>
        <div>
          イメージ：
          <input ref={imgRef} />{" "}
          <button onClick={handleRegClicked}>登録</button>
        </div>
        <hr />
        <div>
          <h2>Fruit Search</h2>
          英文名：
          <input ref={searchKeyRef} />{" "}
          <button onClick={handleSearchClicked}>検索</button>
          <div>{fruit}</div>
        </div>
      </div>
    </div>
  );
};

export default SelectFruit2;
