import axios from "axios";
const API_PATH = process.env.REACT_APP_API_URL;
export const fileUpload = (file: any) => {
  let url = `${API_PATH}/file/upload`;
  let formData = new FormData();
  formData.append("uploadFile", file);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axios.post(url, formData, config);
};
export const imageUpload = (file: any) => {
  let url = `${API_PATH}/file/upload-image`;
  let formData = new FormData();
  formData.append("uploadImage", file);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axios.post(url, formData, config);
};
export const downLoadFile = (fileName: string) => {
  let url = `${API_PATH}/file/document?fileName=${fileName}`;
  return axios({
    url: url,
    method: "GET",
    responseType: "blob",
  });
};

export const downLoadFileById = (fileId: string) => {
  let url = `${API_PATH}/file/document/${fileId}`;
  return axios({
    url: url,
    method: "GET",
    responseType: "blob",
  });
};

