import React from "react";
import { Badge } from "./ui/badge";
import { SinhVientype } from "@/lib/data";
import { Button } from "./ui/button";

const BoLoc = ({
  svDangHoc = 0,
  svXuongKhoa = 0,
  fillter = "all",
  setfillter,
}) => {
  return (
    <div className="flex justify-around w-full">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <Badge
            className={
              "text-green-500 bg-white/50 border-green-600 border-1 rounded-sm hover:bg-green-400/80 hover:text-white"
            }
          >
            {svDangHoc} {SinhVientype.DangHoc}
          </Badge>
        </div>
        <div className="flex gap-3">
          <Badge
            className={
              "text-red-500 bg-white/50 border-red-500 border-1 rounded-sm hover:bg-red-400/80 hover:text-white"
            }
          >
            {svXuongKhoa} {SinhVientype.XuongKhoa}
          </Badge>
        </div>
      </div>

      <div className="flex gap-5">
        {Object.keys(SinhVientype).map((type) => (
          <Button
            key={type}
            variant={fillter == type ? "gradient" : "ghost"}
            size="sm"
            className={"rounded-sm"}
            onClick={() => setfillter(type)}
          >
            {SinhVientype[type]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BoLoc;
