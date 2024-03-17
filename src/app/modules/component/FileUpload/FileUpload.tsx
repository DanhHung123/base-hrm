import "./style.scss";
import { useEffect, useState } from "react";
import { downLoadFile, fileUpload } from "../../utils/FileServices";
import { toast } from "react-toastify";
import { actualFileType } from "./constant";

import clsx from "clsx";
import useMultiLanguage from "../../../hook/useMultiLanguage";

type IProps = {
  label: string;
  required?: boolean;
  setFieldValue: (data: string) => void;
  fileName: string;
  allowFileTypes: string;
  errors?: string;
  isReadOnly?: boolean;
};

function FileUpload(props: IProps) {
  const { label, required, setFieldValue, fileName, errors, allowFileTypes, isReadOnly } = props;
  const { lang } = useMultiLanguage();
  const [selectedFile, setSelectedFile] = useState<any>({});
  const allowedFileTypes = allowFileTypes.split(",").map((type) => type.trim());

  useEffect(() => {
    setSelectedFile({
      name: fileName || ""
    });
  }, [fileName])

  const onChange = async (e: any) => {
    let files = e.target.files[0];
    const isValidMaxSize = files.size > 10048576
    const isValidFileType = actualFileType.find((item) => allowedFileTypes.includes(item.id) && item.value === files.type);
    if (!isValidFileType) {
      toast.error(lang("TOAST.ERROR.FORMAT.FILE"));
      return;
    }
    if (isValidMaxSize) {
      toast.error(lang("TOAST.ERROR.LARGE.FILE"))
      return;
    }
    try {
      const data = await fileUpload(files);
      await setSelectedFile(files);
      await setFieldValue(data?.data?.data?.name);
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };
  const handledownLoadFile = async (fileName: string) => {
    try {
      const res = await downLoadFile(fileName);
      const url = window.URL.createObjectURL(new Blob([res?.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  return (
    <>
      <div className="text-lable-input lable">
        <span>{lang(label)}</span>
        {required && <span style={{ color: "red" }}> *</span>}
      </div>
      <div className={clsx(
        "custom-file-upload",
        { "form-control is-invalid": errors },
        { "disabled": isReadOnly }
      )}>
        <label>
          <input type="file" onChange={onChange} accept={allowFileTypes} readOnly={isReadOnly} disabled={isReadOnly} />
          <i className="fa fa-cloud-upload text-primary me-1" />{lang("SELECT.FILE")}
          <span className="file-preview">
            {selectedFile?.name?.length < 15
              ? selectedFile?.name
              : selectedFile?.name?.slice(0, 15) + "..."}
          </span>
        </label>
        <div
          className={clsx(
            "bi bi-download",
            { "cursor-pointer": !isReadOnly && selectedFile.id}
          )}
          onClick={() => !isReadOnly && selectedFile?.name && handledownLoadFile(selectedFile?.name)}
        ></div>
      </div >
      {errors && <div className='invalid-feedback'>{errors}</div>
      }
    </>
  );
}

export default FileUpload;
