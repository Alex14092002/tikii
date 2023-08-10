import { Modal } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import ListServices from '../../../../components/Services/ListServices';
import BoxChat from './chat/BoxChat';
import service from '../../../../services/AppUsers';


const handleMarkDone = async (support_id) => {
    const data = {
        status: 'done',
        support_id,
    };
    const response = await service.EditSupport(data);

    if (response.status_code === 200) {
        return 1
    } else {
        notification.error({
            message: 'Có lỗi xảy ra',
            description: response.message,
        });
    }
};
function ModalSupport({ open, setModal, children, ...props }) {
    const [selectedService, setSelectedService] = useState('');
    const [openModal, setOpenModel] = useState(open);
    useEffect(() => {
     if(selectedService != ''){
        window.is_support_page = true;
     }
    });
    return (
        <Modal
            title="Hỗ trợ khách hàng"
            open={openModal}
            footer={null}
            keyboard={false}
            maskClosable={false}
            onCancel={() => {
                const modal = Modal.confirm({
                    title: 'Bạn có chắc chắn muốn thoát?',
                    okText: 'Thoát',
                    cancelText: 'Hủy',
                    onOk: async () => {
                        setModal(false);
                        setOpenModel(false);
                        setSelectedService('');
                        if(parseInt(localStorage.getItem('support_id')) > 0){
                            await handleMarkDone(localStorage.getItem('support_id'));
                        }
                        localStorage.removeItem('support_id')
                        sessionStorage.removeItem('user_id');
                        window.is_support_page = false;
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
