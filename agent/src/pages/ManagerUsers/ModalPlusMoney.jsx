import Loading from '@src/libs/Loading';
import AppAdmins from '@src/services/AppAdmins';

import { Input, Modal } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';

function ModalPlusMoney({ data, openPlusMoney, setOpenPlusMoney, userData, setData }) {
    const [money, setMoney] = useState();

    const handlePlus = async () => {
        setOpenPlusMoney(false);
        Loading(true);
        await AppAdmins.EditUser(data.id, money, 'plus');
        toast('🚀 Tăng điểm người chơi Thành công!', {
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

        arrNew.money += Number(money);
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
        <Modal
            width={720}
            centered={true}
            title={`Tặng thưởng cho người chơi "${data.phone}"`}
            open={openPlusMoney}
            onOk={() => handlePlus(false)}
            onCancel={() => setOpenPlusMoney(false)}
        >
            <Input
                className="mt-5"
                type="text"
                placeholder="Nhập số tiền"
                onChange={(e) => setMoney(e.target.value)}
                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
            />
        </Modal>
    );
}

export default ModalPlusMoney;
