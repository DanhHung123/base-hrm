import React from "react";
import TextValue from "./TextValue";

function ListDot(props: any) {
  const { length = 0, className } = props;
  return (
    <>
      {
        Array.from({ length }, (_, index) => {
          return <TextValue key={index + 1} className={`spaces h-25 ${className}`} />
        })
      }
    </>
  );
}

export default ListDot;
