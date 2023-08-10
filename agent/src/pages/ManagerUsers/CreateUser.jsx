import Loading from '@src/libs/Loading';
import AppAdmins from '@src/services/AppAdmins';

import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { Modal } from 'antd';
import { toast } from 'react-toastify';

function CreateUser() {
    const [CreateAccount, setCreateAccount] = useState(false);
    const [typeAccount, setTypeAccount] = useState(1);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [invite, setInvite] = useState('');

    const handleCreateAccount = async () => {
        if (!phone || !password || !invite) {
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
        let data = await AppAdmins.CreateAccount(phone, password, invite);
        Loading(false);

        if (data.status != 1) {
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

        setCreateAccount(false);
    };

    return (
        <>
            <div
                onClick={() => setCreateAccount(true)}
                className="border-[1px] border-[#7367f0] px-2 py-1 rounded-md hover:bg-[#7367f0] duration-100 cursor-pointer select-none"
            >
                <span className="font-semibold text-white ">+ Tạo tài khoản</span>
            </div>

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
                            label: 'Đại lý',
                        }}
                        style={{
                            width: '100%',
                        }}
                        onChange={(data) => setTypeAccount(data.value)}
                        options={[
                            {
                                value: 1,
                                label: 'Đại lý',
                            },
                        ]}
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="phone" className="text-[#888]">
                        Tài khoản
                    </label>
                    <Input
                        type="text"
                        id="phone"
                        value={phone}
                        placeholder="Nhập tài khoản đại lý"
                        onChange={(e) => setPhone(e.target.value)}
                        onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
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
