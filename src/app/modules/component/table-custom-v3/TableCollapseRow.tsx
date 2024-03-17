/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { columnNamesType } from "./TableCustom";

export interface TableRowProps {
  idTable?: string;
  row: any;
  index: number;
  rowsPerPage: number;
  page: number;
  columns: columnNamesType[];
  nameChildren?: string;
  sorting?: boolean;
  itemList?: any;
  dependencies?: string;
  stickyColumnCount: number;
  handleOpenDetailDialog?: (row: any) => void;
}

export const TableRow: FC<TableRowProps> = (props) => {
  const { idTable, dependencies, row, columns, index, rowsPerPage, page, itemList, stickyColumnCount, handleOpenDetailDialog } = props;
  const numericalOrder = (((page - 1) * rowsPerPage + index) + 1)

  useEffect(() => {
    handleRenderStickyColumns(index);
  }, [columns, index, dependencies])

  const handleRenderStickyColumns = (index: number) => {
    let stickyColumns = document.querySelectorAll(
      `.sticky-column-row-${idTable}-${index}`
    );
    let leftOffset = 0;
    stickyColumns.forEach(function (column) {
      (column as HTMLElement).style.left = leftOffset + "px";
      (column as HTMLElement).style.zIndex = "0";
      leftOffset += (column as HTMLElement).offsetWidth;
    });
  };

  return (
    <>
      {columns?.map((column: columnNamesType, idx: number) => {
        return (
          column?.render ?
            <td
              onClick={() => {
                if (column?.action && handleOpenDetailDialog) handleOpenDetailDialog(row);
              }}
              className={`td-vertical-center bg-white${idx < stickyColumnCount ? ` sticky-column-row-${idTable}-${index}` : ''}${column?.action ? " action-cell fw-bold" : ""}`}
              style={column?.cellStyle}
              key={idx}
            >
              {column.render ? column.render(row, index, numericalOrder, itemList) : row?.[column?.field]}
            </td> : <td
              onClick={() => {
                if (column?.action && handleOpenDetailDialog) handleOpenDetailDialog(row);
              }}
              className={`td-vertical-center bg-white${idx < stickyColumnCount ? ` sticky-column-row-${idTable}-${index}` : ''}${column?.action ? " action-cell fw-bold" : ""}`}
              key={idx}
              style={column?.cellStyle}
            >
              {row?.[column?.field]}
            </td>
        )
      }
      )}
    </>
  );
};