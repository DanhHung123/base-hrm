import { ObjectMenuItem } from "../../_metronic/layout/models/LayoutModels";
import { SET_MENU_LIST } from "./constant";

export const setMenuListAction = (payload: ObjectMenuItem[]) => ({
    type: SET_MENU_LIST,
    payload
});