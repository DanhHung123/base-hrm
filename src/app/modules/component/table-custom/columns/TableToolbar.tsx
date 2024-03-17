import clsx from "clsx";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import { ChangeColumnDialog } from "./ChangeColumnDialog";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";
interface TableCustomToolbarProps {
  selectedRows: any;
  allColumns: any;
  data?: {};
  handleUnSelectedRows: () => void;
  setShouldOpenFilterSearch: React.Dispatch<React.SetStateAction<boolean>>;
  shouldOpenFilterSearch: boolean;
  handleDelete: (() => void) | Function;
  justFilter?: boolean;
  noToolbar?: boolean;
}
const TableCustomToolbar = (props: TableCustomToolbarProps) => {
  const intl = useIntl();
  const {
    selectedRows,
    allColumns,
    handleUnSelectedRows,
    setShouldOpenFilterSearch,
    shouldOpenFilterSearch,
    handleDelete,
    justFilter,
    noToolbar,
  } = props;
  const [shouldOpenConfirmDeleteDialog, setShouldOpenConfirmDeleteDialog] = useState(false);
  const [shouldOpenChangeColumnDialog, setShouldOpenChangeColumnDialog] = useState<boolean>(false);
  return (
    <div className="table-toolbar rounded-top p-2">
      <Row>
        {!justFilter ? (
          <Col xs={10} className="d-flex gap-4 align-items-center">
            {selectedRows?.length > 0 && (
              <>
                <span className="ps-2">
                  {intl.formatMessage({ id: "SELECTED" })}
                  <strong className="ps-2">{selectedRows ? selectedRows?.length : 0}</strong>
                </span>
                <span
                  className="fw-bold text-warning cursor-pointer"
                  onClick={handleUnSelectedRows}
                >
                  {intl.formatMessage({ id: "UNSELECTED" })}
                </span>
                <div
                  className="delete-box cursor-pointer"
                  onClick={(e) => setShouldOpenConfirmDeleteDialog(true)}
                >
                  <i className="bi bi-trash fs-4 text-danger px-4"></i>
                  <span className="fw-bold text-danger">
                    {intl.formatMessage({ id: "DELETE" })}
                  </span>
                </div>
              </>
            )}
          </Col>
        ) : (
          <Col xs={10}></Col>
        )}
        {!noToolbar && (
          <Col xs={2} className="flex-end d-flex gap-4">
            <i
              className={clsx("bi bi-funnel toolbar-icon fs-5 text-primary", {
                "filter-open": shouldOpenFilterSearch,
              })}
              onClick={() => {
                setShouldOpenFilterSearch((prevState: boolean) => !prevState);
              }}
            ></i>
            {!justFilter && (
              <i
                className={clsx("bi bi-gear toolbar-icon fs-5 text-primary ", {
                  "filter-open": shouldOpenChangeColumnDialog,
                })}
                onClick={() => {
                  setShouldOpenChangeColumnDialog(true);
                }}
              ></i>
            )}
          </Col>
        )}
      </Row>

      {shouldOpenChangeColumnDialog && (
        <ChangeColumnDialog
          allColumns={allColumns}
          handleClose={() => {
            setShouldOpenChangeColumnDialog(false);
          }}
        />
      )}

      {shouldOpenConfirmDeleteDialog && (
        <ConfirmDialog
          show={shouldOpenConfirmDeleteDialog}
          title={intl.formatMessage({ id: "DIALOG.CONFIRM.DELETE.TITLE" })}
          message={intl.formatMessage({ id: "DIALOG.CONFIRM.DELETE.MESSAGE" })}
          yes={intl.formatMessage({ id: "BTN.CONFIRM" })}
          onYesClick={() => {
            handleDelete();
            setShouldOpenConfirmDeleteDialog(false);
          }}
          cancel={intl.formatMessage({ id: "BTN.CANCEL" })}
          onCancelClick={() => setShouldOpenConfirmDeleteDialog(false)}
        />
      )}
    </div>
  );
};

export { TableCustomToolbar };
