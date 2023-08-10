import React from 'react';
import ModalRef from './ModalRef';

function CreateRef() {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <div
                onClick={() => setShowModal(true)}
                className="border-[1px] border-[#7367f0] px-2 py-1 rounded-md hover:bg-[#7367f0] duration-100 cursor-pointer select-none"
            >
                <span className="font-semibold text-white ">+ Tạo mã mời</span>
            </div>

            <ModalRef open={showModal} setOpen={setShowModal} title="Tạo mã mời" />
        </>
    );
}

export default CreateRef;
