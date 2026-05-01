import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import api from "@/lib/axios";
import { toast } from "sonner";

const CardSinhVien = ({ sv, index, handleSinhVienChange }) => {
  const [isEditting, setisEditting] = useState(false);
  const [diemcongtac, setdiemcongtac] = useState(sv.diemcongtac || 0);
  const [svUpdate, setsvUpdate] = useState({
    ma: sv.code || "",
    ten: sv.name || "",
    lop: sv.classs || "",
    gioitinh: sv.gender || "",
  });
  const deleteSv = async (svid) => {
    try {
      await api.delete(`/sinhvien/${svid}`);
      toast.success("Xoá sinh viên thành công");
      handleSinhVienChange();
    } catch (error) {
      console.error("lỗi xaỷ ra khi xoá sinh viên:" + error);
      toast.error("Lỗi xảy ra khi xoá học viên");
    }
  };
  const updateDiemCongTac = async (newDiem) => {
    try {
      await api.put(`/sinhvien/${sv._id}`, {
        diemcongtac: newDiem,
      });
      toast.success(`+1 điểm cho ${sv.name}`);
      handleSinhVienChange();
    } catch (error) {
      console.error("lỗi xaỷ ra khi updateDiemCongTac sinh viên:" + error);
      toast.error("Lỗi xảy ra khi updateDiemCongTac học viên");
    }
  };
  const updateSv = async (svid) => {
    try {
      await api.put(`/sinhvien/${svid}`, {
        code: svUpdate.ma,
        name: svUpdate.ten,
        classs: svUpdate.lop,
        gender: svUpdate.gioitinh,
      });

      toast.success("Update viên thành công");
      setisEditting(false);
      handleSinhVienChange();
      console.log({
        code: svUpdate.ma,
        name: svUpdate.ten,
        classs: svUpdate.lop,
        gender: svUpdate.gioitinh,
      });
    } catch (error) {
      console.error("lỗi xaỷ ra khi Update sinh viên:" + error);
      toast.error("Lỗi xảy ra khi Update học viên");
    }
  };
  const changeStatus = async () => {
    try {
      if (sv.status === "DangHoc") {
        await api.put(`/sinhvien/${sv._id}`, {
          status: "XuongKhoa",
        });
        toast.success("Cập nhật thành công");
      } else {
        await api.put(`/sinhvien/${sv._id}`, {
          status: "DangHoc",
        });
        toast.success("Cập nhật thành công");
      }
      handleSinhVienChange();
    } catch (error) {
      console.error("lỗi xaỷ ra khi changeStatus sinh viên:" + error);
      toast.error("Lỗi xảy ra khi changeStatus học viên");
    }
  };

  return (
    <Card
      className={cn(
        "opacity-0 group w-2xl h-2xl p-4 rounded-2xl  bg-white border-0 shadow-blue-100 hover:shadow-blue-500 transition-all duration-200 animate-slide-up ",
        sv.status === "XuongKhoa" && "border-red-600 border-2",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* nút tròn */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            sv.status === "DangHoc"
              ? "text-amber-500 hover:text-green-400/80"
              : "text-blue-600 hover:text-black",
          )}
          onClick={changeStatus}
        >
          {sv.status === "DangHoc" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>
        {/* các trường có thể chỉnh sửa */}
        <div className="w-full">
          {isEditting ? (
            <>
              <div
                className="space-y-2 animate-fade-in"
                tabIndex={0}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    toast.warning("Đã thoát khỏi trạng thái chỉnh sửa");
                    setisEditting(false);
                    setsvUpdate({
                      ma: sv.code || "",
                      ten: sv.name || "",
                      lop: sv.classs || "",
                      gioitinh: sv.gender || "",
                    });
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateSv(sv._id);
                  }
                }}
              >
                <Input
                  value={svUpdate.ma}
                  onChange={(e) =>
                    setsvUpdate({ ...svUpdate, ma: e.target.value })
                  }
                  placeholder="Mã học viên"
                  type={"text"}
                  className={
                    " flex flex-col gap-2 h-10 text-amber-700 border-b-amber-400/50 rounded-xl w-[92%]"
                  }
                />
                <Input
                  value={svUpdate.ten}
                  onChange={(e) => {
                    setsvUpdate({ ...svUpdate, ten: e.target.value });
                  }}
                  placeholder="Họ và tên"
                  type={"text"}
                  className={
                    "h-10 text-amber-700 border-b-amber-400/50 rounded-xl w-[92%]"
                  }
                />
                <div className="flex gap-6 w-full">
                  <Input
                    value={svUpdate.ma}
                    onChange={(e) =>
                      setsvUpdate({ ...svUpdate, lop: e.target.value })
                    }
                    placeholder="Lớp"
                    type={"text"}
                    className={
                      "h-10 text-amber-700 border-b-amber-400/50 rounded-xl w-[30%]"
                    }
                  ></Input>
                  <RadioGroup
                    value={svUpdate.gioitinh}
                    onValueChange={(value) => {
                      console.log("Chọn:", value);
                      setsvUpdate({ ...svUpdate, gioitinh: value });
                    }}
                    defaultValue="nam"
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Nam</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Nữ</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Khác</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                key={"display"}
                className="flex justify-between items-center min-w-full animate-fade-in
              "
              >
                <div className="w-[80%]">
                  <p className="text-amber-600 font-bold text-sm ">{sv.code}</p>
                  <div className="grid grid-cols-2 ">
                    <div>
                      <h3
                        className={cn(
                          "shrink-0 duration-200 transition-all text-base font-bold",
                          sv.status === "DangHoc"
                            ? " text-green-500"
                            : "text-red-500",
                        )}
                      >
                        {sv.name}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 ">
                      <p className="font-semibold text-sm">
                        <b>Lớp:</b>
                        {" " + sv.classs}
                      </p>
                      <p className="font-semibold">
                        {sv.gender === "male"
                          ? "Giới tính: Nam"
                          : sv.gender === "female"
                            ? "Giới tính: Nữ "
                            : "Giới tính: Khác"}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex justify-start items-center gap-[80px] flex-1 mt-1.5">
                    <div className="justify-center gap-1 items-center">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-3 text-blue-900" />
                        <span className=" inline-block font-semibold">
                          Thời gian tạo:
                        </span>
                      </div>
                      <span className="text-amber-600 font-semibold">
                        {new Date(sv.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {sv.updatedAt === sv.createdAt ? (
                      <span className=" text-gray-400">Chưa Update</span>
                    ) : (
                      <div className="justify-center gap-1 items-center">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-3 text-blue-900" />
                          <span className=" inline-block font-semibold">
                            Thời gian Update:
                          </span>
                        </div>
                        <span className="text-green-600 font-semibold">
                          {new Date(sv.updatedAt).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  className={
                    "rounded-xl animate-slide-up w-[30px] border-1 border-amber-500 font-bold text-amber-500 hover:text-white hover:bg-amber-500 "
                  }
                  variant="ghost"
                  value={diemcongtac}
                  onClick={() => {
                    const newDiem = diemcongtac + 1;
                    setdiemcongtac(newDiem);
                    updateDiemCongTac(newDiem);
                  }}
                >
                  {diemcongtac}
                </Button>
                <div className="flex gap-2 w-0 overflow-hidden group-hover:w-20 transition-all duration-200 p-1">
                  <Button
                    onClick={() => {
                      setisEditting(true);
                      setsvUpdate({
                        ma: sv.code || "",
                        ten: sv.name || "",
                        lop: sv.classs || "",
                        gioitinh: sv.gender || "",
                      });
                    }}
                    variant="ghost"
                    size="icon"
                    className={
                      "transition-colors size-8 hover:text-amber-700 rounded-2xl"
                    }
                  >
                    <SquarePen className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteSv(sv._id)}
                    className={
                      "transition-colors size-8 hover:text-amber-700 rounded-2xl"
                    }
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CardSinhVien;
