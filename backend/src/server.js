import ex from "express";
import svRouter from "./router/sinhvienRouter.js";
import dns from "dns";
import connectdb from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();
const app = ex();
const port = process.env.PORT || 3000; //dùng process.env.PORT , nếu ko truy cập đc thì dùng cổng 3000
app.use(ex.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/sinhvien", svRouter);
connectdb().then(() => {
  app.listen(port, () => {
    console.log(`server bat dau o cong ${port}`);
  });
});
