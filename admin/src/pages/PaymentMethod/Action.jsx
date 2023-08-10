import Loading from '@src/libs/Loading';
import AppAdmins from '@src/services/AppAdmins';

import React, { useState } from 'react';
import { Dropdown, Input, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Modal } from 'antd';
import { toast } from 'react-toastify';

function Action({ dataInfo, data, setData }) {
    const [editMethod, setEdit] = useState(false);

    const [NameMethod, setNameMethod] = useState(dataInfo.name_info);
    const [NumberMethod, setNumberMethod] = useState(dataInfo.detail_info);
    const [NameUser, setNameUser] = useState(dataInfo.name_account);
    const [TypeMethod, setTypeMethod] = useState(dataInfo.type);
    const [StatusMethod, setStatusMethod] = useState(dataInfo.status);

    const EditPaymentMethod = async () => {
        setEdit(false);
        Loading(true);
        await AppAdmins.EditPaymentMethod(dataInfo.id, NameMethod, NumberMethod, NameUser, TypeMethod, StatusMethod);
        toast('🚀 Sửa phương thức thành công', {
            position: 'top-right',
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

        const arrNew = {
            id: dataInfo.id,
            detail_info: NumberMethod,
            name_account: NameUser,
            name_info: NameMethod,
            status: StatusMethod,
            time: null,
            type: TypeMethod,
        };

        const newData = data.map((item) => {
            let newItem = item;
            if (dataInfo.id == item.id) {
                newItem = arrNew;
            }
            return newItem;
        });
        setData(newData);
        Loading(false);
    };

    const items = [
        {
            key: '1',
            label: (
                <div onClick={() => setEdit(true)} className="text-[#28c76f]">
                    <FontAwesomeIcon className="mr-2" icon={faPenToSquare} />
                    <span className="text-black">Sửa phương thức</span>
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

            <Modal
                width={500}
                centered={true}
                title="Sửa phương thức thanh toán"
                open={editMethod}
                onOk={() => EditPaymentMethod()}
                onCancel={() => setEdit(false)}
            >
                <div className="mt-4">
                    <label htmlFor="type_method" className="text-[#888]">
                        Loại phương thức
                    </label>
                    <Select
                        labelInValue
                        defaultValue={{
                            value: TypeMethod,
                            label: TypeMethod == 1 ? 'ATM / Bank' : 'Ví điện tử',
                        }}
                        style={{
                            width: '100%',
                        }}
                        onChange={(data) => setTypeMethod(data.value)}
                        options={[
                            {
                                value: 1,
                                label: 'ATM / Bank',
                            },
                            {
                                value: 2,
                                label: 'Ví điện tử',
                            },
                        ]}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="type_method" className="text-[#888]">
                        Trạng thái
                    </label>
                    <Select
                        labelInValue
                        defaultValue={{
                            value: StatusMethod,
                            label: StatusMethod == 1 ? 'Hoạt động' : 'Bảo trì',
                        }}
                        style={{
                            width: '100%',
                        }}
                        onChange={(data) => setStatusMethod(data.value)}
                        options={[
                            {
                                value: 1,
                                label: 'Hoạt động',
                            },
                            {
                                value: 2,
                                label: 'Bảo trì',
                            },
                        ]}
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="name_method" className="text-[#888]">
                        Tên phương thức
                    </label>
                    <Input
                        id="name_method"
                        type="text"
                        placeholder="Nhập tên phương thức"
                        value={NameMethod}
                        onChange={(e) => setNameMethod(e.target.value)}
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="number_method" className="text-[#888]">
                        Số tài khoản
                    </label>
                    <Input
                        id="number_method"
                        type="text"
                        value={NumberMethod}
                        placeholder="Nhập số tài khoản"
                        onChange={(e) => setNumberMethod(e.target.value)}
                        onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="name_user" className="text-[#888]">
                        Chủ tài khoản
                    </label>
                    <Input
                        id="name_user"
                        type="text"
                        value={NameUser}
                        placeholder="Nhập tên chủ tài khoản"
                        onChange={(e) => setNameUser(e.target.value)}
                    />
                </div>
            </Modal>
        </>
    );
}

export default Action;
