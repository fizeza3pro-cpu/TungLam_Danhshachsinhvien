import ex from "express";
import {
  CreateSv,
  DeleteSv,
  GetAllSinhvien,
  UpdateSv,
} from "../Controller/sinhvienController.js";

const router = ex.Router();

router.get("/", GetAllSinhvien);
router.post("/", CreateSv);
router.put("/:id", UpdateSv);
router.delete("/:id", DeleteSv);
export default router;
