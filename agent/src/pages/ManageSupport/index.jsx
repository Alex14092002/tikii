import React, { useEffect, useState } from 'react';
import service from '@src/services/AppAdmins';
import { Badge, Button, Popconfirm, Space, Table, Tag, notification } from 'antd';
import ModalSupport from './components/ModalSupport';
import socket from '@src/utils/socket';
import Loading from '@src/libs/Loading';
function ManageSupport() {
    const [open, setOpen] = useState(false);
    const [supportList, setSupportList] = useState([]);
    const [listMessage, setListMessage] = useState([]);
    const [support, setSupport] = useState();
    const fetchSupport = async () => {
        try {
            Loading(true);
            const response = await service.GetSupportList();
            if (response.status_code === 200) {
                setSupportList(response.data);
            }
            Loading(false);
        } catch (error) {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: error.message,
            });
        }
    };

    const handleMarkDone = async (record) => {
        const data = {
            status: 'done',
            support_id: record._id,
        };
        const response = await service.EditSupport(data);

        if (response.status_code === 200) {
            fetchSupport();
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: response.message,
            });
        }
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            fixed: 'left',
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: 'ID Người dùng',
            dataIndex: 'user',
            key: 'user',
            width: 400,
            sorter: (a, b) => a.user - b.user,
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <Tag
                    key={record.status}
                    color={
                        record.status === 'pending' ? 'orange' : record.status === 'processing' ? '#111c45' : 'green'
                    }
                >
                    {record.status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <Space size={20}>
                    <Button disabled={record.status === 'done'} onClick={() => handleSupport(record)}>
                        Support
                    </Button>
                    {record.status !== 'done' && (
                        <Popconfirm title="Are you sure to mark as done?" onConfirm={() => handleMarkDone(record)}>
                            <Button danger>Mark as Done </Button>
                        </Popconfirm>
                    )}
                </Space>
            ),
        },
    ];

    const handleSupport = async (data) => {
        setSupport(data);
        if (data.status === 'pending') {
            const data_send = {
                support_id: data._id,
            };
            await service.JoinConversation(data_send);
            fetchSupport();
        } else {
            let data_send = {
                supportId: data._id,
            };
            const response = await service.GetListMessage(data_send);
            if (response.status_code === 200) {
                setListMessage(response.data);
            }
        }
        setOpen(true);
        socket.emit('Support::JOIN', `${data.service} - ${data.user}`);
    };

    useEffect(() => {
        fetchSupport();
    }, []);

    return (
        <>
            <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="bg-[#111c45] col-span-3 rounded-md">
                    <div className="flex flex-wrap justify-between p-4 card-header">
                        <h3 className="font-bold text-white">Danh sách người cần hỗ trợ</h3>
                    </div>
                    <div className="p-2 card-body overflow-x-auto min-w-[20px]">
                        <Table columns={columns} rowKey="_id" dataSource={supportList} />
                    </div>
                </div>
            </div>
            <ModalSupport
                support={support}
                messages={listMessage}
                setMessages={setListMessage}
                open={open}
                setModal={setOpen}
            />
        </>
    );
}

export default ManageSupport;
