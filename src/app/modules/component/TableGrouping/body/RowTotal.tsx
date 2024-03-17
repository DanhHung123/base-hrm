import { useMemo } from "react";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import { IColumnsTotal } from "../TableGrouping";
import { convertDataToDataTotal, matchValueForType } from "../utils/util";

interface Iprops {
  data: any[];
  rowData?: any;
  columnsTotal: IColumnsTotal[];
  prefixTitleField: string;
  prefixDataField: string;
}

function RowTotal(props: Iprops) {
  const { data, rowData, columnsTotal, prefixTitleField, prefixDataField } = props;
  const { lang } = useMultiLanguage();

  const dataConvert = useMemo(() => {
    return convertDataToDataTotal(data, prefixTitleField, prefixDataField);
  }, [data, prefixDataField, prefixTitleField]);

  return (
    <tr className="border-bottom border">
      {columnsTotal.map((item, index) => {
        return item?.isTitle ? (
          <td
            key={item?.field + index}
            className="td-vertical-center bg-white total-title"
            style={item?.cellStyle}
            colSpan={item?.colSpan}
          >
            {lang("GENERAL.TOTAL") + " " + (rowData?.[prefixTitleField] || "") + " :"}
          </td>
        ) : (
          <td key={item?.field + index} className="td-vertical-center bg-white" style={item?.cellStyle}>
            {item?.render ? item?.render(dataConvert) : matchValueForType(item, dataConvert)}
          </td>
        );
      })}
    </tr>
  );
}

export default RowTotal;
