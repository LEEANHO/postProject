const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "1234",
  port: 5433,
});

pool.connect();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/fruit/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM public.fruit_world WHERE fruit_id = $1",
    [req.params.id]
  );
  res.send(result.rows[0].fruit_img);
});

app.get("/fruits/all", async (req, res) => {
  const result = await pool.query("SELECT * FROM public.fruit_world");
  res.send(result.rows);
});

app.post("/fruit/reg", async (req, res) => {
  const result = await pool.query(
    "INSERT INTO public.fruit_world VALUES ($1,$2)",
    [req.body.id, req.body.img]
  );
  if (result.rowCount === 1) {
    const result = await pool.query("SELECT * FROM public.fruit_world");
    res.send(result.rows);
  }
});

app.delete("/fruit/del/:id", async (req, res) => {
  const result = await pool.query(
    "DELETE FROM public.fruit_world WHERE fruit_id=$1",
    [req.params.id]
  );
  if (result.rowCount === 1) {
    const result = await pool.query("SELECT * FROM public.fruit_world");
    res.send(result.rows);
  }
});

//유저 로그인
app.get("/user/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM public.userInfo WHERE user_id = $1",
    [req.params.id]
  );
  res.send(result.rows[0].user_password);
});

//유저 회원 가입
app.post("/user/account", async (req, res) => {
  const result = await pool.query(
    "INSERT INTO public.userInfo VALUES ($1,$2)",
    [req.body.id, req.body.img]
  );
  if (result.rowCount === 1) {
    const result = await pool.query("SELECT * FROM public.userInfo");
    res.send(result.rows);
  }
});

//게시판에 작성할 내용 db에 저장 시키기
app.post("/post", async (req, res) => {
  const { title, content, user_id } = req.body;

  try {
    await pool.query(
      "INSERT INTO post (title, content, user_id) VALUES ($1, $2, $3)",
      [title, content, user_id]
    );
    res.status(200).json({ message: "Post inserted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// 게시판 정도 가저오기
app.get("/post", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT title, content, user_id FROM post ORDER BY post_id DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("🔥 게시글 목록 조회 오류:", err);
    res.status(500).json({ error: "DB error" });
  }
});
// const express = require("express");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// app.use(express.json());
// app.use(cors());

// app.get("/", (req, res) => {
//   res.json({ text: "Hello world" });
// });

// app.get("/apple", (req, res) => {
//   res.json({ text: "🍎" });
// });

// app.get("/banana", (req, res) => {
//   res.json({ text: "🍌" });
// });

// app.get("/watermelon", (req, res) => {
//   res.json({ text: "🍉" });
// });

// app.get("/animal", (req, res) => {
//   res.json([{ name: "🤬" },{ name: "😨" },{ name: "🤡" }]);
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
