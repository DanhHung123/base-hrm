//@ts-nocheck
import moment from "moment";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import { LETTER_PER_LINE } from "../component/table-custom/TableConst";
import { IItemSearch } from "../profile/models/ProfileModels";
import { localStorageItem } from "./LocalStorage";
import { EXTENSIONS, JUST_ALLOW_NUMBER, NUMBER_EXCEPT_THIS_SYMBOLS, TYPE } from "./Constant";
import { TMenu, TSubMenu, allMenu } from "../../pages/Homepage/listMenu";
import { OptionReactSelect } from "../models/models";
import debounce from 'lodash/debounce';
import * as echarts from "echarts";
import { headerConstant } from "../../../_metronic/layout/components/header/header-menus/constant";
import { v4 as uuidv4 } from 'uuid';

type IPropsExport = {
  exportAPI: any;
  fileName?: string;
  setPageLoading?: any,
  type?: string;
}

export const checkTypeOf = (value: any) => {
  return Object.prototype.toString.call(value).slice(8, -1);
};
export const covertDateToString = (value: any) => {
  return value ? moment(value).format("YYYY-MM-DD") : "";
};
export function transformArray(arr: any[]) {
  return arr?.map((item) => {
    return {
      code: item?.id,
      name: item?.value,
    };
  });
}
export function transformArrayByName(name: string, arr: any[]) {
  return arr?.map((item) => {
    return {
      value: item?.id,
      name: item[name],
    };
  });
}
export function transformArrayByNameForLocation(name: string, arr: any[]) {
  return arr?.map((item) => {
    return {
      ...item,
      code: item?.id,
      name: item[name],
    };
  });
}
export function useCustomIntl(messageId: string) {
  const intl = useIntl();
  return intl.formatMessage({ id: messageId });
}
export const getOptionById = (id: string, options: OptionReactSelect[]) => {
  return options.find((option) => option?.id === id);
};
export const balanceElements = (tableClass1, tableClass2) => {
  const table1Rows = document.querySelectorAll(`.${tableClass1} tbody tr`);
  const table2Rows = document.querySelectorAll(`.${tableClass2} tbody tr`);
  const table1HeaderCells = document.querySelectorAll(`.${tableClass1} th`);
  const table2HeaderCells = document.querySelectorAll(`.${tableClass2} th`);

  for (let i = 0; i < Math.max(table1Rows.length, table1HeaderCells.length); i++) {
    if (i < table1HeaderCells.length) {
      const headerCell1 = table1HeaderCells[i];
      const headerCell2 = table2HeaderCells[i];
      const maxHeightHeaderCell = Math.max(headerCell1?.offsetHeight, headerCell2?.offsetHeight);
      if (maxHeightHeaderCell < 64) {
        headerCell1.style.height = `${maxHeightHeaderCell}px`;
        headerCell2.style.height = `${maxHeightHeaderCell}px`;
      }
    }
    if (i < table1Rows.length) {
      const row1 = table1Rows[i];
      const row2 = table2Rows[i];
      const maxHeightRow = Math.max(row1?.offsetHeight, row2?.offsetHeight);
      row1.style.height = `${maxHeightRow}px`;
      row2.style.height = `${maxHeightRow}px`;
    }
  }
};

