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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            Loading(true);
            let { data: dataResponse } = await AppAdmins.ListUser();
            setData(dataResponse);
            Loading(false);
        })();
    }, [loading]);

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={''} // <SearchOutlined />
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <FontAwesomeIcon
                icon={faSearch}
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

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
            title: 'Tên người dùng',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username.length - b.username.length,
            sortOrder: sortedInfo.columnKey === 'username' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            sorter: (a, b) => a.phone - b.phone,
            sortOrder: sortedInfo.columnKey === 'phone' ? sortedInfo.order : null,
            ellipsis: true,
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Số tiền',
            dataIndex: 'money',
            key: 'money',
            sorter: (a, b) => a.money - b.money,
            sortOrder: sortedInfo.columnKey === 'money' ? sortedInfo.order : null,
            ellipsis: true,
            render: (money) => <a>{formatMoney(Math.round(money))} đ</a>,
        },
        {
            title: 'Mã mời',
            dataIndex: 'invite',
            key: 'invite',
            sorter: (a, b) => a.invite_code - b.invite_code,
            sortOrder: sortedInfo.columnKey === 'invite_code' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Cấp độ',
            dataIndex: 'role',
            key: 'role',
            sorter: (a, b) => a.role - b.role,
            sortOrder: sortedInfo.columnKey === 'role' ? sortedInfo.order : null,
            ellipsis: true,
            render: (role) => (
                <p
                    className={classNames(
                        'text-white p-[0.05rem] rounded-md text-center text-[0.7rem] cursor-pointer min-w-[70px]',
                        { 'bg-[#ff9f43]': role == 2 },
                        { 'bg-[#EF4444]': role == 1 },
                        { 'bg-[#28c76f]': role == 0 },
                    )}
                >
                    <span className="font-bold">{role == 2 ? 'Agent' : role == 0 ? 'Người dùng' : 'Admin'}</span>
                </p>
            ),
        },
        {
            title: 'Hành động',
            dataIndex: 'status',
            key: 'status',
            render: (_, dataObj) => {
                return (
                    <div className="min-w-[80px]">
                        <ModelLockAcc data={dataObj} userData={data} setData={setData} />
                    </div>
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
                    value: 0,
                },
            ],
            // filteredValue: filteredInfo.status || null,
            sorter: (a, b) => a.status - b.status,
            sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
            onFilter: (value, record) => {
                return [record.status].includes(value);
            },
            ellipsis: true,
            render: (status) => {
                return (
                    <p
                        className={`font-semibold cursor-pointer text-center`}
                        style={{ color: status == 1 ? '#22C55E' : '#EF4444' }}
                    >
                        {status == 1 ? 'Hoạt động' : 'Đang khóa'}
                    </p>
                );
            },
        },
        {
            title: 'Trạng thái giao dịch',
            dataIndex: 'status_pay',
            key: 'status_pay',
            filters: [
                {
                    text: 'Hoạt động',
                    value: 1,
                },
                {
                    text: 'Đang khóa',
                    value: 0,
                },
            ],
            // filteredValue: filteredInfo.status_pay || null,
            sorter: (a, b) => a.status_pay - b.status_pay,
            sortOrder: sortedInfo.columnKey === 'status_pay' ? sortedInfo.order : null,
            onFilter: (value, record) => {
                return [record.status_pay].includes(value);
            },
            ellipsis: true,
            render: (status_pay) => {
                return (
                    <p
                        className={`font-semibold cursor-pointer text-center`}
                        style={{ color: status_pay == 1 ? '#22C55E' : '#EF4444' }}
                    >
                        {status_pay == 1 ? 'Hoạt động' : 'Đang khóa'}
                    </p>
                );
            },
        },
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
            sorter: (a, b) => a.time - b.time,
            sortOrder: sortedInfo.columnKey === 'time' ? sortedInfo.order : null,
            render: (time) => <a>{formateTime(time)}</a>,
            ellipsis: true,
        },
        {
            title: 'Thao tác',
            dataIndex: 'id',
            key: 'id',
            render: (_, userData) => <DropdownManager userData={data} setData={setData} data={userData} />,
            ellipsis: true,
        },
    ];

    return (
        <>
            <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="bg-[#111c45] col-span-3 rounded-md">
                    <div className="flex flex-wrap justify-between p-4 card-header">
                        <h3 className="font-bold text-white">Danh sách người dùng</h3>
                        <CreateUser setLoading={setLoading} loading={loading} />
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
