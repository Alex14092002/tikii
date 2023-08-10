import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Table, Space } from 'antd';
//import MenuOption from '@src/components/Menu';
import Highlighter from 'react-highlight-words';
import AppAdmins from '@services/AppAdmins';
import DropdownTransaction from './DropdownTransaction.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';
import Loading from '@src/libs/Loading';
import Helper from '../../../utils/helper';

function HistoryWithdrawal() {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            Loading(true);
            let { data } = await AppAdmins.GetWithdrawl();
            setData(data);
            Loading(false);
        })();
        window.channel.bind('withdraw-event', async function(data) {
            if(data.status === 0){
                let { data } = await AppAdmins.GetWithdrawl();
                setData(data);
            }
        });
    }, []);

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
            title: 'Mã đơn',
            dataIndex: 'order_code',
            key: 'order_code',
            ellipsis: true,
            sorter: (a, b) => a.order_code.length - b.order_code.length,
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('order_code'),
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
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => <a className="text-[#7367f0] font-semibold">{Helper.formatMoney(amount)}</a>,
        },
        {
            title: 'Ngân hàng',
            dataIndex: 'name_bank',
            key: 'name_bank',
            render: (name_bank) => <p>{name_bank}</p>,
        },
        {
            title: 'Số tài khoản',
            dataIndex: 'number_bank',
            key: 'number_bank',
            render: (number_bank) => (
                <Tippy placement="right-end" content="Click để sao chép" delay={[0, 70]}>
                    <a
                        onClick={() => {
                            toast.success('🚀 Sao chép thành công', {
                                position: 'top-right',
                                autoClose: 500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: 'light',
                            });
                            navigator.clipboard.writeText(number_bank);
                        }}
                    >
                        {number_bank}
                    </a>
                </Tippy>
            ),
        },
        {
            title: 'Chủ tài khoản',
            dataIndex: 'full_name',
            key: 'full_name',
            render: (full_name) => <p>{full_name}</p>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'Chờ duyệt',
                    value: 0,
                },
                {
                    text: 'Đã duyệt',
                    value: 1,
                },
                {
                    text: 'Đã từ chối',
                    value: 2,
                },
                {
                    text: 'Khách hủy',
                    value: 3,
                },
            ],
            onFilter: (value, record) => {
                return [record.status].includes(value);
            },
            ellipsis: true,
            render: (status, dataObj) => {
                return (
                    <div className='flex item-center justify-center'>
                        <div
                            className="text-white text-center rounded-md px-1 inline-block"
                            style={{ background: status == 0 ? '#d97430' : status == 1 ? '#28c76f' : status == 2 ? '#ea5455': '#fb7185' }}
                        >
                            <p className="text-[0.65rem] font-semibold">
                                {status == 0 && 'Chờ duyệt'}
                                {status == 1 && 'Đã duyệt'}
                                {status == 2 && (dataObj.is_agent_update == 1?'Đại lý đã từ chối':'Đã từ chối')}
                                {status == 3 && 'Khách hủy'}
                            </p>
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => <a>{createdAt}</a>,
            ellipsis: true,
        },
        {
            title: 'Thao tác',
            dataIndex: 'order_code',
            key: 'order_code',
            render: (order_code, dataObj) => (
                <DropdownTransaction
                    order_code={order_code}
                    status={dataObj.status}
                    userData={data}
                    setData={setData}
                />
            ),
            ellipsis: true,
        },
    ];

    return (
        <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#111c45] col-span-3 rounded-md">
                <div className="flex flex-wrap justify-between p-4 card-header">
                    <h3 className="font-bold text-white">Danh sách rút tiền</h3>
                </div>
                {/* <div className="flex flex-wrap justify-between p-4 card-header">
                    <MenuOption title={'Trạng thái'} />
                </div> */}
                <div className="p-2 card-body overflow-x-auto min-w-[20px]">
                    <Table columns={columns} rowKey="order_code" dataSource={data} onChange={handleChange} />
                </div>
            </div>
        </div>
    );
}

export default HistoryWithdrawal;
