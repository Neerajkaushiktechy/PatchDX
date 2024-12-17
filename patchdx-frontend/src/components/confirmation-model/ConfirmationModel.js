
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { RiAlarmFill } from "react-icons/ri";

const ConfirmationModel = ({ openModal, setOpenModal,message,handleOk }) => {

    return (
        <>
            <Modal show={openModal} size="md" onClose={() => setOpenModal()} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <RiAlarmFill className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {message}
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button className="btn-theme" onClick={handleOk}>
                                {"OK"}
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ConfirmationModel;