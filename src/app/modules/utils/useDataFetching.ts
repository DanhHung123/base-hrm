// useDataFetching.js
import { useState, useEffect } from "react";
import { OptionReactSelect } from "../models/models";

const useDataFetching = (handleFetching: Function, params?:any) => {
  const [data, setData] = useState<OptionReactSelect[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await handleFetching(params);
      response && setData(response.data.data.content);
    };
    fetchData();
  }, []);

  return data;
};

export default useDataFetching;
