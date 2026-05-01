import React from "react";
import ListTrong from "./ListTrong";
import CardSinhVien from "./CardSinhVien";

const ListSinhVien = ({ listsv, fillter, handleSinhVienChange }) => {
  if (!listsv || listsv.length === 0) {
    return <ListTrong fillter={fillter} />;
  }
  return (
    <div className="space-y-3">
      {listsv.map((sv, index) => (
        <CardSinhVien
          key={sv._id ?? index}
          sv={sv}
          index={index}
          handleSinhVienChange={handleSinhVienChange}
        />
      ))}
    </div>
  );
};

export default ListSinhVien;
