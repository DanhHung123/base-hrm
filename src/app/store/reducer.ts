import { SET_MENU_LIST } from "./constant";

const initState = {
    listItem: [],
}

function reducer(state: any, action: any) {
    switch (action?.type) {
        case SET_MENU_LIST:
            return {
                ...state, 
                listItem: action?.payload
            }
        default:
            return state;
    }
};

export { initState };
export default reducer;