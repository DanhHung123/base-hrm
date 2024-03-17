import { useIntl } from "react-intl";
import "./style.scss";
import { useEffect, useState } from "react";
import { downLoadFileById, fileUpload } from "../../utils/FileServices";
import { toast } from "react-toastify";
import { actualFileType } from "./constant";
import clsx from "clsx";
// import { IFile } from "../../profile/models/DialogModels";
import CustomTooltip from "../CustomTooltip";
import useMultiLanguage from "../../../hook/useMultiLanguage";

export interface IFile {
  id: string;
  name: string;
}

type IProps = {
  label: string; 
  required?: boolean;
  setValue: (data: IFile) => void;
  fileValue: IFile;
  allowFileTypes: string;
  errors?: string;
  isReadOnly?: boolean;
};

function UploadFile(props: IProps) {
  const { label, required, setValue, fileValue, errors, allowFileTypes, isReadOnly } = props;
  const { lang } = useMultiLanguage();
  const [selectedFile, setSelectedFile] = useState<IFile>({} as IFile);
  const allowedFileTypes = allowFileTypes.split(",").map((type) => type.trim());

  useEffect(() => {
    setSelectedFile(fileValue);
  }, [fileValue])

  const onChange = async (e: any) => {
    let file = e.target.files[0];
    if(file) {
      const isValidMaxSize = file.size > 10048576;
      const isValidFileType = actualFileType.find((item) => allowedFileTypes.includes(item.id) && item.value === file.type);
      if (!isValidFileType) {
        toast.error(lang("TOAST.ERROR.FORMAT.FILE"));
        return;
      }
      if (isValidMaxSize) {
        toast.error(lang("TOAST.ERROR.LARGE.FILE"))
        return;
      }
      try {
        const { data: { data }} = await fileUpload(file);
        const fileObject : IFile = {
          id: data?.id,
          name: data?.name
        };
        setSelectedFile(fileObject);
        setValue(fileObject);
      } catch (error) {
        toast.error(lang("GENERAL.ERROR"));
      }
    }
  };
  const handleDownLoadFile = async (file: IFile) => {
    try {
      const res = await downLoadFileById(file.id);
      const url = window.URL.createObjectURL(new Blob([res?.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${file.name}`);
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
        {required && <span className="color-red"> *</span>}
      </div>
      <div className={clsx(
        "custom-file-upload gap-2",
        { "form-control is-invalid": errors },
        { "disabled": isReadOnly }
      )}>
        <CustomTooltip
          title={lang("SELECT.FILE")}
          placement="auto"
          className={clsx(
            { "hidden": isReadOnly }
          )}
        >
          <label 
            className={clsx("flex flex-middle flex-shrink-1 flex-grow-0 overflow-hidden",
              { "cursor-pointer": !isReadOnly }
            )}
          >
            <input type="file" onChange={onChange} accept={allowFileTypes} readOnly={isReadOnly} disabled={isReadOnly} />
            <div className="icon-upload-file">
              <i className="fa fa-cloud-upload text-primary me-1" />
            </div>
            <span className="file-preview">
              {selectedFile?.name || ""}
            </span>
          </label>
        </CustomTooltip>
        <CustomTooltip
          title={lang("DOWNLOAD.FILE")}
          placement="right"
          className={clsx(
            { "hidden": isReadOnly || !selectedFile.id }
          )}
        >
          <div
            className={clsx(
              "bi bi-download",
              { "cursor-pointer": !isReadOnly && selectedFile.id}
            )}
            onClick={() => !isReadOnly && selectedFile.id && handleDownLoadFile(selectedFile)}
          ></div>
        </CustomTooltip>
      </div>
      {errors && <div className='invalid-feedback'>{errors}</div>
      }
    </>
  );
}

export default UploadFile;
