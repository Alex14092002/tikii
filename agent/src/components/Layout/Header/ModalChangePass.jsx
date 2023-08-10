import Loading from '@src/libs/Loading';
import AppAdmins from '@src/services/AppAdmins';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, Input } from 'antd';

function ModalChangePass({ isOpen, setIsOpen }) {
    const [passwordOld, setPasswordOld] = useState('');
    const [password, setPassword] = useState('');
    const handleChangePass = async () => {
        if (!passwordOld || !password) {
            return toast.error('Vui lòng nhập đầy đủ thông tin', {
                position: 'top-right',
                autoClose: 750,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
        // Loading(true);
        // let data = await AppAdmins.changePassword(passwordOld, password);
        // Loading(false);
        if (data.status == 2) {
            return toast.error(data.message, {
                position: 'top-right',
                autoClose: 750,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
        setIsOpen(false);
        toast.success('🚀 Đổi mật khẩu Thành công!', {
            position: 'top-right',
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    };
    return (
        <Modal
            width={720}
            centered={true}
            title={`Đổi mật khẩu`}
            open={isOpen}
            onOk={() => handleChangePass(false)}
            onCancel={() => setIsOpen(false)}
        >
            <div className="mt-5">
                <label className="text-[#888]" htmlFor="old_pass">
                    Mật khẩu hiện tại
                </label>
                <Input
                    type="text"
                    id="old_pass"
                    placeholder="Nhập mật khẩu hiện tại"
                    onChange={(e) => setPasswordOld(e.target.value)}
                />
            </div>
            <div className="mt-5">
                <label className="text-[#888]" htmlFor="new_pass">
                    Mật khẩu mới
                </label>
                <Input
                    type="text"
                    id="new_pass"
                    placeholder="Nhập mật khẩu mới"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </Modal>
    );
}

export default ModalChangePass;
