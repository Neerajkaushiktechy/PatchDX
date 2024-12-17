
import { Modal } from 'flowbite-react';

export default function ModalPopup({ childern, show, setshow, type, clearErrorMessage, handleClearState, seteditCustomForm }) {

    const handleClose = () => {
        setshow(false);
        if (handleClearState !== undefined) {
            handleClearState();
        }
        if (seteditCustomForm != undefined) {
            seteditCustomForm()
        }
    }

    return (
        <Modal show={show} size="md" onClose={() => { type === "assignment" ? handleClose() : clearErrorMessage !== undefined && clearErrorMessage() }} className="modal-popup">
            <Modal.Body className="modal-body">
                {childern}
            </Modal.Body>
        </Modal>
    );
}
