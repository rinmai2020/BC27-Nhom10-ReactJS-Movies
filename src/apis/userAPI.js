import axiosClient from "./axiosClient";
const userAPI = {
  getUsers: () => {
    return axiosClient.get("QuanLyNguoiDung/LayDanhSachNguoiDung", {
      params: {
        maNhom: "GP10",
      },
    });
  },
  deleteUser: (TaiKhoan) => {
    return axiosClient.delete("QuanLyNguoiDung/XoaNguoiDung", {
      params: {
        TaiKhoan: TaiKhoan,
      },
    });
  },
  getUserInfo: (taiKhoan) => {
    return axiosClient.post(
      `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`
    );
  },
  getTypeUsers: () => {
    return axiosClient.get("QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
  },
  addUser: (user) => {
    return axiosClient.post("QuanLyNguoiDung/ThemNguoiDung", user);
  },
  updateUser: (userInfo) => {
    return axiosClient.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", {
      ...userInfo,
      maNhom: "GP10",
    });
  },
  findUser: (taiKhoan) => {
    return axiosClient.get(
      `QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP10&tuKhoa=${taiKhoan}`
    );
  },
};
export default userAPI;
