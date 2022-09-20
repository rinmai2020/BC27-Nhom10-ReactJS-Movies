import { TicketsInfo } from "modules/_core/ticketsInfo";
import axiosClient from "./axiosClient";

const movieAPI = {
  getMovies: (tenPhim) => {
    return axiosClient.get("QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP10",
        tenPhim: tenPhim,
      },
    });
  },
  getMoviePages: ({ page }) => {
    return axiosClient.get("QuanLyPhim/LayDanhSachPhimPhanTrang", {
      params: {
        maNhom: "GP10",
        soTrang: page,
        soPhanTuTrenTrang: 8,
      },
    });
  },
  getBanners: () => {
    return axiosClient.get("QuanLyPhim/LayDanhSachBanner");
  },

  getMovieDetails: (movieId) => {
    return axiosClient.get("QuanLyPhim/LayThongTinPhim", {
      params: {
        maPhim: movieId,
      },
    });
  },
  //quan ly rap

  getMovieShowtime: (movieId) => {
    return axiosClient.get("QuanLyRap/LayThongTinLichChieuPhim", {
      params: {
        MaPhim: movieId,
      },
    });
  },
  // getMovieShowtime: () => {
  //   return axiosClient.get("QuanLyRap/LayThongTinHeThongRap");
  // },
  getTickets: (ShowtimeId) => {
    return axiosClient.get("QuanLyDatVe/LayDanhSachPhongVe", {
      params: {
        MaLichChieu: ShowtimeId,
      },
    });
  },
  bookingTickets: (ticketsInfo = new TicketsInfo()) => {
    return axiosClient.post(`QuanLyDatVe/DatVe`, ticketsInfo);
  },
  //lich su dat ve
  bookingHistory: () => {
    return axiosClient.post("QuanLyNguoiDung/ThongTinTaiKhoan");
  },
  getTheaterShowtime: () => {
    return axiosClient.get("QuanLyRap/LayThongTinLichChieuHeThongRap", {
      params: {
        maNhom: "GP10",
      },
    });
  },
  getTheaterSystem: (maHeThongRap) => {
    return axiosClient.get("QuanLyRap/LayThongTinCumRapTheoHeThong", {
      params: {
        maHeThongRap: maHeThongRap,
      },
    });
  },

  postBookingTicket: (thongTinLichChieu) => {
    return axiosClient.post("QuanLyDatVe/TaoLichChieu", thongTinLichChieu);
  },
  ///
  addMovie: (movie) => {
    // Đối với dữ liệu có định dạng đặc biệt như File,...
    // Ta cần phải tạo ra FormData để lưu trữ
    const formData = new FormData();
    // Duyệt qua từng thuộc tính trong object movie và thêm vào formData
    for (let key in movie) {
      formData.append(key, movie[key]);
    }
    formData.append("maNhom", "GP10");

    return axiosClient.post("QuanLyPhim/ThemPhimUploadHinh", formData);
  },
  updateMovies: (movie) => {
    const formData = new FormData();
    for (let key in movie) {
      formData.append(key, movie[key]);
    }
    formData.append("maNhom", "GP10");
    return axiosClient.post("QuanLyPhim/CapNhatPhimUpload", formData);
  },
  deleteMovies: (movieId, auth) => {
    return axiosClient.delete("/QuanLyPhim/XoaPhim", {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      params: {
        maPhim: movieId,
      },
    });
  },
};

export default movieAPI;
