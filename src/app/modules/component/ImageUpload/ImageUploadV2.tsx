import { ChangeEvent, useEffect, useState } from "react";
import { Form, Image } from "react-bootstrap";
import { useIntl } from "react-intl";
import { imageUpload } from "../../utils/FileServices";
import { toast } from "react-toastify";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { localStorageItem } from "../../utils/LocalStorage";
import { headerConstant } from "../../../../_metronic/layout/components/header/header-menus/constant";
import { hasRole } from "../../utils/FunctionUtils";
import { ROLE } from "../../../Constant";
type IProps = {
  view: boolean;
  url: string;
  handleUploadAvatar?: (url: string) => void | undefined;
  allowFileTypes?: string;
};
function ImageUploadV2(props: IProps) {
  const { view, handleUploadAvatar, url, allowFileTypes } = props;
  const intl = useIntl();
  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    if(!url) return;
    setImageURL(url);
  }, [url]);

  const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files) {
      const src = URL.createObjectURL(event.target.files[0]);
      setImageURL(src);
      let files = event.target.files[0];
      try {
        const data = await imageUpload(files);
        if(handleUploadAvatar) {
          handleUploadAvatar(data?.data?.data?.filePath);
          hasRole(ROLE.USER) && localStorageItem.set(headerConstant.URL_IAMGE_AVATAR, data?.data?.data?.filePath || "");
        }
      } catch (error) {
        toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
      }
    }
  };

  return (
    <label className="cursor-pointer relative rect-img-container">
      <Image src={imageURL || toAbsoluteUrl("/media/avatars/blank.png")} fluid className="rounded-circle rect-img"/>
      <Form.Control
        disabled={view}
        type="file"
        size="sm"
        id="select-file-inp"
        className="d-none"
        onChange={handleChangeImage}
        accept={allowFileTypes}
      />
      {!view && (
        <i className="bi bi-camera image-upload-icon text-white fs-1"></i>
      )}
    </label>
  );
}

export default ImageUploadV2;
