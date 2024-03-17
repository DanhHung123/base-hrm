import clsx from "clsx";
import { FC } from "react";
import "../table.scss";
import { breakStringIntoLines } from './../../../utils/FunctionUtils';
type Props = {
  data: any;
  id?: string;
  action?: boolean;
  textAlign?: string;
};

const TableCustomCell: FC<Props> = ({ data, action, textAlign = "start" }) => {
  return (
    <div
      className={clsx(`text-${textAlign} text-black cursor-pointer fs-6 fw-normal `, {
        "action-cell fw-bold": action,
      })}
    >
      {breakStringIntoLines(data)}
    </div>
  );
};

export { TableCustomCell };
