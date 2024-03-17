import React from "react";
import { TYPE } from "../utils/Constant";
import { formatDateTable } from "../utils/FunctionUtils";

function TextValue(props: any) {
  const style = {
    root: {
      display: "flex",
      gap: "4px",
      width: "100%"
    },

    value: {
      display: "flex",
      alignItems: "flex-end",
      width: "100%",
      margin: 0,
      fontWeight: 'bold',
      borderBottom: "1px dotted black",
      lineHeight: "calc(100% - 2px)",
    },

    label: {
      margin: 0,
      marginBottom: "-6px",
    }
  }

  return (
    <div style={style.root} className={`text-value ${props.className}`}>
      <p style={{ ...style.label, ...props?.styleLabel }}>
        {props?.label ? props?.label + ":" : ""}{' '}
      </p>
      {
        (props.type === TYPE.DATE && !props.value) ?
          <div className="flex flex-1">
            <p style={{ ...style.value }} className="spaces w-40"></p>
            <p className="unti-icon">/</p>
            <p style={{ ...style.value }} className="spaces w-40"></p>
            <p className="unti-icon">/</p>
            <p style={{ ...style.value }} className="flex-1"></p>
          </div> : <p
            style={{ ...style.value }}
            className="flex-1"
          >
            {props.type === TYPE.DATE ? formatDateTable(props?.value) : (typeof props.value === TYPE.OBJECT ? (props?.value?.name || props?.value?.code) : props.value)}
          </p>
      }
    </div >
  );
}

export default TextValue;