export const exportToFile = async (props: IPropsExport) => {
  const { exportAPI, fileName = "Danh sách", setPageLoading, type = TYPE.EXCEL } = props;
  try {
    if(setPageLoading){
      setPageLoading(true);
    }
    const data = await exportAPI(); 
    if (data.status === 200) {
      const url = window.URL.createObjectURL(new Blob([data.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName}.${EXTENSIONS[type]}`);
      document.body.appendChild(link);
      link.click();
      toast.success("Export thành công");
    } else {
      toast.error("Lỗi hệ thống");
    }
  } catch (error) {
    toast.error("Lỗi hệ thống");
  } finally {
    if(setPageLoading){
      setPageLoading(false);
    }
  }
};

export const convertArray = (arr: string[]) => {
  let result = [];
  if (arr?.length > 0) {
    for (let item of arr) {
      let obj: any = {
        name: item,
        code: item,
      };
      result.push(obj);
    }
  }
  return result;
};

export const breakStringIntoLines = (input: any) => {
  let splitInput = input?.toString()?.split(" ");
  splitInput?.forEach((item, indexItem) => {
    let result = [];
    if (item?.length > LETTER_PER_LINE) {
      for (let i = 0; i < item?.length; i += LETTER_PER_LINE) {
        let chuoiCon = item?.slice(i, i + LETTER_PER_LINE);
        result.push(chuoiCon);
        splitInput[indexItem] = result?.join("\n");
      }
    }
  });
  return splitInput?.join(" ");
};

export const hasAuthority = (permission: string, ability: string, type?: string): boolean => {
  const authoritiesString = localStorage.getItem("authorities");
  const authorities = authoritiesString ? JSON.parse(authoritiesString) : {};
  const permissionAndAbility = type === TYPE?.MODULE ? `${permission}_${ability}` : `${permission}.${ability}`;
  return authorities[permissionAndAbility];
};

export const hasRole = (permission): boolean => {
  const authorities = localStorageItem.get("authorities") || {};
  return authorities[permission];
};

export const checkInvalidDate = (date: any) => {
  const newDate = new Date(date);
  if (1900 > newDate.getFullYear() || newDate.getFullYear() > 9999) {
    return true;
  }
  return isNaN(Date.parse(newDate));
};

export const handleBlurDate = (setFieldValue, date, name) => {
  if (checkInvalidDate(date)) {
    setFieldValue(name, "");
    return;
  }
}

export const checkObject = (obj: any) => {
  return Object.keys(obj ? obj : {}).length === 0;
};

export const formatDateTable = (date) => {
  const newDate = new Date(date)
  return date ? moment(newDate).format("DD/MM/YYYY") : null;
};

export const convertSearch = (data: any[]) => {
  let dataSearch: any = {}
  data.forEach((item: IItemSearch) => {
    if(typeof item.value === TYPE.OBJECT){
      if(!item.value?.id){
        dataSearch[item?.field] = item.value?.code;
      }else{
        dataSearch[item?.field] = item.value?.id;
      }
    }else{
      dataSearch[item.field] = item.value || null
    }
  })
  return dataSearch;
}

export const numberExceptThisSymbols = (event: any) => {
  return NUMBER_EXCEPT_THIS_SYMBOLS.includes(event?.key) && event.preventDefault()
}

export const justAllowNumber = (event: any) => {
  return JUST_ALLOW_NUMBER.includes(event?.key) && event.preventDefault();
}

export const removeDiacritics = (str: string) => {
  return str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''): "";
}

export const formatDateTime = (date) => {
  const newDate = new Date(date)
  return date ? moment(newDate).format("YYYY-MM-DD") : null;
};

export const checkMenuByPermissions = (): TMenu[] => {
  const checkedMenu: TMenu[] = [];
  allMenu.forEach((menu) => {
    const filteredSubMenu: TSubMenu[] = [];
    if (hasAuthority(menu.permission, menu.ability, TYPE.MODULE)) {
      menu.subMenu.forEach((subMenu) => {
        if (hasAuthority(subMenu.permission, subMenu.ability)) {
          filteredSubMenu.push(subMenu);
        }
      });
      const checkedMenuItems: TMenu = {
        ...menu,
        subMenu: filteredSubMenu,
      };
      checkedMenu.push(checkedMenuItems);
    }
  });
  return checkedMenu;
};

export const convertTextPrice = (value: string) => {
  return String(value).replace(/\D/g, '');
}

export const convertNumberPrice = (value: number | string | null) => {
  const valueNumber = String(value).replace(/\D/g, '');
  const number = Number(valueNumber ? valueNumber : 0);
  const plainNumber = number.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const valuePrice = plainNumber.substr(0, plainNumber.length - 2)
  return valuePrice !== "0" ? valuePrice : "";
};

export const addMoreYear = (currentDate: string | null, quality: number) => {
  if (!currentDate) return "";
  let currentDateObj = new Date(currentDate);
  currentDateObj.setFullYear(currentDateObj.getFullYear() + quality);
  currentDateObj.setDate(currentDateObj.getDate() - 1);
  let newYear = currentDateObj.getFullYear();
  let newMonth = currentDateObj.getMonth() + 1;
  let newDay = currentDateObj.getDate();

  return `${newYear}-${String(newMonth).padStart(2, "0")}-${String(newDay).padStart(2, "0")}`;
};

export const addMoreMonth = (currentDateString: string, quality: number) => {
  if (!currentDateString) return "";
  var currentDate = new Date(currentDateString);
  currentDate.setMonth(currentDate.getMonth() + quality);
  currentDate.setDate(currentDate.getDate() - 1);

  let newYear = currentDate.getFullYear();
  let newMonth = currentDate.getMonth() + 1;
  let newDay = currentDate.getDate();

  return `${newYear}-${String(newMonth).padStart(2, "0")}-${String(newDay).padStart(2, "0")}`;
};

export const addMoreDay = (currentDate: string, quality: number) => {
  if (!currentDate) return "";
  let newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + quality);
  
  let newYear = newDate.getFullYear();
  let newMonth = newDate.getMonth() + 1;
  let newDay = newDate.getDate();

  return `${newYear}-${String(newMonth).padStart(2, "0")}-${String(newDay).padStart(2, "0")}`;
};

export const getFullYear: (firstYear?: number, lastYear?: number) => OptionReactSelect[] = (
  firstYear = 100,
  lastYear = 100
) => {
  const currentYear = new Date().getFullYear();
  const endYear = currentYear + lastYear;
  const startYear = currentYear - firstYear;

  return Array.from({ length: endYear - startYear + 1 }, (_, index) => ({
    code: (index + 1).toString(),
    name: String(startYear + index)
  }));
}
//Kiểm tra độ sâu của mảng (arr là mảng trong mảng, không hỗ trợ mảng trong object)
export const countArrayDeep = (arr: any[]): number => {
  if (!Array.isArray(arr)) return 0;

  let maxDeep = 1;

  arr.forEach(item => {
    if (Array.isArray(item)) {
      const deep = 1 + countArrayDeep(item);
      maxDeep = Math.max(maxDeep, deep);
    }
  })

  return maxDeep;
}

//Tách các phần tử của mảng theo độ sâu của mảng
export const extractElementsByDepth = (array: any[], level: number = 0, target: any[] = []) => {
  array.forEach((element) => {
    if (Array.isArray(element)) {
      extractElementsByDepth(element, level + 1, target);
    } else {
      target[level] ? target[level].push(element) : (target[level] = [element]);
    }
  });

  return target;
};

//Chuyển đổi số Integer sang số la mã
export const romanize = (num: number): string => {
  if (isNaN(num)) return "NaN";
  let digits = String(+num).split("");
  const  key: string[] = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
      "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
      "","I","II","III","IV","V","VI","VII","VIII","IX"
    ];
  let roman = "";
  let i = 3;
  while (i--) roman = (key[+digits.pop()! + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}; 

// Lấy quý hiện tại
export const getCurrentQuarter = () => {
  return Math.floor(new Date().getMonth() / 3) + 1;
};

// Tạo ID ngẫu nhiên với độ dài cho trước
export const generateRandomId = function() {
  return uuidv4();
};

const handleResize = debounce((entries) => {
  entries.forEach(({ target } : any) => {
    const instance = echarts.getInstanceByDom(target as HTMLElement);
    if (instance) {
      instance.resize();
    }
  });
}, 100);

export const resizeObserver = new window.ResizeObserver(handleResize);

export const searchDataRoleUser = (searchData: object) => {
  let employeeId = localStorageItem.get(headerConstant.ACCOUNT_EMPLOYEE_ID);
  return {...searchData, employeeId: employeeId || null}
}

export const checkStatus = (listStatus: any[], code: any) => {
  let itemFinded = listStatus ? listStatus.find((item: any) => item?.code === code) : null;
  return itemFinded?.styleClass || "";
};