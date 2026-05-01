import { Button } from "./ui/button.jsx";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input.jsx";
import { Label } from "./ui/label.jsx";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group.jsx";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios.js";

export function CardDemo({ handleNewSVAdded, onClose }) {
  const [formdata, setformdata] = useState({
    ma: "",
    ten: "",
    lop: "",
    gioitinh: "",
  });
  const addSV = async () => {
    if (formdata.ten.trim() && formdata.lop.trim() && formdata.ma.trim()) {
      try {
        await api.post("/sinhvien", {
          code: formdata.ma,
          name: formdata.ten,
          classs: formdata.lop,
          gender: formdata.gioitinh,
        });
        toast.success(`Đã thêm học viên ${formdata.ten} vào danh sách`);
        handleNewSVAdded();
        onClose();
      } catch (error) {
        console.error("lỗi xảy ra khi thêm học viên:" + error);
        toast.error("Lỗi xảy ra khi thêm học viên!");
      }

      setformdata({
        ma: "",
        ten: "",
        lop: "",
        gioitinh: "",
      });
    } else {
      toast.info("Bạn cần nhập đầy đủ thông tin");
    }
  };
  return (
    <Card className="w-full max-w-sm bg-white rounded-sm  ring-0">
      <CardHeader>
        <CardTitle className={"font-bold text-2xl text-amber-600"}>
          Thêm học viên
        </CardTitle>
        <CardDescription className={"text-mauve-500"}>
          Nhập các thông tin vào đây!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label className={"font-bold text-amber-700"} htmlFor="ma">
                Mã học viên
              </Label>
              <Input
                id="ma"
                type="text"
                value={formdata.ma}
                onChange={(event) => {
                  setformdata({ ...formdata, ma: event.target.value });
                }}
                placeholder="SV001"
                className={
                  "rounded-lg border-amber-600 focus:border-orange-600/50 focus:ring-amber-600/20 "
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label className={"font-bold text-amber-700"} htmlFor="tenhv">
                Tên học viên
              </Label>
              <Input
                id="tenhv"
                type="text"
                value={formdata.ten}
                onChange={(event) => {
                  setformdata({ ...formdata, ten: event.target.value });
                }}
                placeholder="Nguyễn Văn A"
                className={
                  "rounded-lg border-amber-600 focus:border-orange-600/50 focus:ring-amber-600/20 "
                }
                required
              />
            </div>

            <div className="flex justify-between">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label className={"font-bold text-amber-700 "} htmlFor="lop">
                    Lớp
                  </Label>
                </div>
                <Input
                  id="lop"
                  type="text"
                  value={formdata.lop}
                  onChange={(event) => {
                    setformdata({ ...formdata, lop: event.target.value });
                  }}
                  className={
                    "rounded-lg border-amber-600  focus:border-orange-600/50 focus:ring-amber-600/20"
                  }
                  placeholder="CNTT1"
                  required
                />
              </div>
              <div className="grid gap-2 ">
                <div className="flex justify-between">
                  <Label htmlFor="lop" className={"font-bold text-amber-700"}>
                    Giới tính
                  </Label>
                </div>
                <RadioGroup
                  value={formdata.gioitinh}
                  onValueChange={(value) => {
                    console.log("Chọn:", value);
                    setformdata({ ...formdata, gioitinh: value });
                  }}
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
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          variant="gradient"
          type="submit"
          className="w-full bg-amber-600 text-white hover:bg-amber-800"
          onClick={addSV}
        >
          Thêm học viên
        </Button>
        <Button
          onClick={onClose}
          variant="ghost"
          type="submit"
          className="w-full rounded-xl"
        >
          Huỷ
        </Button>
      </CardFooter>
    </Card>
  );
}
