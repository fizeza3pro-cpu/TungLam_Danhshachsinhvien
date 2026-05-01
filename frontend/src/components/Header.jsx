import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CardDemo } from "./Themsinhvien";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const Header = ({ abc }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-2 w-full text-center ">
      <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text ">
        Danh sách học viên
      </h1>
      <p className="font-bold text-1xl mt-5">
        Đây là danh sách sinh viên trong hệ thống
      </p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button
              variant="gradient"
              className={
                "size-10 h-12 w-40 bg-amber-300 mt-5 font-bold text-2sm"
              }
            >
              + Thêm học viên
            </Button>
          }
        ></DialogTrigger>

        <DialogContent className="max-w-md p-0 border-0">
          {open && ( // ← chỉ render khi open = true
            <CardDemo handleNewSVAdded={abc} onClose={() => setOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
