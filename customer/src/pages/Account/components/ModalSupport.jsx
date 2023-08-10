import { Modal } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import ListServices from '../../../components/Services/ListServices';
import BoxChat from './chat/BoxChat';
//import AppUsers from '@src/services/AppUsers';

function ModalSupport({ open, setModal, children, ...props }) {
    const [selectedService, setSelectedService] = useState('');

    return (
        <Modal
            title="Hỗ trợ khách hàng"
            open={open}
            footer={null}
            keyboard={false}
            maskClosable={false}
            onCancel={() => {
                Modal.confirm({
                    title: 'Bạn có chắc chắn muốn thoát?',
                    okText: 'Thoát',
                    cancelText: 'Hủy',
                    onOk: () => {
                        setModal(false);
                        setSelectedService('');
                        sessionStorage.removeItem('user_id');
                    },
                    okButtonProps: {
                        type: 'primary',
                        danger: 'true',
                    },
                });
            }}
            width={1000}
            {...props}
        >
            {!selectedService && <ListServices onSelect={setSelectedService} />}
            {selectedService && <BoxChat service={selectedService} />}
        </Modal>
    );
}

export default memo(ModalSupport);
