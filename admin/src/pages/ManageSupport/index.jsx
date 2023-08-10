import React, { useEffect, useState } from 'react';
import service from '@src/services/AppAdmins';
import { Badge, Button, Popconfirm, Space, Table, Tag, notification } from 'antd';
import ModalSupport from './components/ModalSupport';
//import socket from '@src/utils/socket';
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
                $("#support_notify").addClass("hidden");
                if(parseInt(response.total_notify) > 0){
                    $("#support_notify").html(response.total_notify);
                    $("#support_notify").removeClass("hidden");
                }
            }
            Loading(false);
        } catch (error) {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: error.message,
            });
        }
    };

    const fetchOneSupport = async (id) => {
        try {
            Loading(true);
            const response = await service.GetSupport(id);
            if (response.status_code === 200) {
                handleSupport(response.data);
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
            support_id: record.id,
        };
        const response = await service.EditSupport(data);

        if (response.status_code === 200) {
            window.current_support_id = 0;
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
            render: (text, record) => {
                let guest_text = "";
                if(record.is_guest === 1){
                    guest_text = <em className='text-xs'>Khách vãng lai</em>;
                }
                return (
                    <div>
                        <p>{text}</p>
                        {guest_text}
                    </div>
                );
            }
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
            render: (text, record) => {
                let service_name = 'Vấn đề nạp tiền';
                if(record.service == 'withdraw'){
                    service_name = 'Vấn đề rút tiền';
                } else if(record.service == 'shopping'){
                    service_name = 'Vấn đề mua hàng';
                }
                return service_name;
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                let status_text = 'Đang chờ';
                if(record.status == 'processing'){
                    status_text = 'Đang hỗ trợ';
                } else if(record.status == 'done'){
                    status_text = 'Đã hoàn thành';
                }
                return (
                    <Tag
                        key={record.status}
                        color={
                            record.status === 'pending' ? 'orange' : record.status === 'processing' ? '#111c45' : 'green'
                        }
                    >
                        {status_text.toUpperCase()}
                    </Tag>
                )
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <Space size={20}>
                    <Button className="flex item-center" disabled={record.status === 'done'} onClick={() => handleSupport(record)}>
                        Support <label id={"support_has_message_" + record.id} className="support-has-message rounded-full text-white text-[10px] bg-red-500 item-nav__notify w-[20px] h-[20px] flex item-center justify-center hidden ml-1 absolute top-[-10px]">new</label>
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
        window.current_support_id = data.id;
        let data_send = {
            supportId: data.id,
        };
        const response = await service.GetListMessage(data_send);
        if (response.status_code === 200) {
            setListMessage(response.data);
        }
        /*if (data.status === 'pending') {
            const data_send = {
                support_id: data.id,
            };
            await service.JoinConversation(data_send);
            fetchSupport();
        } else {
            let data_send = {
                supportId: data.id,
            };
            const response = await service.GetListMessage(data_send);
            if (response.status_code === 200) {
                setListMessage(response.data);
            }
        }*/
        $("#support_has_message_" + data.id).hide();
        setOpen(true);
        //socket.emit('Support::JOIN', `${data.service} - ${data.user}`);
    };

    useEffect(() => {
        fetchSupport();
        const urlParams = new URLSearchParams(window.location.search);
        if(parseInt(urlParams.get('support'))  > 0){
            fetchOneSupport(urlParams.get('support'));
        }   
        window.channel.bind('boxchat-create-support-event', function(data) {
            fetchSupport();
        });
        window.channel.bind('boxchat-send-event', function(data) {
            $(".support-has-message").hide();
            if(data.support_id && data.is_admin === false){
                $("#support_has_message_" + data.support_id).show();
            }
        });
    }, []);

    return (
        <>
            <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="bg-[#111c45] col-span-3 rounded-md">
                    <div className="flex flex-wrap justify-between p-4 card-header">
                        <h3 className="font-bold text-white">Danh sách người cần hỗ trợ</h3>
                    </div>
                    <div className="p-2 card-body overflow-x-auto min-w-[20px]">
                        <Table columns={columns} rowKey="id" dataSource={supportList} />
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
