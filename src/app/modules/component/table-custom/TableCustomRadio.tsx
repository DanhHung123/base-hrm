//@ts-nocheck
import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Column, useRowSelect, useTable } from "react-table";
import { KTCardBody } from "../../../../_metronic/helpers";
import { TableCustomHeaderColumn } from "./columns/TableCustomHeaderColumn";
import "../../styles/index.scss";
import PaginationCustom from "./../pagination-custom/Pagination";
import { TableCustomToolbar } from "./columns/TableToolbar";
interface tableProps<T extends object> {
  handleSearchByPage?: (...params: any) => Promise<AxiosResponse<APIResponse>>;
  columns: ReadonlyArray<Column<T>>;
  handleClick?: (param) => void;
}

function TableCustomRadio<T extends object>(props: tableProps<T>) {
  const intl = useIntl();
  const { columns, handleClick, handleSearchByPage } = props;
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dataToSelect, setDataToSelectToSelect] = useState([]);
  const [searchObject, setSearchObject] = useState({
    keyword: "",
    pageIndex: pageIndex,
    pageSize: pageSize,
  });
  const [shouldOpenFilterSearch, setShouldOpenFilterSearch] = useState(false);

  const handleCheckBox = () => {
    toggleAllRowsSelected(false);
    toggleRowSelected(row?.id, !currentState.checked);
    setSelectedRow(row);
  }

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable(
    {
      columns,
      data: dataToSelect,
    },
    useRowSelect,
    (hooks) => {
      hooks?.visibleColumns?.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({}) => {
              return <div></div>;
            },
            Cell: ({ row, toggleAllRowsSelected, toggleRowSelected }) => {
              const currentState = row?.getToggleRowSelectedProps();
              return (
                <div>
                  <input
                    type="radio"
                    onClick={() => handleCheckBox()}
                  />
                </div>
              );
            },
          },
          ...columns,
        ];
      });
    }
  );

  const getListDataToSelect = async (): any => {
    try {
      const data = await handleSearchByPage(searchObject);
      setDataToSelectToSelect(data?.data?.data?.content || []);
      setTotalPage(data?.data?.data?.totalPages);
    } catch (err) {
      toast.error(err);
    }
  };

  const changePageIndex = (newPage: number) => {
    setPageIndex(newPage);
  };

  const changePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPageIndex(1);
  };

  const handleUpdateSearchObject = (value: any) => {
    setSearchObject({ ...searchObject, ...value });
  };

  useEffect(() => {
    handleClick(selectedRow?.original);
  }, [selectedRow]);

  useEffect(() => {
    setSearchObject({ ...searchObject, pageSize: pageSize, pageIndex: pageIndex });
  }, [pageSize, pageIndex]);

  useEffect(() => {
    getListDataToSelect();
  }, [searchObject]);

  return (
    <KTCardBody className="prevent-focus">
      <TableCustomToolbar
        allColumns={columns}
        justFilter={true}
        setShouldOpenFilterSearch={setShouldOpenFilterSearch}
        shouldOpenFilterSearch={shouldOpenFilterSearch}
      />
      <div className="table-responsive table-dialog">
        <table
          id="kt_table_users"
          className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer overflow-hidden "
          {...getTableProps()}
        >
          <thead>
            {headerGroups?.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="text-muted fw-bolder fs-7 text-uppercase gs-0 border bg-pri"
              >
                {headerGroup?.headers?.map((column) => {
                  if (column?.fixed) {
                    return (
                      <TableCustomHeaderColumn<T>
                        key={column?.id}
                        column={column}
                        shouldOpenFilterSearch={shouldOpenFilterSearch}
                        handleUpdateSearchObject={handleUpdateSearchObject}
                      />
                    );
                  }
                  if (!column?.fixed) {
                    return (
                      <TableCustomHeaderColumn<T>
                        key={column?.id}
                        column={column}
                        shouldOpenFilterSearch={shouldOpenFilterSearch}
                        handleUpdateSearchObject={handleUpdateSearchObject}
                      />
                    );
                  }
                })}
              </tr>
            ))}
          </thead>
          <tbody className="text-gray-600 fw-bold bg-white border " {...getTableBodyProps()}>
            {rows?.length > 0 ? (
              rows?.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    className={clsx({
                      "selected-row": row?.id === selectedRow?.id,
                    })}
                    {...row.getRowProps()}
                  >
                    {row?.cells?.map((cell, index: number) => {
                      if (row?.cells[index]?.column?.fixed) {
                        return (
                          <td {...cell.getCellProps()} className="p-0">
                            {cell.render("Cell") as ReactNode}
                          </td>
                        );
                      }
                      if (!row?.cells[index]?.column?.fixed) {
                        return (
                          <td onClick={() => {}} {...cell.getCellProps()} className="p-4">
                            {cell.render("Cell") as ReactNode}
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={10}>
                  <div className="d-flex text-center w-100 align-content-center justify-content-center">
                    {intl.formatMessage({ id: "TABLE.DATA.EMPTY" })}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PaginationCustom
        pageIndex={pageIndex}
        totalPage={totalPage}
        pageSize={pageSize}
        changePage={changePageIndex}
        changePerPage={changePageSize}
      />
    </KTCardBody>
  );
}

export { TableCustomRadio };
