import AppAdmins from '@src/services/AppAdmins';
import Action from './Action';
import Loading from '@src/libs/Loading';

import { Table } from 'antd';
import { useEffect, useState } from 'react';

function formatMoney(money, type = ',') {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${type}`);
}

function formateT(params) {
    let result = params < 10 ? '0' + params : params;
    return result;
}

function formateTime(params = '') {
    let date = '';
    if (params) {
        date = new Date(Number(params));
    } else {
        date = new Date();
    }
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());

    let hours = formateT(date.getHours());
    let minutes = formateT(date.getMinutes());
    let seconds = formateT(date.getSeconds());
    return years + '-' + months + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
}

function PaymentMethod() {
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            Loading(true);
            let { data } = await AppAdmins.PaymentMethod();
            setData(data);
            Loading(false);
        })();
    }, []);

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Tên phương thức',
            dataIndex: 'name_info',
            key: 'name_info',
            sorter: (a, b) => a.name_info.length - b.name_info.length,
            sortOrder: sortedInfo.columnKey === 'name_info' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Số tài khoản',
            dataIndex: 'detail_info',
            key: 'detail_info',
            sorter: (a, b) => a.detail_info - b.detail_info,
            sortOrder: sortedInfo.columnKey === 'detail_info' ? sortedInfo.order : null,
            ellipsis: true,
            render: (detail_info) => <a>{detail_info}</a>,
        },
        {
            title: 'Chủ tài khoản',
            dataIndex: 'name_account',
            key: 'name_account',
            sorter: (a, b) => a.name_account.length - b.name_account.length,
            sortOrder: sortedInfo.columnKey === 'name_account' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'type',
            key: 'type',
            filters: [
                {
                    text: 'ATM / Bank',
                    value: 1,
                },
                {
                    text: 'Ví điện tử',
                    value: 2,
                },
            ],
            filteredValue: filteredInfo.type || null,
            sorter: (a, b) => a.type - b.type,
            sortOrder: sortedInfo.columnKey === 'type' ? sortedInfo.order : null,
            onFilter: (value, record) => {
                return [record.type].includes(value);
            },
            ellipsis: true,
            render: (type) => {
                return (
                    <p className="font-semibold cursor-pointer">
                        <span style={{ color: 'rgb(165, 0, 100)' }}>
                            ATM / Bank
                        </span>
                    </p>
                );
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'Hoạt động',
                    value: 1,
                },
                {
                    text: 'Đang khóa',
                    value: 2,
                },
            ],
            filteredValue: filteredInfo.status || null,
            sorter: (a, b) => a.status - b.status,
            sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
            onFilter: (value, record) => {
                return [record.status].includes(value);
            },
            ellipsis: true,
            render: (status) => {
                return (
                    <p
                        className={`font-semibold cursor-pointer`}
                        style={{ color: status == 1 ? '#22C55E' : '#EF4444' }}
                    >
                        {status == 1 ? 'Hoạt động' : 'Đang khóa'}
                    </p>
                );
            },
        },
        {
            title: 'Thao tác',
            dataIndex: 'id',
            key: 'id',
            render: (id, dataObj) => <Action id={id} dataInfo={dataObj} data={data} setData={setData} />,
            ellipsis: true,
        },
    ];

    return (
        <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="bg-[#111c45] col-span-3 rounded-md">
                <div className="flex flex-wrap justify-between p-4 card-header">
                    <h3 className="font-bold text-white">Phương thức thanh toán</h3>
                </div>
                <div className="p-2 card-body overflow-x-auto min-w-[20px]">
                    <Table columns={columns} rowKey="id" dataSource={data} onChange={handleChange} />
                </div>
            </div>
        </div>
    );
}

export default PaymentMethod;
