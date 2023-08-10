import Loading from '@src/libs/Loading';
import AppAdmins from '@src/services/AppAdmins';

import React, { useState } from 'react';
import { Input, Select, Modal, Button } from 'antd';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faPlus
} from '@fortawesome/free-solid-svg-icons';

function CreateUser({ setLoading, loading }) {
    const [CreateAccount, setCreateAccount] = useState(false);
    const [typeAccount, setTypeAccount] = useState(0);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [invite, setInvite] = useState('');
    const [name_store, setNameStore] = useState('');
    const [username, setUsername] = useState('');

    function resetData() {
        setTypeAccount('');
        setPhone('');
        setPassword('');
        setInvite('');
        setNameStore('');
        setUsername('');
    }

    const handleCreateAccount = async () => {
        if (!phone || !password || !invite || !username) {
            return toast.error('Hãy nhập đầy đủ thông tin', {
                position: 'top-right',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }

        Loading(true);
        let data = await AppAdmins.CreateAccount(typeAccount, phone, username, password, invite, name_store);
        Loading(false);

        if (data.status !== 1) {
            return toast.error(`${data.message}`, {
                position: 'top-right',
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }

        toast.success(`🚀 ${data.message}`, {
            position: 'top-right',
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

        resetData();
        setLoading(!loading);
        setCreateAccount(false);
    };

    return (
        <>
            <Button
                type="primary"
                onClick={() => setCreateAccount(true)}
            >
                <FontAwesomeIcon className="text-sm" icon={faPlus} />&nbsp; Tạo tài khoản
            </Button>

            <Modal
                width={500}
                centered={true}
                title="Tạo tài khoản"
                open={CreateAccount}
                onOk={() => handleCreateAccount()}
                onCancel={() => setCreateAccount(false)}
            >
                <div className="mt-4">
                    <label htmlFor="type_method" className="text-[#888]">
                        Loại tài khoản
                    </label>
                    <Select
                        labelInValue
                        value={{
                            value: typeAccount,
                        }}
                        style={{
                            width: '100%',
                        }}
                        onChange={(data) => setTypeAccount(data.value)}
                        options={[
                            {
                                value: 0,
                                label: 'Khách hàng',
                            },
                            {
                                value: 2,
                                label: 'Đại lý',
                            },
                        ]}
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="phone" className="text-[#888]">
                        Số điện thoại
                    </label>
                    <Input
                        type="text"
                        id="phone"
                        value={phone}
                        placeholder="Nhập số điện thoại"
                        onChange={(e) => setPhone(e.target.value)}
                        onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="invite" className="text-[#888]">
                        Tên người dùng
                    </label>
                    <Input
                        type="text"
                        id="username"
                        placeholder="Nhập tên người dùng"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="invite" className="text-[#888]">
                        Tên cửa hàng
                    </label>
                    <Input
                        type="text"
                        id="name_store"
                        placeholder="Nhập tên cửa hàng"
                        value={name_store}
                        onChange={(e) => setNameStore(e.target.value)}
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="password" className="text-[#888]">
                        Mật khẩu
                    </label>
                    <Input
                        type="text"
                        id="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="invite" className="text-[#888]">
                        Mã giới thiệu
                    </label>
                    <Input
                        type="text"
                        id="invite"
                        placeholder="Nhập Mã giới thiệu"
                        value={invite}
                        onChange={(e) => setInvite(e.target.value)}
                    />
                </div>
            </Modal>
        </>
    );
}

export default CreateUser;
