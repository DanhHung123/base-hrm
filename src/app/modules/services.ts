import { APIResponse } from "./models/models";
import axios, { AxiosResponse } from "axios";
import { paramsConfig } from "./utils/ParamsUtils";
const API_URL = process.env.REACT_APP_API_URL;
export const getAllSimpleValue = (type: number) => {
  let url = API_URL + `/c-simple-category-attribute-value/page?pageSize=1000&pageIndex=1&type=${type}`;
  return axios.get(url);
};

export const getAllSimpleAttributeValue = (searchObject: any) => {
  let url = API_URL + `/c-simple-category-attribute/page`;
  return axios.get(url, paramsConfig(searchObject));
};

export const addSimpleAttributeValue = (data: any) => {
  return axios.post(`${API_URL}/c-simple-category-attribute-value`, data);
};

export const getVaccineFromPhongBenh = (type: number, id: string) => {
  let url = API_URL + `/c-simple-category-attribute-value/page?pageSize=1000&pageIndex=1&type=${type}&mappingId=${id}`;
  return axios.get(url);
};

export const getNationality = () => {
  let url = API_URL + `/c-nationality/page?pageSize=1000&pageIndex=1`;
  return axios.get(url);
}

export const getAllCountry = () => {
  let url = API_URL + `/c-country`;
  return axios.get(url);
}

//new
export const searchNationality = (searchObject: any) => {
  let url = API_URL + `/c-nationality/page`;
  return axios.get(url, paramsConfig(searchObject));
}

export const searchAllSimpleValue = (searchObject: any) => {
  const url = API_URL + `/c-simple-category-attribute-value/page`;
  return axios.get(url, paramsConfig(searchObject));
};

export const searchAllSimpleCategory = (searchObject: any) => {
  const url = API_URL + `/c-simple-category-attribute/page`;
  return axios.get(url, paramsConfig(searchObject));
};

export const searchAllProvince = (searchObject: any) => {
  let url = API_URL + "/province/page";
  return axios.get(url, paramsConfig(searchObject));
}

export const searchDistrictByProvince = (searchObject: any) => {
  let url = API_URL + "/district/get-by-province/page";
  return axios.get(url, paramsConfig(searchObject));
}
export const searchCommuneByDistrict = (searchObject: any) => {
  let url = API_URL + "/subdistrict/get-by-district/page";
  return axios.get(url, paramsConfig(searchObject));
}

export const getAllProvince = () => {
  let url = API_URL + "/province/page?pageIndex=1&pageSize=1000";
  return axios.get(url);
}

export const getAllDistrict = () => {
  let url = API_URL + "/district";
  return axios.get(url);
}

export const getAllCommune = () => {
  let url = API_URL + "/subdistrict";
  return axios.get(url);
}

export const getDistrictByProvince = (idProvince: string) => {
  let url = API_URL + "/district/get-by-province/page?pageIndex=1&pageSize=1000&id=" + idProvince;
  return axios.get(url);
}

export const getCommuneByDistrict = (idDistrict: string) => {
  let url = API_URL + "/subdistrict/get-by-district/page?pageIndex=1&pageSize=1000&id=" + idDistrict;
  return axios.get(url);
}

export const handleGetDayOfWeek = (day: any, lang: string) => {
  let date = new Date(day);
  let dayOfWeek = date.getDay();
  let daysOfWeek = (lang === 'en')
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  let dayName = daysOfWeek[dayOfWeek];
  return dayName;
};

export const handleGetOnlyDay = (day: string) => {
  const dateParts = day.split('-');
  const onlyDay = dateParts[2];
  return onlyDay;
};

export const isSunday = (day: Date) => {
  if (new Date(day).getDay() === 0) {
    return true;
  }
  return false;
};

export const isSaturday = (day: Date) => {
  if (new Date(day).getDay() === 6) {
    return true;
  }
  return false;
};

export const setBackgroundTK = (soCong: number) => {
  if (soCong === 1) {
    return "fulltime";
  } else if (soCong === 0.5) {
    return "parttime";
  } else {
    return "absense";
  }
};