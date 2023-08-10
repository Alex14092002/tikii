import AppAdmins from '@src/services/AppAdmins';
import Loading from '@src/libs/Loading';

import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const FormItem = Form.Item;

function System() {
    const [settings, setSettings] = useState({
        name_bank: '',
        full_name: '',
        number_bank: '',
        wallet_usdt: '',
        link_support: ''
    });

    const [form] = Form.useForm();

    useEffect(() => {
        (async () => {
            Loading(true);
            let { data } = await AppAdmins.GetSettings();
            setSettings(data);
            Loading(false);
        })();
    }, []);

    useEffect(() => {
        form.setFieldsValue({
            name_bank: settings?.name_bank,
            full_name: settings?.full_name,
            number_bank: settings?.number_bank,
            wallet_usdt: settings?.wallet_usdt,
            link_support: settings?.link_support,
        });
    }, [form, settings]);

    const onFinish = async (value) => {
        Loading(true);
        await AppAdmins.SettingsConfig(value);
        toast(`🚀 Cập nhật Thành công!`, {
            position: 'top-right',
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
        setSettings(value);
        Loading(false);
    };

    return (
        <div className="bg-white px-2 py-5 rounded-bl-md rounded-br-md">
            <Form
                form={form}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ maxWidth: '100%' }}
                className=""
                onFinish={onFinish}
            >
                <div className="w-full grid grid-cols-3 gap-2">
                    <div className="col-span-3 md:col-span-1 mb-2">
                        <label className="text-[#888]" htmlFor="">
                            Tên ngân hàng
                        </label>
                        <Form.Item
                            name="name_bank"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập đầy đủ thông tin!',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên ngân hàng" />
                        </Form.Item>
                    </div>
                    <div className="col-span-3 md:col-span-1 mb-2">
                        <label className="text-[#888]" htmlFor="">
                            Chủ tài khoản
                        </label>
                        <Form.Item
                            name="full_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập đầy đủ thông tin!',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên chủ tài khoản" />
                        </Form.Item>
                    </div>
                    <div className="col-span-3 md:col-span-1 mb-2">
                        <label className="text-[#888]" htmlFor="">
                            Số tài khoản
                        </label>
                        <Form.Item
                            name="number_bank"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập đầy đủ thông tin!',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập số tài khoản" />
                        </Form.Item>
                    </div>
                    <div className="col-span-3 mb-1">
                        <label className="text-[#888]" htmlFor="">
                            Địa chỉ ví usdt
                        </label>
                        <Form.Item
                            name="wallet_usdt"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập đầy đủ thông tin!',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập địa chỉ ví usdt" />
                        </Form.Item>
                    </div>
                    <div className="col-span-3 mb-1">
                        <label className="text-[#888]" htmlFor="">
                            Link support
                        </label>
                        <Form.Item
                            name="link_support"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập đầy đủ thông tin!',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập liên kết chăm sóc khách hàng" />
                        </Form.Item>
                    </div>
                </div>

                <div className="mt-2">
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="float-right" style={{ minWidth: '100%' }}>
                            Cập nhật
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}

export default System;
