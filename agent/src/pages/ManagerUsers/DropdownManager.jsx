import { faCartArrowDown, faCartFlatbed, faChevronDown, faEnvelopeOpen, faKey, faLock, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Dropdown, Modal, notification } from 'antd';

import ModalProfile from './ModalProfile';
import ModalPlusMoney from './ModalPlusMoney';
import ModalMinusMoney from './ModalMinusMoney';
import ModalChangePass from './ModalChangePass';
import { useNavigate } from 'react-router-dom';
import ModalStatusPay from './ModalStatusPay';
import ModalEvent from './ModalEvent';
import AppAdmins from '@src/services/AppAdmins';

function DropdownManager({ data, userData, setData }) {
    const navigate = useNavigate();
    const [openProfile, setOpenProfile] = useState(false);
    const [openPlusMoney, setOpenPlusMoney] = useState(false);
    const [openMinus, setOpenMinus] = useState(false);
    const [openChangePass, setChangePass] = useState(false);
    const [openStatusPay, setStatusPay] = useState(false);
    const [openEvent, setOpenEvent] = useState(false);


    const handleShowConfirmEmpty = (customer_id) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc chắn muốn xoá lịch sửa mua hàng này?',
            okText: 'Xác nhận',
            cancelText: 'Huỷ',
            onOk: () => {
                confirmEmpty(customer_id);
            },
            okButtonProps: {
                type: 'primary',
                danger: true,
            }
        });
    }

    const confirmEmpty = async (customer_id) => {
        const response = await AppAdmins.EmptyCard(customer_id);
        if (response && response.status === 200) {
            notification.success({
                message: response.message,
            });
        }else {
            notification.error({
                message: 'Thất bại',
                description: 'Xoá lịch sửa mua hàng thất bại',
            });
        }
        setOpenEvent(false);
    }

    const items = [
        {
            key: '1',
            label: (
                <div className="text-[#7367f0]" onClick={() => navigate('/edit-user/' + data.id)}>
                    <FontAwesomeIcon className="mr-2" icon={faPenToSquare} />
                    <span className="text-black">Sửa tài khoản</span>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className="text-[#7367f0]" onClick={() => setOpenPlusMoney(true)}>
                    <FontAwesomeIcon className="mr-2" icon={faPlus} />
                    <span className="text-black">Tặng thưởng cho người dùng</span>
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div className="text-[#7367f0]" onClick={() => setOpenMinus(true)}>
                    <FontAwesomeIcon className="mr-2" icon={faMinus} />
                    <span className="text-black">Giảm điểm người dùng</span>
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div className="text-[#7367f0]" onClick={() => setStatusPay(true)}>
                    <FontAwesomeIcon className="mr-2" icon={faLock} />
                    <span className="text-black">Khóa giao dịch</span>
                </div>
            ),
        },
        {
            key: '5',
            label: data.role != 1 && (
                <div className="text-[#7367f0]" onClick={() => setChangePass(true)}>
                    <FontAwesomeIcon className="mr-2" icon={faKey} />
                    <span className="text-black">Đổi mật khẩu</span>
                </div>
            ),
        },
        {
            key: '9',
            label:  (
                <div className="text-[#7367f0]" onClick={() => handleShowConfirmEmpty(data.id)}>
                    <FontAwesomeIcon className="mr-2" icon={faCartArrowDown} />
                    <span className="text-black">Xoá lịch sửa mua hàng</span>
                </div>
            ),
        },
    ];

    return (
        <>
            <Dropdown
                menu={{
                    items,
                }}
                placement="bottomLeft"
                arrow
            >
                <button className="bg-action">
                    <span>Thao tác</span>
                    <FontAwesomeIcon className="ml-1" icon={faChevronDown} />
                </button>
            </Dropdown>
            <ModalProfile id_user={data?.id_user} openProfile={openProfile} setOpenProfile={setOpenProfile} />
            <ModalPlusMoney
                data={data}
                openPlusMoney={openPlusMoney}
                setOpenPlusMoney={setOpenPlusMoney}
                userData={userData}
                setData={setData}
            />
            <ModalMinusMoney
                data={data}
                openMinus={openMinus}
                setOpenMinus={setOpenMinus}
                userData={userData}
                setData={setData}
            />
            <ModalStatusPay
                data={data}
                openStatusPay={openStatusPay}
                setStatusPay={setStatusPay}
                userData={userData}
                setData={setData}
            />
            <ModalChangePass data={data} openChangePass={openChangePass} setChangePass={setChangePass} />
            <ModalEvent data={data} openEvent={openEvent} setOpenEvent={setOpenEvent} />
        </>
    );
}

export default DropdownManager;
