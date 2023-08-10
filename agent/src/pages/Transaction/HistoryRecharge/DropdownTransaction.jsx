import Loading from '@src/libs/Loading';
import AppAdmins from '@src/services/AppAdmins';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';

const { confirm } = Modal;

function DropdownTransaction({ order_code, status, userData, setData }) {
    const handleRecharge = async (order_code, status) => {
        Loading(true);
        await AppAdmins.ConfirmRecharge(order_code, status);
        toast(`🚀 ${status == 1 ? 'Duyệt' : 'Hủy'} đơn nạp Thành công!`, {
            position: 'top-right',
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
        Loading(false);

        const arrNew = userData.find((item) => {
            return order_code == item.order_code;
        });

        arrNew.status = status;
        const newData = userData.map((item) => {
            let newItem = item;
            if (order_code == item.order_code) {
                newItem = arrNew;
            }
            return newItem;
        });
        setData(newData);
    };

    const showConfirm = () => {
        confirm({
            centered: true,
            title: <div>Xác nhận duyệt đơn nạp?</div>,
            content: 'Mã đơn: ' + order_code,
            onOk() {
                handleRecharge(order_code, 1);
            },
        });
    };

    const showCancel = () => {
        confirm({
            centered: true,
            title: <div>Xác nhận từ chối đơn nạp?</div>,
            content: 'Mã đơn: ' + order_code,
            okType: 'danger',
            onOk() {
                handleRecharge(order_code, 2);
            },
        });
    };

    return (
        <>
            {status == 0 && (
                <div className="flex justify-around gap-3 pr-6">
                    <Tippy placement="right-end" content="Duyệt đơn" delay={[0, 70]}>
                        <div onClick={() => showConfirm()} className="text-[#28c76f]">
                            <FontAwesomeIcon className="text-lg cursor-pointer" icon={faCircleCheck} />
                        </div>
                    </Tippy>
                    <Tippy placement="right-end" content="Hủy đơn" delay={[0, 70]}>
                        <div onClick={() => showCancel()} className="text-[#EF4444]">
                            <FontAwesomeIcon className="text-lg cursor-pointer" icon={faXmark} />
                        </div>
                    </Tippy>
                </div>
            )}
        </>
    );
}

export default DropdownTransaction;
