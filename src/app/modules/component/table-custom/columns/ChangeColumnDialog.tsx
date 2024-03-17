import { Modal, Button } from "react-bootstrap";
import { ColumnInstance } from "react-table";
import { useIntl } from "react-intl";
import '../../../styles/index.scss'
import { useEffect } from "react";
interface Iprops {
  handleClose: () => void;
  allColumns: ColumnInstance[];
}
const ChangeColumnDialog = (props: Iprops) => {
  const { handleClose, allColumns } = props;
  const hidableColumns = allColumns.filter(
    (column: ColumnInstance) => !(column.id === "selection")
  );
  const handleSetDefaultColumn = () => {
    hidableColumns.map((column: ColumnInstance) => {
      if (!column.isVisible) column.toggleHidden();
      return column
    });

  };

  const intl = useIntl();
  return (
    <>
      <Modal className="custom-modal" show={true} onHide={handleClose} centered size={"sm"}>
        <Modal.Header closeButton>
          <Modal.Title className="text-pri "> {intl.formatMessage({ id: "GENERAL.CUSTOMIZECOLUMN" })}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="fit-content">
          {hidableColumns.map((column: ColumnInstance) => (
            <div className="mb-6" key={column.id} onClick={() => {}}>
              <label className="flex-near">
                <input
                  type="checkbox"
                  className="check-box-row"
                  {...column.getToggleHiddenProps()}
                />{" "}
                {intl.formatMessage({ id: `${column.id.toUpperCase()}` })}
              </label>
            </div>
          ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            type="submit"
            className="btn btn-sm btn-outline-primary btn-active-light-primary "
            onClick={handleSetDefaultColumn}
          >
            {intl.formatMessage({ id: "BTN.DEFAULT" })}
          </Button>
          <Button
            className="btn btn-sm btn-outline btn-outline-primary btn-active-light-primary "
            onClick={handleClose}
          >
            {intl.formatMessage({ id: "BTN.SAVE" })}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ChangeColumnDialog };
