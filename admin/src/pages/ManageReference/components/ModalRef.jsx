import { Form, Input, Modal } from 'antd';
import React from 'react';

function ModalRef({ open, setOpen, ...props }) {
    const [form] = Form.useForm();
    return (
        <Modal
            keyboard={false}
            maskClosable={false}
            title="Thêm mã mời"
            open={open}
            setModal={setOpen}
            onCancel={() => setOpen(false)}
            okText="Thêm"
            {...props}
        >
            <Form layout="vertical" form={form}>
                <Form.Item label="Nhập username đại lý" name="username">
                    <Input />
                </Form.Item>
                <Form.Item label="Mã mời" name="ref_code">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalRef;
