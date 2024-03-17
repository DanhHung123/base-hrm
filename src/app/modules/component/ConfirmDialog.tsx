import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCustomIntl } from '../utils/FunctionUtils';
import '../styles/index.scss'
type ConfirmDialogProps = {
  view: boolean
  onYesClick: () => void;
  onCancelClick: () => void;
  Title?: string;
  Description: string;
};
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  view,
  onYesClick,
  onCancelClick,
  Title = "Xác nhận",
  Description,
}) => {
  return (
    <Modal show={view} onHide={onCancelClick}
      size="sm"
      centered
      dialogClassName="confirm-dialog">
      <Modal.Header className="bg-danger white" closeButton>
        <Modal.Title className="bg-danger text-white">{Title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='body-normal-1 mt-5'>{Description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" className='btn-sm' onClick={onYesClick}>
          {useCustomIntl('BTN.YES')}
        </Button>
        <Button variant="secondary" className='btn-sm' onClick={onCancelClick}>
          {useCustomIntl('BTN.CANCEL')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ConfirmDialog;
