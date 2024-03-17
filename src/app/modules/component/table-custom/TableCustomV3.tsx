//@ts-nocheck
import clsx from "clsx";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Column, useRowSelect, useTable } from "react-table";
import { KTCardBody } from "../../../../_metronic/helpers";
import "../../styles/index.scss";
import { balanceElements } from "../../utils/FunctionUtils";
import PaginationCustom from "./../pagination-custom/Pagination";
import { TableCustomHeaderColumn } from "./columns/TableCustomHeaderColumn";
import { TableCustomToolbar } from "./columns/TableToolbar";
interface tableProps<T extends object> {
  data: T[];
  columns: ReadonlyArray<Column<T>>;
  compact: boolean;
  handleOpenInfoDialog?: (row: any) => void;
  handleDelete: (selected: any) => void;
  shouldUnSelectedRows?: () => boolean;
  totalPage?: number;
  noPagination?: boolean;
  noToolbar?: boolean;
}
function TableCustomV3<T extends object>(props: tableProps<T>) {
  const {
    data,
    columns,
    compact,
    handleOpenInfoDialog,
    handleDelete,
    totalPage,
    noPagination,
    noToolbar,
  } = props;
  const [shouldOpenFilterSearch, setShouldOpenFilterSearch] = useState<boolean>(false);
  const intl = useIntl();
  const [searchObject, setSearchObject] = useState({});
  const handleUpdateSearchObject = (value: any) => {
    setSearchObject({
      ...searchObject,
      ...value,
    });
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    allColumns,
    rows,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: data,
    },
    useRowSelect,
    (hooks) => {
      if (!compact)
        hooks.allColumns.push((columns) => [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => {
              let allProps = getToggleAllRowsSelectedProps();
              allProps.indeterminate = "false";
              return (
                <th>
                  <input className="check-box-row" type="checkbox" {...allProps} />
                </th>
              );
            },
            Cell: ({ row }) => {
              let rowProps = row.getToggleRowSelectedProps();
              rowProps.indeterminate = "false";
              return (
                <div>
                  <input type="checkbox" className="check-box-row" {...rowProps} />
                </div>
              );
            },
            fixed: true,
          },
          ...columns,
        ]);
    }
  );
  const handleUnSelectedRows = useCallback(() => {
    rows?.map((row) => {
      if (row?.isSelected) row?.toggleRowSelected();
      return row;
    });
  }, [rows]);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const changePage = (newPage: number) => {
    setPage(newPage);
  };
  const changePerPage = (newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(1);
  };
  useEffect(() => {
    balanceElements("table-1", "table-2");
  }, [data]);
  return (
    <KTCardBody className="table-custom">
      {!compact && (
        <TableCustomToolbar
          handleUnSelectedRows={handleUnSelectedRows}
          selectedRows={selectedFlatRows}
          allColumns={allColumns}
          setShouldOpenFilterSearch={setShouldOpenFilterSearch}
          shouldOpenFilterSearch={shouldOpenFilterSearch}
          handleDelete={() => {
            handleDelete(selectedFlatRows);
          }}
          noToolbar={noToolbar}
        />
      )}
      <div className="group-table ">
        <div>
          <table
            id="kt_table_users"
            className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer overflow-hidden table-1"
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
                          changePage={changePage}
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
            <tbody className="text-gray-600 fw-bold bg-white  border " {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows?.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr
                      className={clsx({
                        "selected-row": row.isSelected,
                      })}
                      {...row.getRowProps()}
                    >
                      {row?.cells?.map((cell, index: number) => {
                        if (row.cells[index].column.fixed) {
                          return (
                            <td
                              onClick={() => {
                                if (index && handleOpenInfoDialog) handleOpenInfoDialog(row);
                              }}
                              {...cell.getCellProps()}
                              className="p-4"
                            >
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
                  <td colSpan={10}></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="table-responsive">
          <table
            id="kt_table_users"
            className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer overflow-hidden table-2"
            {...getTableProps()}
          >
            <thead>
              {headerGroups?.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="text-muted fw-bolder fs-7 text-uppercase gs-0 border bg-pri"
                >
                  {headerGroup?.headers?.map((column) => {
                    if (!column.fixed) {
                      return (
                        <TableCustomHeaderColumn<T>
                          changePage={changePage}
                          key={column.id}
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
            <tbody className="text-gray-600 fw-bold bg-white  border " {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows?.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr
                      className={clsx({
                        "selected-row": row.isSelected,
                      })}
                      {...row.getRowProps()}
                    >
                      {row?.cells?.map((cell, index: number) => {
                        if (!row.cells[index].column.fixed) {
                          return (
                            <td
                              onClick={() => {
                                if (index && handleOpenInfoDialog) handleOpenInfoDialog(row);
                              }}
                              {...cell.getCellProps()}
                              className="p-4"
                            >
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
      </div>

      {!noPagination && (
        <PaginationCustom
          pageIndex={page}
          totalPage={totalPage}
          pageSize={perPage}
          changePage={changePage}
          changePerPage={changePerPage}
          handleUpdateSearchObject={handleUpdateSearchObject}
        />
      )}
    </KTCardBody>
  );
}

export { TableCustomV3 };
