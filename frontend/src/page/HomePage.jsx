import BoLoc from "@/components/BoLoc";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ListSinhVien from "@/components/ListSinhVien";
import PhanTrang from "@/components/PhanTrang";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visiblePageLimit } from "@/lib/data";
const HomePage = () => {
  const [svbuffer, setsvbuffer] = useState([]);
  const [danghoccount, setdanghoccount] = useState(0);
  const [xuongkhoacount, setxuongkhoacount] = useState(0);
  const [fillter, setfillter] = useState("all");
  const [page, setpage] = useState(1);

  const fetchSv = async () => {
    try {
      const res = await api.get("/sinhvien");
      setsvbuffer(res.data.sinhviens);

      setdanghoccount(res.data.danghoccount);
      setxuongkhoacount(res.data.xuongkhoacount);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy vấn sinh viên: " + error);
      toast.error("Lỗi xảy ra khi truy vấn sinh viên: " + error);
    }
  };
  //luuw danh sachs ddax locj : chayj heets mangr svbuffer kiểm tra
  const fillteredSV = svbuffer.filter((sv) => {
    switch (fillter) {
      case "DangHoc":
        return sv.status === "DangHoc";
      case "XuongKhoa":
        return sv.status === "XuongKhoa";
      default:
        return true;
    }
  });
  const visiblePage = fillteredSV.slice(
    (page - 1) * visiblePageLimit,
    page * visiblePageLimit,
  );

  const totalPage = Math.ceil(fillteredSV.length / visiblePageLimit);

  const handleNext = () => {
    if (page < totalPage) setpage((p) => p + 1);
  };
  const handlePre = () => {
    if (page > 1) setpage((p) => p - 1);
  };
  const handlePageChange = (page) => {
    setpage(page);
  };
  useEffect(() => {
    fetchSv();
  }, []);
  useEffect(() => {
    setpage(1);
  }, [fillter]);
  useEffect(() => {
    if (visiblePage.length === 0 && page > 1) {
      handlePre();
    }
  }, [visiblePage.length]);
  return (
    <div className="min-h-screen w-full relative ">
      {/* Soft Pastel Dream Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, #F8BBD9 0%, #FDD5B4 25%, #FFF2CC 50%, #E1F5FE 75%, #BBDEFB 100%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container mx-auto pt-10 relative z-1 flex justify-center">
        <div className="flex flex-col items-center gap-10 pt-10 w-[60%]">
          <Header
            abc={() => {
              fetchSv();
            }}
          />
          <BoLoc
            svDangHoc={danghoccount}
            svXuongKhoa={xuongkhoacount}
            fillter={fillter}
            setfillter={setfillter}
          />
          <ListSinhVien
            listsv={visiblePage}
            fillter={fillter}
            handleSinhVienChange={() => fetchSv()}
          />
          <PhanTrang
            next={handleNext}
            pre={handlePre}
            change={handlePageChange}
            page={page}
            total={totalPage}
          />
          <Footer svDangHoc={danghoccount} svXuongKhoa={xuongkhoacount} />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
