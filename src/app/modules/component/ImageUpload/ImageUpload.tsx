import { ChangeEvent, useState } from "react";
import { Col, Form, Image, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import { imageUpload } from "../../utils/FileServices";
import { toast } from "react-toastify";
type IProps = {
  view: boolean;
  url: string;
  handleUploadAvatar: (url: string) => void;
  allowFileTypes?: string;
};
function ImageUpload(props: IProps) {
  const { view, handleUploadAvatar, url, allowFileTypes } = props;
  const intl = useIntl();
  const [imageURL, setImageURL] = useState<string>(url);
  const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files) {
      const src = URL.createObjectURL(event.target.files[0]);
      setImageURL(src);
      let files = event.target.files[0];
      try {
        const data = await imageUpload(files);
        handleUploadAvatar(data?.data?.data?.filePath);
      } catch (error) {
        toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
      }
    }
  };
  return (
    <>
      <Col xs>
        <Row className="justify-content-center">
          <label className="cursor-pointer image-upload">
            <Image src={imageURL || "/media/avatars/blank.png"} fluid />
            <Form.Control
              disabled={view}
              type="file"
              size="sm"
              id="select-file-inp"
              className="d-none"
              onChange={handleChangeImage}
              accept={allowFileTypes}
            />
            {!view && <i className="bi bi-camera icon-image-upload text-white fs-1"></i>}
          </label>
        </Row>
      </Col>
    </>
  );
}

export default ImageUpload;
