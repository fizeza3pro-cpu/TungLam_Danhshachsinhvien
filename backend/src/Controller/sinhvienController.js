import Sinhvien from "../models/Sinhvien.js";
export const GetAllSinhvien = async (req, res) => {
  try {
    const result = await Sinhvien.aggregate([
      {
        $facet: {
          sinhvien: [{ $sort: { diemcongtac: -1 } }],
          danhHocCount: [
            { $match: { status: "DangHoc" } },
            { $count: "count" },
          ],
          xuongKhoaCount: [
            { $match: { status: "XuongKhoa" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    const sinhviens = result[0].sinhvien;
    const xuongkhoacount = result[0].xuongKhoaCount[0]?.count || 0;
    const danghoccount = result[0].danhHocCount[0]?.count || 0;
    res.status(200).json({ sinhviens, xuongkhoacount, danghoccount });
  } catch (error) {
    console.error("lỗi khi gọi GetAllSinhvien: " + error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const GetSinhvienId = async (req, res) => {
  try {
    const sv = await Sinhvien.findById(req.params.id);
    res.status(200).json(sv);
  } catch (error) {
    console.error("lỗi khi gọi GetAllSinhvien: " + error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const CreateSv = async (req, res) => {
  try {
    const { code, name, classs, gender, status } = req.body;
    const sv = new Sinhvien({ code, name, classs, gender, status });
    const newsv = await sv.save();
    res.status(201).json(newsv);
  } catch (error) {
    console.error("lỗi khi gọi CreateSv: " + error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const UpdateSv = async (req, res) => {
  try {
    const { code, name, classs, gender, status, diemcongtac } = req.body;
    const updateSinhvien = await Sinhvien.findByIdAndUpdate(
      req.params.id,
      {
        code,
        name,
        classs,
        gender,
        status,
        diemcongtac,
      },
      { new: true },
    );
    if (!updateSinhvien) {
      console.log("không tồn tại sinh viên");
      return res.status(404).json({ message: "Không tìm thấy! " });
    }
    res.status(200).json(updateSinhvien);
    console.log("id:", req.params.id);
    console.log("body nhận được:", req.body);
  } catch (error) {
    console.error("lỗi khi gọi UpdateSv: " + error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
export const DeleteSv = async (req, res) => {
  try {
    const deleteSinhVien = await Sinhvien.findByIdAndDelete(req.params.id);
    if (!deleteSinhVien) {
      console.log("Không tồn tại sinh viên!");
      return res.status(404).json({ message: "Không timg thấy !" });
    }
    res.status(200).json(deleteSinhVien);
  } catch (error) {
    console.error("lỗi khi gọi DeleteSv: " + error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
