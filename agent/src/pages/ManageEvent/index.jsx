import { TYPE_PRODUCT } from '@src/constants/productType';
import AppAdmins from '@src/services/AppAdmins';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CreateEvent from './components/CreateEvent';
import ModalEvent from './components/ModalEvent';
import Loading from '@src/libs/Loading';
import _ from 'lodash';
import useDebounce from '@src/helper/debounce';

function ManageEvent() {
    const [open, setOpen] = useState(false);
    const [dataRecord, setDataRecord] = useState({});
    const [events, setEvents] = useState([]);

    let current_time = new Date().getTime();

    const debouce = useDebounce(2000);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            ellipsis: true,
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'User.username',
            key: 'User.username',
            ellipsis: true,
            width: 200,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'User.phone',
            ellipsis: true,
            key: 'User.phone',
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'listProductType',
            ellipsis: true,
            key: 'listProductType',
            render: (_, record) => <span>{TYPE_PRODUCT[record.listProductType]}</span>,
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'expired_at',
            ellipsis: true,
            key: 'expired_at',
            render: (_, record) => (
                <span>
                    {new Date(record.expired_at).getTime() > current_time
                        ? new Date(record.expired_at).toLocaleString()
                        : 'Đã kết thúc'}
                </span>
            ),
        },
        {
            title: 'Giảm giá',
            dataIndex: 'percent_sale',
            ellipsis: true,
            key: 'percent_sale',
            render: (_, record) => <span>{record.percent_sale}%</span>,
        },
    ];

    async function fetchDataEvent(phone) {
        try {
            Loading(true);
            const response = await AppAdmins.GetListEvent(phone);
            if (response.status === 200) {
                setEvents(response.data);
            } else {
                toast.error('Không thể lấy dữ liệu sự kiện');
            }
            Loading(false);
        } catch (error) {
            console.log(error);
            toast.error('Không thể lấy dữ liệu sự kiện');
            Loading(false);
        }
    }

    function searchEvent(e) {
        if (e.target.value === '') return fetchDataEvent();

        debouce(() => {
            fetchDataEvent(e.target.value);
        });
    }

    useEffect(() => {
        fetchDataEvent();
    }, []);

    return (
        <>
            <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="bg-[#111c45] col-span-3 rounded-md">
                    <div className="flex flex-wrap justify-between p-4 card-header">
                        <h3 className="font-bold text-white">Danh sách sự kiện</h3>
                        <div className="mt-2 sm:mt-1">
                            <input
                                className="duration-200 search rounded-md p-1 pl-2 w-[300px] outline-none"
                                type="search"
                                placeholder="Tìm kiếm"
                                spellCheck="false"
                                onChange={(e) => searchEvent(e)}
                            />
                        </div>
                        <CreateEvent />
                    </div>
                </div>
            </div>
            <Table scroll={500} sticky columns={columns} rowKey="id" dataSource={events} />
            {open && (
                <ModalEvent open={open} setData={setDataRecord} data={dataRecord} setOpen={setOpen} type="update" />
            )}
        </>
    );
}

export default ManageEvent;
