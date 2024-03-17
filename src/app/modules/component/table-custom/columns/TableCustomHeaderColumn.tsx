//@ts-nocheck
import { ChangeEvent, ReactNode, useState } from "react";
import { ConstantList } from "../../../../Constant";
type Props<T extends object> = {
  column: ExtendedColumnInstance<T>;
  shouldOpenFilterSearch: boolean;
  handleUpdateSearchObject?: (params: any) => void;
  changePage?: (params: any) => void;
};
const TableCustomHeaderColumn = <T extends object>({
  column,
  shouldOpenFilterSearch,
  handleUpdateSearchObject,
  changePage
}: Props<T>) => {

  const [searchObject, setSearchObject] = useState({});
  const handleChangeValueInput = (event: ChangeEvent<HTMLInputElement>, column: string): { [key: string | number]: string | number } => {
    const updatedSearchObject = { ...searchObject, [event?.target?.name]: event?.target?.value || null };
    setSearchObject(updatedSearchObject);
    return updatedSearchObject;
  };

  return column?.id === "selection" ? (
    <>{column.render("Header") as ReactNode}</>
  ) : (
    <th className="bg-pri">
      <div className="table-header p-1">
        <div>{column.render("Header") as ReactNode}</div>
        {shouldOpenFilterSearch && column?.field !== "" && (
          <input
            onChange={(event) => {
              handleChangeValueInput(event);
            }}
            onKeyDown={(event) => {
              if (event?.key === ConstantList?.ENTER_KEY && handleUpdateSearchObject) {
                if (changePage) {
                  changePage(1);
                }
                handleUpdateSearchObject({ ...searchObject, pageIndex: 1 });
              }
            }}
            name={column?.field}
            className=" input-search form-control mt-2"
          />
        )}
      </div>
    </th>
  );
};
export { TableCustomHeaderColumn };
