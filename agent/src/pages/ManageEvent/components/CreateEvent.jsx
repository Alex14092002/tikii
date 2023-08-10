import React, { useState } from 'react';
import ModalEvent from './ModalEvent';

function CreateEvent() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div
                onClick={() => setOpen(true)}
                className="border-[1px] border-[#7367f0] px-2 py-1 rounded-md hover:bg-[#7367f0] duration-100 cursor-pointer select-none"
            >
                <span className="font-semibold text-white ">+ Tạo sự kiện mới</span>
            </div>
            <ModalEvent open={open} setOpen={setOpen} type="create" />
        </>
    );
}

export default CreateEvent;
