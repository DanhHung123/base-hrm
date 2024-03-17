import { useEffect, useMemo, useState } from "react";
import { IColumns, IColumnsTotal } from "../TableGrouping";
import { romanize } from "../../../utils/FunctionUtils";
import RowTotal from "./RowTotal";
import { matchValueForType } from "../utils/util";

interface IProps {
  rowData: any;
  columns: IColumns[];
  page: number;
  rowsPerPage: number;
  handleDoubleClick?: (row: any) => void;
  tableId: string;
  currentIndex: number;
  isFirstLevel?: boolean;
  prefixTitleField: string;
  prefixDataField: string;
  columnsTotal?: IColumnsTotal[];
  showTotalRow?: boolean;
  rowIndex?: number;
}

function TableBodyRow(props: IProps) {
  const {
    rowData,
    columns,
    page,
    rowsPerPage,
    handleDoubleClick,
    tableId,
    currentIndex,
    isFirstLevel = true,
    prefixDataField,
    prefixTitleField,
    columnsTotal,
    showTotalRow,
    rowIndex
  } = props;
  const [isCollapse, setIsCollapse] = useState<boolean>(false);

  const isMultilevel = useMemo(() => {
    return rowData?.[prefixTitleField] && rowData?.[prefixDataField];
  }, [rowData]);

  const isShowTotalRow = useMemo(() => {
    return (
      rowData?.[prefixDataField] && rowData?.[prefixDataField][0]?.[prefixTitleField] && columnsTotal && showTotalRow
    );
  }, [rowData, prefixDataField, prefixTitleField, columnsTotal, showTotalRow]);

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  useEffect(() => {
    if (!isMultilevel) {
      handleRenderStickyColumns();
    }
  }, [columns, tableId, rowData, currentIndex, isMultilevel]);

  const handleRenderStickyColumns = () => {
    let stickyColumns = document.querySelectorAll(`.column-cell-group-sticky-${tableId}-${rowIndex}-${currentIndex}`);

    Array.from(stickyColumns).reduce((acc: number, col: Element) => {
      let colElement = col as HTMLElement;
      colElement.style.left = acc + "px";
      return acc + colElement.offsetWidth;
    }, 0);
  };

  return (
    <>
      {isMultilevel && (
        <>
          <tr key={currentIndex} onClick={handleCollapse} className="shadow-sm bg-zinc-100">
            <td className="border spaces fw-bold" colSpan={columns?.length}>
              <div className="w-full flex flex-middle title-cell-sticky">
                <span className={`${isCollapse ? "chervon-rotate-down" : ""} flex transition-linear`}>
                  <i
                    className={`bi ${isFirstLevel ? "bi-chevron-double-right" : "bi-chevron-right"} text-header-table`}
                  ></i>
                </span>
                <span className={`spaces pl-16 ${isFirstLevel ? "text-uppercase" : ""}`}>
                  {isFirstLevel
                    ? romanize(currentIndex + 1) + " " + rowData?.[prefixTitleField]
                    : rowData?.[prefixTitleField]}
                </span>
              </div>
            </td>
          </tr>
          {isCollapse && (
            <>
              {rowData?.[prefixDataField]?.map((row: any, index: number) => (
                <TableBodyRow
                  key={index}
                  currentIndex={index}
                  columns={columns}
                  rowData={row}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handleDoubleClick={handleDoubleClick}
                  tableId={tableId}
                  isFirstLevel={false}
                  prefixDataField={prefixDataField}
                  prefixTitleField={prefixTitleField}
                  columnsTotal={columnsTotal}
                  showTotalRow={showTotalRow}
                  rowIndex={currentIndex}
                />
              ))}
              {isShowTotalRow && (
                <RowTotal
                  data={rowData?.[prefixDataField]}
                  rowData={rowData}
                  columnsTotal={columnsTotal || []}
                  prefixDataField={prefixDataField}
                  prefixTitleField={prefixTitleField}
                />
              )}
            </>
          )}
        </>
      )}

      {!isMultilevel && (
        <tr
          key={currentIndex + "single"}
          className="border-bottom border"
          onClick={() => handleDoubleClick && handleDoubleClick(rowData)}
        >
          {columns.map((cell, index) => {
            return (
              <td
                key={cell.field + index}
                className={`td-vertical-center bg-white ${
                  cell.isSticky ? `column-cell-group-sticky-${tableId}-${rowIndex}-${currentIndex} sticky-column` : ""
                }`}
                style={cell?.cellStyle}
              >
                {cell?.render && page && rowsPerPage
                  ? cell?.render(rowData, currentIndex, (page - 1) * rowsPerPage + currentIndex + 1, rowData)
                  : matchValueForType(cell, rowData)}
              </td>
            );
          })}
        </tr>
      )}
    </>
  );
}

export default TableBodyRow;
