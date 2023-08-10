import Loading from '@src/libs/Loading';
import AppAdmins from '@src/services/AppAdmins';

import React, { useState } from 'react';
import { Dropdown, Input, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Modal } from 'antd';
import { toast } from 'react-toastify';

function ModalStatusPay({ userData, data, setData, openStatusPay, setStatusPay }) {
    const [StatusPay1, setStatusPay1] = useState(data.status_pay);

    const EditStatusPay = async () => {
        Loading(true);
        setStatusPay(false);
        await AppAdmins.EditStatusPay({ phone: data.phone, status_pay: StatusPay1 });
        toast('🚀 Cập nhật tài khoản thành công', {
            position: 'top-right',
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

        const arrNew = userData.find((item) => {
            return data.id == item.id;
        });

        arrNew.status_pay = StatusPay1;

        const newData = userData.map((item) => {
            let newItem = item;
            if (data.id == item.id) {
                newItem = arrNew;
            }
            return newItem;
        });

        setData(newData);
        Loading(false);
    };

    return (
        <>
            <Modal
                width={720}
                centered={true}
                title={`Trạng thái giao dịch "${data.phone}"`}
                open={openStatusPay}
                onOk={() => EditStatusPay()}
                onCancel={() => setStatusPay(false)}
            >
                <div className="mt-4">
                    <label htmlFor="type_method" className="text-[#888]">
                        Trạng thái
                    </label>
                    <Select
                        labelInValue
                        defaultValue={{
                            value: StatusPay1,
                            label: StatusPay1 == 1 ? 'Hoạt động' : 'Đang khóa',
                        }}
                        style={{
                            width: '100%',
                        }}
                        onChange={(data) => setStatusPay1(data.value)}
                        options={[
                            {
                                value: 1,
                                label: 'Hoạt động',
                            },
                            {
                                value: 2,
                                label: 'Khóa giao dịch',
                            },
                        ]}
                    />
                </div>
            </Modal>
        </>
    );
}

export default ModalStatusPay;
