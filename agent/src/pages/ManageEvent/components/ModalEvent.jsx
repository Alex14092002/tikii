import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import service from '../../../services/AppAdmins';
function ModalEvent({ open, setOpen, data, type }) {
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    async function fetchDataUser() {
        let { data: dataResponse } = await service.ListUser();
        setUsers(dataResponse || []);
    }
    const handleSubmitForm = async (value) => {
        const data_send = {
            product_type: value.product_type,
            percent: value.percent,
            customer_id: users.find((item) => item.username === value.username)?.id,
            expired_date: value.expired_date,
        };

        const response = await service.CreateEvent(data_send);
        if (response.status === 200) {
            toast('🚀 Mở sự kiện thành công', {
                position: 'top-right',
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            setOpen(false);
        } else {
            toast('🚀 Mở sự kiện thất bại', {
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
    };

    const handleOnOk = () => {
        form.submit();
    };

    useEffect(() => {
        fetchDataUser();
    }, []);

    useEffect(() => {
        if (open) form.resetFields();
    }, [open]);

    return (
        <Modal
            width={720}
            centered={true}
            title={type === 'create' ? `Tạo sự kiện` : `Chỉnh sửa sự kiện`}
            open={open}
            onCancel={() => setOpen(false)}
            onOk={handleOnOk}
            okText={type === 'create' ? `Tạo` : `Lưu`}
            okButtonProps={{
                style: {
                    backgroundColor: '#f44336',
                },
            }}
        >
            <Form
                name="basic"
                layout="vertical"
                onFinish={handleSubmitForm}
                initialValues={{
                    percent: 0,
                }}
                form={form}
            >
                {' '}
                <Form.Item label="Nhập username áp dụng" name="username">
                    <Select placeholder="Chọn user" showSearch>
                        {users.map((item, idx) => (
                            <Select.Option key={idx} value={item.username}>
                                {item.username}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Lựa chọn sự kiện" name="product_type">
                    <Select placeholder={'Chọn sự kiện'} allowClear>
                        <Select.Option value="1">Đồ gia dụng</Select.Option>
                        <Select.Option value="2">Điện tử</Select.Option>
                        <Select.Option value="3">Sang trọng</Select.Option>
                        <Select.Option value="4">Trang điểm</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Nhập %" name="percent">
                    <Input type="number" placeholder="Nhập %" max={100} min={0} />
                </Form.Item>
                <Form.Item label="Thời gian kết thúc(phút)" name="expired_date">
                    <Input type="number" placeholder="Thời gian kết thúc (phút)" />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalEvent;
