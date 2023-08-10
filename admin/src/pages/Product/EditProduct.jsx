import Loading from '@src/libs/Loading';
import AppAdmins from '@src/services/AppAdmins';
import { FileImageOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Input, Select, Button, Modal, InputNumber } from 'antd';
import { toast } from 'react-toastify';
import {BASE_URL} from '../../../settings.json';

function EditProduct({ setLoading, loading, fetchProduct, productInfo, open, close }) {
    const [isOpenEditProduct, setEditProduct] = useState(false);
    const [product_id, setProductId] = useState(0);
    const [product_name, setProductName] = useState('');
    const [product_type, setProductType] = useState("");
    const [full_price, setFullPrice] = useState('');
    const [product_type_options, setProductTypeOptions] = useState([]);
    const [preview_avatar, setAvatar] = useState('');

    const getProductTypeOptions = async () => {
        let response = await AppAdmins.GetProductType();
        if (response.status === 200) {
            let options = [];
            response?.data.forEach(item => {
                options.push({
                    value: parseInt(item.listProductType),
                    label: item.name
                });
            });
            setProductTypeOptions(options);
        }
    }

    const handleSelectImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditProduct = async () => {
        const file = document.querySelector('#file').files[0];
        if (!product_name || !product_type || !full_price || !file) {
            return toast.error('Hãy nhập đầy đủ thông tin', {
                position: 'top-right',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }

        Loading(true);
        const formData = new FormData();
        formData.append('product_upload', 1);
        formData.append('file', file);
        const response_file = await AppAdmins.UploadFile(formData);
        let image_path = '';
        if (response_file.status === 200) {
            image_path = response_file.file_name;
        }
        let data = await AppAdmins.UpdateProduct(product_id, { product_name, product_type, full_price, image_path });
        Loading(false);

        if (data.status !== 1) {
            return toast.error(`${data.message}`, {
                position: 'top-right',
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }

        toast.success(`🚀 ${data.message}`, {
            position: 'top-right',
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

        setLoading(!loading);
        setEditProduct(false);
        fetchProduct();
    };

    useEffect(() => {
        getProductTypeOptions();
    }, []);

    useEffect(() => {
       if(productInfo !== null){
            setProductId(productInfo.id);
            setProductName(productInfo.product_name);
            setProductType(productInfo.product_type);
            setFullPrice(productInfo.full_price);
            setAvatar(BASE_URL + 'images/' + productInfo.image_path);
       }
       setEditProduct(open);
       return () => {
            
       }
    }, [productInfo, open]);

    return (
        <>
            <Modal
                width={500}
                centered={true}
                title="Sửa thông tin sản phẩm"
                open={isOpenEditProduct}
                okText={"Lưu thông tin"}
                cancelText={"Đóng lại"}
                onOk={() => handleEditProduct()}
                onCancel={() => { setEditProduct(false); close() } }
            >
                <div className="mt-4">
                    <label htmlFor="product_type" className="text-[#888]">
                        Loại sản phẩm
                    </label>
                    <Select
                        id="product_type"
                        labelInValue
                        value={{
                            value: product_type,
                        }}
                        style={{
                            width: '100%',
                        }}
                        onChange={(data) => setProductType(data.value)}
                        options={product_type_options}
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="product_name" className="text-[#888]">
                        Tên sản phẩm
                    </label>
                    <Input
                        type="text"
                        id="product_name"
                        value={product_name}
                        placeholder="Nhập tên sản phẩm"
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="full_price" className="text-[#888]">
                        Giá bán
                    </label>
                    <InputNumber
                        prefix="đ"
                        className='w-full'
                        id="full_price"
                        placeholder="Nhập giá bán"
                        value={full_price}
                        style={{
                            width: '100%',
                        }}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        onChange={(value) => {
                            setFullPrice(value);
                        }}
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="file" className="text-[#888]">
                        Hình đại diện
                    </label>
                    <input
                        id="file"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                            handleSelectImage(e);
                        }}
                    />
                    <div
                        className='cursor-pointer'
                        onClick={() => {
                            document.getElementById('file').click();
                        }}
                    >
                        {preview_avatar == '' && <FileImageOutlined
                            style={{
                                color: '#1989fa',
                                fontSize: '80px',
                            }}
                            size={20}
                        />}
                        {preview_avatar && <img width={100} height={100} src={preview_avatar} alt="" />}
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default EditProduct;
