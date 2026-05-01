import mongoose from "mongoose";
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MGBD_CONNECTIONSTRING);
    console.log("lien kết csdl thành cồng");
  } catch (error) {
    console.log("lỗi khi kết nối csdl : " + error);
    process.exit(1);
  }
};
export default connectdb;
