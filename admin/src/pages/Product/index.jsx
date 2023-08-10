import React, { useEffect, useRef, useState } from 'react';
import { Table, Modal, Button } from 'antd';
import Tippy from '@tippyjs/react';
import { toast } from 'react-toastify';
import Loading from '@src/libs/Loading';
import Helper from '../../utils/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLockOpen, faLock, faPen, faPlus
} from '@fortawesome/free-solid-svg-icons';
import CreateProduct from './CreateProduct.jsx';
import EditProduct from './EditProduct.jsx';
import AppAdmins from '@services/AppAdmins';
import { BASE_URL } from '../../../settings.json';

const { confirm } = Modal;

function Product() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open_edit_product, setOpenEditProduct] = useState(false);
    const [product_info, setProductInfo] = useState(null);
    const fetchProduct = async () => {
        Loading(true);
        let { data } = await AppAdmins.GetProductList();
        setData(data);
        Loading(false);
    }
    const updateLockProduct = (id, row) => {
        confirm({
            centered: true,
            title: <div>Bạn thật sự muốn {row.is_lock===1?"mở ":""}khóa sản phẩm?</div>,
            content: row.product_name,
            onOk() {
                runUpdateLockProduct(id, row);
            },
        });
    };
    const runUpdateLockProduct = async (id, row) => {
        Loading(true);
        let result = await AppAdmins.UpdateLockProduct(id);
        toast(`🚀  Đã ${row.is_lock === 1 ? ' mở' : 'khóa'} sản phẩm thành công!`, {
            position: 'top-right',
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
        if(result.product !== undefined && result.product.id !== undefined && result.product.id > 0){
            for(let i = 0; i < data.length; i++){
                if(data[i].id === result.product.id){
                    data[i] = {
                        ...result.product
                    }
                }
            }
            setData([...data]);
        }
        Loading(false);
    };

    const showEditProduct = (info) => {
        setProductInfo(info);
        setOpenEditProduct(true);
    }

    const closeModalEdit = () => {
        setProductInfo(null);
        setOpenEditProduct(false);
    }

    useEffect(() => {
        (async () => {
            fetchProduct();
        })();
    }, []);
    const columns = [
        {
            title: '',
            dataIndex: 'image_path',
            key: 'image_path',
            width: '5%',
            render: (image_path) => {
                return (
                    <img src={BASE_URL + 'images/' + image_path} alt="" width={100} />
                );
            },
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'product_name',
            key: 'product_name',
            width: '20%',
        },
        {
            title: 'Danh mục',
            dataIndex: 'product_type',
            key: 'product_type',
            width: '10%',
            render: (product_type, dataObj) => {
                return (
                    <p>
                        {product_type == 1 && 'Đồ gia dụng'}
                        {product_type == 2 && 'Điện tử'}
                        {product_type == 3 && 'Sang trọng'}
                        {product_type == 4 && 'Trang điểm'}
                    </p>
                );
            },
        },
        {
            title: 'Giá bán',
            dataIndex: 'full_price',
            key: 'full_price',
            width: '10%',
            render: (full_price) => <a className="text-[#7367f0] font-semibold">{Helper.formatMoney(full_price)}</a>,
        },
        {
            title: 'Thao tác',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            render: (id, row) => (
                <div className='flex item-center justify-center'>
                    <div className='mr-2.5'>
                        <Tippy placement="right-end" content="Sửa thông tin" delay={[0, 70]}>
                            <div onClick={() => showEditProduct(row)} className="text-[#28c76f]">
                            <FontAwesomeIcon className="text-lg cursor-pointer" icon={faPen} />
                            </div>
                        </Tippy>
                    </div>
                    <div>
                        <Tippy placement="right-end" content={row.is_lock === 1?"Mở khóa sản phẩm":"Khóa sản phẩm"} delay={[0, 70]}>
                            <div onClick={() => updateLockProduct(id, row)} className={row.is_lock === 1?"text-[#EF4444]":"text-[#28c76f]"}>
                            {row.is_lock === 0 && <FontAwesomeIcon className="text-lg cursor-pointer" icon={faLockOpen} />}
                            {row.is_lock === 1 && <FontAwesomeIcon className="text-lg cursor-pointer" icon={faLock} />}
                            </div>
                        </Tippy>
                    </div>
                </div>
            ),
            ellipsis: true,
        },
    ];

    return (
        <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#111c45] col-span-3 rounded-md">
                <div className="flex flex-wrap justify-between p-4 card-header">
                    <h3 className="font-bold text-white">Danh sách sản phẩm</h3>
                    <CreateProduct setLoading={setLoading} loading={loading} fetchProduct={fetchProduct} />
                </div>
                <div className="p-2 card-body overflow-x-auto min-w-[20px]">
                    <Table columns={columns} rowKey="id" dataSource={data} />
                </div>
            </div>
            <EditProduct setLoading={setLoading} loading={loading} fetchProduct={fetchProduct} open={open_edit_product} close={closeModalEdit} productInfo={product_info} />
        </div>
    );
}

export default Product;
