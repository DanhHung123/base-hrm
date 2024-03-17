import { useContext } from "react";
import Context from "./Context";

export const useContextStore = () => {
    const [state, dispatch] = useContext(Context);
    return [state, dispatch];
};