import Loading from '@src/libs/Loading';
import AppAdmins from '@src/services/AppAdmins';

import React from 'react';
import { Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { toast } from 'react-toastify';

const { confirm } = Modal;

function ModelLockAcc({ data, userData, setData }) {
    const handleStatusAccount = async (id, status) => {
        Loading(true);
        await AppAdmins.handleLockAccount({ id, status });
        toast(`🚀 ${status == 1 ? 'Mở' : 'Khóa'} tài khoản Thành công!`, {
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
            return id == item.id;
        });

        arrNew.status = status;
        const newData = userData.map((item) => {
            let newItem = item;
            if (id == item.id) {
                newItem = arrNew;
            }
            return newItem;
        });
        setData(newData);
    };

    const showConfirm = () => {
        confirm({
            centered: true,
            title: <div>Xác nhận mở tài khoản?</div>,
            content: 'Tài khoản: ' + data?.phone,
            onOk() {
                handleStatusAccount(data?.id, 1);
            },
        });
    };

    const showCancel = () => {
        confirm({
            centered: true,
            title: <div>Xác nhận khóa tài khoản?</div>,
            content: 'Tài khoản: ' + data?.phone,
            okType: 'danger',
            onOk() {
                handleStatusAccount(data?.id, 2);
            },
        });
    };

    return (
        <Tippy placement="right-end" content={data?.status == 1 ? 'khóa tài khoản' : 'Mở tài khoản'} delay={[0, 70]}>
            <p
                onClick={() => (data?.status == 1 ? showCancel() : showConfirm())}
                className="cursor-pointer text-center"
            >
                {data?.status == 1 ? (
                    <FontAwesomeIcon className="text-[#28c76f]" icon={faUnlockKeyhole} />
                ) : (
                    <FontAwesomeIcon className="text-[#EF4444]" icon={faLock} />
                )}
            </p>
        </Tippy>
    );
}

export default ModelLockAcc;
