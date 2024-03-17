import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { formatDateTable, removeDiacritics } from "../utils/FunctionUtils";
import { TYPE } from "../utils/Constant";
import "./style.scss"

function TextUnderline(props: any) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineHeight, setLineHeight] = useState<number>(0);
  const [value, setValue] = useState<string>("")
  const [label, setLabel] = useState<string>(props?.label ? props?.label + ": " : "")
  const [labelWidth, setLabelWidth] = useState<string>("");
  const [rows, setRows] = useState<number>(props?.rows || 1);
  const defautlValueDate = "       /       /";

  useEffect(() => {
    if (props.type === TYPE.DATE && !props.value) {
      setValue(label + defautlValueDate)
      return;
    }

    if (props.type === TYPE.DATE && props.value) {
      setValue(label + formatDateTable(props?.value))
      return;
    }

    const newValue = (props.value && typeof props.value === TYPE.OBJECT) ? (props?.value?.name || props?.value?.code) : props?.value || "";
    setValue(label + newValue)
  }, [props.type, props.value]);


  useEffect(() => {
    if (textareaRef?.current) {
      const computedStyle = window.getComputedStyle(textareaRef.current);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const paddingTop = parseFloat(computedStyle.paddingTop);
      const paddingBottom = parseFloat(computedStyle.paddingBottom);
      const height = textareaRef.current.scrollHeight;
      setLineHeight(lineHeight);
      const newRows = Math.ceil((height - paddingTop - paddingBottom) / lineHeight);
      if (newRows !== rows) setRows(newRows)
    }
  }, [value]);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value || "")
  };

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context && textareaRef.current && label) {
      context.font = window.getComputedStyle(textareaRef.current).font;
      const textWidth = context.measureText(label).width;
      setLabelWidth(`${Math.ceil(textWidth) + 5}px`);
    }
  }, [label]);

  useEffect(() => {
    if (removeDiacritics(label) === removeDiacritics(value)) {
      setValue(label);
    }
  }, [label, value]);

  return (
    <div className={`${props.className} text-underline`}>
      <Form.Control
        as="textarea"
        className="value"
        onChange={handleTextareaChange}
        ref={textareaRef}
        value={value}
        rows={rows}
        readOnly={(props.type === TYPE.DATE && !props.value) || props?.readOnly}
      />
      {
        Array.from({ length: rows }, (_, index) => {
          return <div
            key={index}
            className={`underline`
            }
            style={{
              top: `calc(${(lineHeight) * index}px + ${lineHeight}px)`,
              left: `${index === 0 ? labelWidth : "0"}`,
              width: index === 0 ? `calc(100% - ${labelWidth})` : "100%"
            }}
          ></div>
        })
      }
    </div >
  );
}

export default TextUnderline;