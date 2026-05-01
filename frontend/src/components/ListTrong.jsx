import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const ListTrong = ({ fillter }) => {
  return (
    <Card className={"w-3xl bg-white rounded-2xl border-0 border-white"}>
      <div className="p-8 text-center space-y-2 ">
        <Circle className="size-12 mx-auto " />
        <h3 className="font-medium text-xl text-amber-500">
          {fillter === "DangHoc"
            ? "Không có học viên nào đang học"
            : fillter === "XuongKhoa"
              ? "Không có học viên nào xuống khoá"
              : "Không có học viên nào ở đây!"}
        </h3>
        <p className="text-sm ">
          {fillter === "all"
            ? "Hãy thêm học viên vào danh sách"
            : `Chuyển sang "Tất cả" để thấy các học viên ${fillter === "xuongkhoa" ? "đang học" : "xuống khoá"} `}
        </p>
      </div>
    </Card>
  );
};

export default ListTrong;
