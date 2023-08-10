import { Modal } from 'antd';
import { memo, useRef, useState } from 'react';
import BoxChat from './chat/BoxChat';
function ModalSupport({ open, setModal, children, messages, setMessages, support, ...props }) {
    const [selectedService, setSelectedService] = useState(false);
    const socketRef = useRef();

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
                    },
                });
            }}
            width={1000}
            {...props}
        >
            {' '}
            <BoxChat support={support} messages={messages} setMessages={setMessages} />
        </Modal>
    );
}

export default memo(ModalSupport);
