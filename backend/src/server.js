import ex from "express";
import svRouter from "./router/sinhvienRouter.js";
import dns from "dns";
import connectdb from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();
const __dirname = path.resolve();
const app = ex();
const port = process.env.PORT || 3000; //dùng process.env.PORT , nếu ko truy cập đc thì dùng cổng 3000
app.use(ex.json());
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}
app.use("/api/sinhvien", svRouter);

// gộp cả hai lại để chạy trên cùng một tên miền/cổng.

// Server Node.js vừa đóng vai trò là API, vừa đóng vai trò là máy chủ cấp file giao diện cho người dùng.
if (process.env.NODE_ENV === "production") {
  app.use(ex.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectdb().then(() => {
  app.listen(port, () => {
    console.log(`server bat dau o cong ${port}`);
  });
});
