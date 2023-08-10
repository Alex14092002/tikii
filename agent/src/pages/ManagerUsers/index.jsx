import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import MenuOption from '@src/components/Menu';
import AppAdmins from '@services/AppAdmins';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Highlighter from 'react-highlight-words';

import DropdownManager from './DropdownManager.jsx';
import ModelLockAcc from './ModelLockUp';
import Loading from '@src/libs/Loading';
import './ManagerUsers.scss';
import CreateUser from './CreateUser.jsx';

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

function ManagerUsers() {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            Loading(true);
            let { data: dataResponse } = await AppAdmins.ListUser();
            setData(dataResponse);
            Loading(false);
        })();
    }, []);

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            ellipsis: true,
        },
        {
            title: 'Loại thành viên',
            dataIndex: 'type',
            key: 'type',
            ellipsis: true,
            render: (_, record) => <span>Thành viên bình thường</span>,
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'username',
            ellipsis: true,
            key: 'username',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            ellipsis: true,
        },
        // {
        //     title: 'Trạng thái rút tiền',
        //     dataIndex: 'status_withdraw',
        //     ellipsis: true,
        //     key: 'status_withdraw',
        // },
        {
            title: 'Số dư',
            dataIndex: 'money',
            ellipsis: true,
            key: 'money',
        },
        {
            title: 'IP đăng nhập gần nhất',
            dataIndex: 'ip_address',
            key: 'ip_address',
            ellipsis: true,
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            ellipsis: true,
            render: (text, record) => <DropdownManager data={record} userData={data} setData={setData} />,
        },
    ];

    return (
        <>
            <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="bg-[#111c45] col-span-3 rounded-md">
                    <div className="flex flex-wrap justify-between p-4 card-header">
                        <h3 className="font-bold text-white">Danh sách người dùng</h3>
                        <div className="mt-2 sm:mt-1">
                            <input
                                className="duration-200 search rounded-md p-1 pl-2 w-[300px] outline-none"
                                type="search"
                                placeholder="Tìm kiếm"
                                spellCheck="false"
                            />
                        </div>
                    </div>
                    <div className="p-2 card-body overflow-x-auto min-w-[20px]">
                        <Table columns={columns} rowKey="id" dataSource={data} onChange={handleChange} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManagerUsers;
