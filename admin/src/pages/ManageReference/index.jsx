import { Button, Space, Table } from 'antd';
import React from 'react';
import CreateRef from './components/CreateRef';

function ManageReference() {
    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            ellipsis: true,
            key: 'id',
        },
        {
            title: 'Mã mời',
            dataIndex: 'type',
            ellipsis: true,
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'created_at',
            ellipsis: true,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            ellipsis: true,
        },
    ];
    const data = [
        {
            id: 1,
            type: 'Thành viên',
            created_at: '12/12/2021',
            status: 'Đang sử dụng',
        },
    ];
    return (
        <>
            <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="bg-[#111c45] col-span-3 rounded-md">
                    <div className="flex flex-wrap justify-between p-4 card-header">
                        <h3 className="font-bold text-white">Danh sách người mã mời</h3>
                        <CreateRef />
                    </div>
                </div>
            </div>
            <div className="">
                <Table scroll={500} sticky columns={columns} rowKey="_id" dataSource={data} />
            </div>
        </>
    );
}

export default ManageReference;
