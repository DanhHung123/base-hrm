import axios from "axios";
import { SEARCH_OBJECT_MAX_SIZE } from "./Constant";

const API_PATH_EXPORT = process.env.REACT_APP_API_URL + "/download-excel";

export const exportHoSo = (searchObject: any) => {
  let url = `${API_PATH_EXPORT}/danh-sach-ho-so`;
  searchObject = {
    ...searchObject,
    ...SEARCH_OBJECT_MAX_SIZE,
  };
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: searchObject,
  });
};

export const exportBangCap = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-bang-cap`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportChungChi = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-chung-chi`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportPoliticalTheory = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-ly-luan-chinh-tri`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportTrainingProcess = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-qt-boi-duong`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportGiaDinh = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-gia-dinh`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportTiemChung = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-tiem-chung`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportKinhNghiem = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-kinh-nghiem-lam-viec`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportCongTac = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-qua-trinh-cong-tac`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportKiemNhiem = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-kiem-nhiem`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportBietPhai = (id: string) => {
  const url = `${API_PATH_EXPORT}/danh-sach-biet-phai`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportLichSuLuong = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-lich-su-luong`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportGiayTo = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-giay-to-co-thoi-han`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportTepDinhKem = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-tai-lieu-dinh-kem`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportKhauTru = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-khau-tru`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportPhuCap = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-phu-cap`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportPhucLoi = (searchObject: any) => {
  let url = `${API_PATH_EXPORT}/danh-sach-phuc-loi`;
  searchObject = {
    ...searchObject,
    ...SEARCH_OBJECT_MAX_SIZE,
  };
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: searchObject || {},
  });
};

export const exportPhucLoiThamGia = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-tham-gia-phuc-loi`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { phucLoiId: id },
  });
};

export const exportPhucLoiThamGiaChiTiet = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-tham-gia-phuc-loi-chi-tiet`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportSuCo = () => {
  let url = `${API_PATH_EXPORT}/danh-sach-su-co`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: {},
  });
};

export const exportSuCoNhanVien = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-su-co-nhan-vien`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};

export const exportHopDong = (searchObject: any) => {
  let url = `${API_PATH_EXPORT}/danh-sach-hop-dong`;
  searchObject = {
    ...searchObject,
    ...SEARCH_OBJECT_MAX_SIZE,
  };
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: searchObject || {},
  });
};

export const exportHopDongPhuCap = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-cac-khoan-phu-cap`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { hopDongLaoDongId: id }, //
  });
};

export const exportHopDongPhuLuc = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-phu-luc-hop-dong`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { hopDongLaoDongId: id },
  });
};

export const exportThuyenChuyen = (searchObject?: any) => {
  let url = `${API_PATH_EXPORT}/danh-sach-thuyen-chuyen`;
  searchObject = {
    ...searchObject,
    ...SEARCH_OBJECT_MAX_SIZE,
  };
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: searchObject || {},
  });
};

export const exportBoNhiem = (searchObject: any) => {
  let url = `${API_PATH_EXPORT}/danh-sach-bo-nhiem`;
  searchObject = {
    ...searchObject,
    ...SEARCH_OBJECT_MAX_SIZE,
  };
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: searchObject || {},
  });
};

export const exportMienNhiem = (searchObject: any) => {
  let url = `${API_PATH_EXPORT}/danh-sach-mien-nhiem`;
  searchObject = {
    ...searchObject,
    ...SEARCH_OBJECT_MAX_SIZE,
  };
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: searchObject || {},
  });
};

export const exportThoiViec = (searchObject: any) => {
  let url = `${API_PATH_EXPORT}/danh-sach-nhan-vien-nghi-viec`;
  searchObject = {
    ...searchObject,
    ...SEARCH_OBJECT_MAX_SIZE,
  };
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: searchObject,
  });
};

export const exportGianDoan = (searchObject: any) => {
  let url = `${API_PATH_EXPORT}/danh-sach-gian-doan`;
  searchObject = {
    ...searchObject,
    ...SEARCH_OBJECT_MAX_SIZE,
  };
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: searchObject,
  });
};

export const exportKhenThuong = (searchObject: any) => {
  let url = `${API_PATH_EXPORT}/danh-sach-khen-thuong`;
  searchObject = {
    ...searchObject,
    ...SEARCH_OBJECT_MAX_SIZE,
  };
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: searchObject || {},
  });
};

export const exportKyLuat = (searchObject: any) => {
  let url = `${API_PATH_EXPORT}/danh-sach-ky-luat`;
  searchObject = {
    ...searchObject,
    ...SEARCH_OBJECT_MAX_SIZE,
  };
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: searchObject || {},
  });
};

export const exportPhucLoiChiTiet = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-tham-gia-phuc-loi`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { phucLoiId: id },
  });
};

export const exportDeXuat = (searchObject: any) => {
  let url = `${API_PATH_EXPORT}/danh-sach-de-xuat`;
  searchObject = {
    ...searchObject,
    ...SEARCH_OBJECT_MAX_SIZE,
  };
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: searchObject || {},
  });
};

export const exportTiepNhan = () => {
  let url = `${API_PATH_EXPORT}/danh-sach-tiep-nhan`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: {},
  });
};

export const exportKhenThuongChiTiet = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-khen-thuong-chi-tiet`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { khenThuongId: id },
  });
};

export const exportLuanChuyenChiTiet = (id: string) => {
  let url = `${API_PATH_EXPORT}/danh-sach-luan-chuyen-chi-tiet`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { khenThuongId: id },
  });
};

export const exportBaoCao = (dataExport: Object) => {
  let url = `${API_PATH_EXPORT}/bao-cao`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: dataExport,
  });
}

export const exportSoYeuLyLich = (dataExport: Object) => {
  let url = `${API_PATH_EXPORT}/export-so-yeu-ly-lich`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: dataExport,
  });
}