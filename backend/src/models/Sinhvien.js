import mongoose from "mongoose";
const sinhvienSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    classs: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    status: {
      type: String,
      enum: ["DangHoc", "XuongKhoa"],
      default: "DangHoc",
    },
    diemcongtac: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Sinhvien = mongoose.model("Sinhvien", sinhvienSchema);
export default Sinhvien;
