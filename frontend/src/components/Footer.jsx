import React from "react";

const Footer = ({ svDangHoc = 0, svXuongKhoa = 0 }) => {
  return (
    <>
      {/* {svDangHoc + svXuongKhoa > 0 && (
        <div className="text-sm text-center bg-blue-200 rounded-xl p-2 font-semibold mb-5">
          {svDangHoc > 0 && <>Có tất cả {svDangHoc} học viên đang học</>}
        </div> */}
      {/* )} */}
      <span className="text-sm text-gray-500 fixed bottom-2">
        Create by Nguyen Dinh Tung Lam - CNTT1 - c160{" "}
      </span>
    </>
  );
};

export default Footer;
