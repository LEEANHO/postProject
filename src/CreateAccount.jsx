import { useState } from "react";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleId = (e) => {
    setName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginClick = async () => {
    try {
      const res = await fetch("http://localhost:5000/user/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: name,
          img: password,
        }),
      });
      if (!res.ok) throw new Error("登録失敗");
      await res.json();
      setName("");
      setPassword("");
      alert("登録しました");
    } catch (err) {
      console.error(err);
      alert("登録に失敗しました");
    }
  };

  return (
    <div>
      <div>会員登録</div>
      <div>
        <input value={name} onChange={handleId} />
      </div>
      <div>
        <input value={password} onChange={handlePassword} />
      </div>
      <div>
        <button onClick={loginClick}>登録</button>
      </div>
    </div>
  );
};

export default CreateAccount;
