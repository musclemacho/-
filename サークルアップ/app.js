const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
const PORT = 3000;

// set ejs
app.set('view engine', 'ejs');

// start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// サーバーの設定
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

// テーブル初期化
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Circles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      circleName TEXT NOT NULL,
      memberCount INTEGER NOT NULL,
      description TEXT NOT NULL,
      feeAmount TEXT,
      instagram TEXT
    );
  `);
});

app.post("/circles", (req, res) => {
    const { circleName, memberCount, description, feeAmount, instagram } = req.body || {};

    if (!circleName || !memberCount || !description) {
      console.error("必須フィールドが不足しています:", req.body);
      return res.status(400).json({ error: "必要な情報が足りません" });
    }

    const query = `
      INSERT INTO Circles (circleName, memberCount, description, feeAmount, instagram)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
      query,
      [ circleName, memberCount, description, feeAmount || null, instagram ],
      function (err) {
        if (err) {
          console.error("SQLエラー:", err.message, "リクエストデータ:", req.body);
          return res.status(500).json({ error: "データベースへの保存に失敗しました" });
        }
        console.log("新しいサークルが登録されました:", this.lastID);
        res.status(201).json({ id: this.lastID });
      }
    );
});

app.get("/", (req, res) => {
    const query = `SELECT * FROM Circles`;

    db.all(query, [], (err, rows) => {
      if (err) {
        console.error("データ取得エラー:", err.message);
        return res.status(500).send("エラーが発生しました");
      }

      res.render("index", { circles: rows });
    });
});

// 各ページのルート
app.get('/newCircle', (req, res) => {
    res.render('newCircle', { title: '新しいサークル掲載' });
});

app.get('/schedule', (req, res) => {
    res.render('schedule');
});

app.get('/circle1', (req, res) => {
    res.render('circle1', { title: '求人タイトル 1', description: '詳細説明 1' });
});
