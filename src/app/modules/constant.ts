import { OptionReactSelect } from "./models/models";

export const inputTypeList = {
    text: 'text',
    select: 'select',
    date: 'date',
    number: 'number',
    file: 'file',
    checkbox: 'checkbox'
};

export const TYPE_CATEGORY ={
    cap:1,
    bac:2,
    chucVuDang:3,
    chucVuDoan:4,
    chuyenNganh:5,
    phuCap:6,
    danToc: 7,
    chucDanh:8,
    phongBan: 9,
    nganHang: 10,
    binhChung: 11,
    chungChi:12,
    tonGiao:13,
    capBacQuanSu: 14,
    chucVuQuanSu: 15,
    hangThuongBenhBinh: 16,
    phongBenh: 17,
    viTriCongViec:28,
    noiDaoTao:31,
    donVi:100,
    nhomChungChi: 34,
    trinhDoDaoTao: 35,
    quanHeGiaDinh: 36,
    kyNangMem: 37,
    trinhDoNgoaiNgu: 38,
    trinhDoTinHoc: 39,
    trinhDoQuanLyNhaNuoc: 40,
    trinhDoLyLuan: 41,
    hinhThucKhenThuong: 42,
    danhHieu: 43,
    loaiThuTuc: 44,
    loaiDieuDong: 45,
    phanLoaiBaoCao: 46
};

export const rowPerPage = [1,5,10,20,30];

export const listGender: OptionReactSelect[] = [
    {
        value: 'M',
        name: 'Male'
    }, 
    {
        value: 'F',
        name: 'Female'
    }
];

export const regex = {
    phone: /^(?:\+84|0)(?:3|5|7|8|9)\d{8}$/,
}

export const CODE_GROUP_CERTIFICATE = {
    HANH_NGHE: "HN",
    NGOAI_NGU: "NN",
    TIN_HOC: "TH",
    KHAC: "OTHER"
}
