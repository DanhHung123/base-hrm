import clsx from "clsx";
import { ReactNode, useCallback, useEffect, useState, } from "react";
import { useIntl } from "react-intl";
import { Column, Row, useRowSelect, useTable } from "react-table";
import { KTCardBody } from "../../../../_metronic/helpers";
import { TableCustomHeaderColumn } from "./columns/TableCustomHeaderColumn";
import { TableCustomToolbar } from "./columns/TableToolbar";
import '../../styles/index.scss'
import { AxiosResponse } from "axios";
import { toast } from 'react-toastify';
import { APIResponse } from './../../models/models';
interface tableProps<T extends object> {
  data: T[];
  columns: ReadonlyArray<Column<T>>;
  compact: boolean;
  handleSearchByPage?: (...params: any) => Promise<void>;
  handleChangeValueInput?: (event: React.ChangeEvent<HTMLInputElement>) => {};
  handleOpenInfoDialog?: (row: any) => void;
  handleDelete?: (...params: any) => Promise<AxiosResponse<APIResponse>>;
  handleReload?: (...params: any) => Promise<void>;
  shouldUnSelectedRows?: () => boolean;
}

function TableCustom<T extends object>(props: tableProps<T>) {
  const {
    data,
    columns,
    handleSearchByPage,
    handleChangeValueInput,
    compact,
    handleOpenInfoDialog,
    handleDelete,
    handleReload,
  } = props;
  const [selectedRows, setSelectedRows] = useState<Row<T>[]>([]);
  const [shouldOpenFilterSearch, setShouldOpenFilterSearch] = useState<boolean>(false);
  const intl = useIntl();
    const handleDeleteItem = async (listDeleteID: string[]) => {
      handleDelete &&
        (await handleDelete(listDeleteID)
          .then(() => {
            toast.success(intl.formatMessage({ id: "GENERAL.DELETE_SUCCESS" }));
            handleReload && handleReload();
          })
          .catch(() => toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }))));
    };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    allColumns,
    rows,
  } = useTable(
    {
      columns,
      data: data,
    },
    useRowSelect,
    (hooks) => {
      if (!compact)
        hooks.allColumns.push((columns: any) => [
          {
            id: "selection",

            Header: ({ getToggleAllRowsSelectedProps }: any) => {
              let allProps = getToggleAllRowsSelectedProps();
              allProps.indeterminate = "false";
              return (
                <input
                  type="checkbox"
                  className="check-box-row"
                  {...allProps}
                  onClick={(e) => {
                    toggleAllRowsSelected();
                  }}
                />
              );
            },
            Cell: ({ row }: any) => {
              let rowProps = row.getToggleRowSelectedProps();
              rowProps.indeterminate = "false";
              return (
                <input
                  type="checkbox"
                  className="check-box-row"
                  {...rowProps}
                  onClick={() => {
                    toggleRowSelection(row);
                  }}
                />
              );
            },
          },
          ...columns,
        ]);
    }
  );

  const toggleRowSelection = (row: any) => {
    setSelectedRows((prevSelectedRows) => {
      if (row.isSelected) {
        return prevSelectedRows.filter((selectedRow: Row<T>) => selectedRow.id !== row.id);
      } else {
        return [...prevSelectedRows, row];
      }
    });
  };
  const toggleAllRowsSelected = () => {
    const allRowsSelected = rows.every((row: any) => row.isSelected);
    setSelectedRows(allRowsSelected ? [] : rows);
  };

  const handleUnSelectedRows = useCallback(() => {
    rows.map((row: any) => {
      if (row.isSelected) row.toggleRowSelected();
      return row
    });
    setSelectedRows([]);
  },[rows]);


  return (
    <KTCardBody className="pt-4">
      {!compact && (
        <TableCustomToolbar
          handleUnSelectedRows={handleUnSelectedRows}
          selectedRows={selectedRows}
          allColumns={allColumns}
          setShouldOpenFilterSearch={setShouldOpenFilterSearch}
          shouldOpenFilterSearch={shouldOpenFilterSearch}
          handleDelete={handleDeleteItem}
        />
      )}
      <div className="table-responsive">
        <table
          id="kt_table_users"
          className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer overflow-hidden "
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="text-muted fw-bolder fs-7 text-uppercase gs-0 border bg-pri"
              >
                {headerGroup.headers.map((column) => (
                  <TableCustomHeaderColumn<T>
                    key={column.id}
                    column={column}
                    shouldOpenFilterSearch={shouldOpenFilterSearch}
                  />
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="text-gray-600 fw-bold bg-white  border " {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: any, i) => {
                prepareRow(row);
                return (
                  <tr
                    className={clsx({
                      "selected-row": row.isSelected,
                    })}
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell: any, index: number) => {
                      return (
                        <td
                          onClick={() => {
                            if (index && handleOpenInfoDialog) handleOpenInfoDialog(row);
                          }}
                          {...cell.getCellProps()}
                          className="p-0"
                        >
                          {cell.render("Cell") as ReactNode}
                        </td>
                      );
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
    </KTCardBody>
  );
}

export { TableCustom };

