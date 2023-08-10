import Loading from '@src/libs/Loading';
import AppAdmins from '@src/services/AppAdmins';

import { Input, Modal } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';

function ModalChangePass({ data, openChangePass, setChangePass }) {
    const [password, setPassword] = useState('');

    const handleChangePass = async () => {
        setChangePass(false);
        Loading(true);
        await AppAdmins.EditUser(data.id, 0, 'change-password', password);
        toast('🚀 Đổi mật khẩu Thành công!', {
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
    };
    return (
        <Modal
            width={720}
            centered={true}
            title={`Đổi mật khẩu người dùng "${data.phone}"`}
            open={openChangePass}
            onOk={() => handleChangePass(false)}
            onCancel={() => setChangePass(false)}
        >
            <Input
                className="mt-5"
                type="text"
                placeholder="Nhập mật khẩu mới"
                onChange={(e) => setPassword(e.target.value)}
            />
        </Modal>
    );
}

export default ModalChangePass;
