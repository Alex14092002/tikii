import { DatePicker, Form, Input, Modal, Select } from 'antd';
import React, { useEffect } from 'react';
import service from '../../services/AppAdmins';
import { toast } from 'react-toastify';
import moment from 'moment';
function ModalEvent({ openEvent, setOpenEvent, data }) {
    const [form] = Form.useForm();

    const handleSubmitForm = async (value) => {
        let timing = new Date(value.time).getTime();
        const data_send = {
            service: value.event,
            percent: value.percent,
            user: data.id,
            timedown: timing,
        };

        const response = await service.CreateEvent(data_send);
        if (response.status_code === 200) {
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
            setOpenEvent(false);
        }
    };

    const handleOnOk = () => {
        form.submit();
    };

    useEffect(() => {
        if (openEvent) form.resetFields();
    }, [openEvent]);

    return (
        <Modal
            width={720}
            centered={true}
            title={`Chỉnh sửa sự kiện`}
            open={openEvent}
            onCancel={() => setOpenEvent(false)}
            onOk={handleOnOk}
        >
            <Form
                name="basic"
                layout="vertical"
                onFinish={handleSubmitForm}
                initialValues={{
                    event: [],
                    percent: 0,
                }}
                form={form}
            >
                <Form.Item label="Lựa chọn sự kiện" name="event">
                    <Select placeholder={'Chọn sự kiện'} mode="multiple" allowClear>
                        <Select.Option value="Đồ gia dụng">Đồ gia dụng</Select.Option>
                        <Select.Option value="Điện tử">Điện tử</Select.Option>
                        <Select.Option value="Sang trọng">Sang trọng</Select.Option>
                        <Select.Option value="Trang điểm">Trang điểm</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Nhập %" name="percent">
                    <Input type="number" placeholder="Nhập %" max={100} min={0} />
                </Form.Item>
                <Form.Item label="Thời gian kết thúc" name="time">
                    <DatePicker picker="time" />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalEvent;
