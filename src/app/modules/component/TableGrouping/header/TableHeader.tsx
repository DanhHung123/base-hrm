import { useEffect, useState } from "react";
import { countArrayDeep, extractElementsByDepth } from "../../../utils/FunctionUtils";
import { IColumns } from "../TableGrouping";
import { bringChildToParrent, filterChild } from "../utils/util";

interface Iprops {
  columns: IColumns[];
  tableId: string;
  data: any[];
}

function TableHeader(props: Iprops) {
  const { columns, tableId, data } = props;

  const [rowHeader, setRowHeader] = useState<IColumns[][]>([]);

  useEffect(() => {
    setRowHeader(extractElementsByDepth(bringChildToParrent(columns)));
  }, [columns]);

  const calculateColSpan = (column: IColumns) => {
    return column?.child ? filterChild(column.child).flat(Infinity).length : 1;
  };

  const calculateRowSpan = (column: IColumns, level: number) => {
    let maxRowSpan = countArrayDeep(filterChild(columns));
    return column?.child ? 1 : maxRowSpan - level;
  };

  useEffect(() => {
    handleRenderStickyColumns();
  },[columns, tableId, data]);

  const handleRenderStickyColumns = () => {
    let stickyColumns = document.querySelectorAll(`.column-header-group-sticky-${tableId}`);

    Array.from(stickyColumns).reduce((acc: number, col: Element) => {
      let colElement = col as HTMLElement;
      colElement.style.left = acc + "px";
      return acc + colElement.offsetWidth;
    }, 0);
  };

  return (
    <thead className="position-sticky top-0 z-index-3">
      {rowHeader?.map((row, index) => {
        return (
          <tr className="text-header-table fw-600 fw-bolder text-capitalize-first gs-0 border" key={index}>
            {row?.map((col, idx) => (
              <th
                key={col.field + idx}
                className={`p-table text-center bg-header-table ${
                  col.isSticky ? `column-header-group-sticky-${tableId} sticky-column` : ""
                }`}
                style={col.headerStyle}
                rowSpan={calculateRowSpan(col, index)}
                colSpan={calculateColSpan(col)}
              >
                {col.name}
              </th>
            ))}
          </tr>
        );
      })}
    </thead>
  );
}

export default TableHeader;
