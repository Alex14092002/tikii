import Header from '@src/components/Header';

//import sp7 from '@src/assets/images/sp7.jpg';

import { Modal, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import watch from 'redux-watch';
import {store} from '../../stores';
import convert from '../../helpers/convert';
import { openNotification } from '../../helpers/notification';
import service from '../../services/AppUsers';
import './GoodList.scss';
import Product from './components/Product';

function GoodList() {
    const { type } = useParams();
    const { user } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [products, setListProduct] = useState([]);
    const [eventSale, setEventSale] = useState(null);
    const [status_pay, setStatusPay] = useState(true);

    let w = watch(store.getState, 'user')
    store.subscribe(w((newVal, oldVal, objectPath) => {
        if(newVal.user !== null && newVal.user.status_pay !== undefined){
            setStatusPay(newVal.user.status_pay === 1);
        }
    }))

    const fetchDataProduct = async () => {
        try {
            setLoading(true);
            const response = await service.GetListProductByType(type);
            if (response.status === 200) {
                setListProduct(response.products);
                setEventSale(response.event_sale);
            } else {
                openNotification('error', 'Lỗi', 'Không thể lấy dữ liệu từ máy chủ');
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            openNotification('error', 'Lỗi', 'Không thể lấy dữ liệu từ máy chủ');
        }
    };

    const handleShowConfirm = (product, event) => {
        if(status_pay === false){
            return openNotification('warning', 'Thông báo', 'Tài khoản Quý khách đang bị khóa giao dịch');
        }
        if(!event) {
            return openNotification('error', 'Lỗi', 'Sản phẩm này không có sự kiện giảm giá');
        }
        let price_receive = product?.full_price + product?.sale_price;

        Modal.confirm({
            title: 'Thông báo',
            content: `Xác nhận mua sản phẩm với giá ${product.full_price.toLocaleString()} đ. Bạn sẽ nhận được ${price_receive.toLocaleString()} khi sự kiện kết thúc?`,
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk() {
                confirmBuy(product);
            },
            okButtonProps: {
                style: {
                    backgroundColor: '#ff6600',
                },
            },
        });
    };

    const confirmBuy = async (product) => {
        try {
            const data_send = {
                product_type: product.product_type,
                product_id: product?.id,
                event_id: eventSale.id,
            };
            const response = await service.BuyProduct(data_send);
            if (response.status === 200) {
                openNotification('success', response.message);
            } else {
                openNotification('error', 'Lỗi', response.message);
            }
        } catch (error) {
            openNotification('error', 'Lỗi', 'Không thể mua sản phẩm');
        }
    };

    const handleEventEnd = async () => {
        try {
            const data_send = {
                event_id: eventSale.id,
            };
            const response = await service.EventEnd(data_send);
            if (response.status === 200) {
                fetchDataProduct();
            }
        } catch (error) {
            openNotification('error', 'Lỗi', 'Lỗi máy chur');
        }
    };

    useEffect(() => {
        fetchDataProduct();
    }, [type]);

    useEffect(() => {
        if(user !== null){
            setStatusPay(user.status_pay === 1);
        }
    }, [type]);

    const [stringCountdown, setStringCountdown] = useState('');
    let interval;
    useEffect(() => {
        if (eventSale && status_pay === true) {
            interval = setInterval(() => {
                const now = new Date().getTime();
                const distance = new Date(eventSale?.expired_at).getTime() - now;
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                if (distance < 0) {
                    clearInterval(interval);
                    setStringCountdown('Đã kết thúc');
                    handleEventEnd();
                    return;
                }
                setStringCountdown(convert.timeString(days, hours, minutes, seconds));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [eventSale, status_pay]);

    return (
        <Spin spinning={loading}>
            <div className="page-goodlist">
                <Header title="Danh sách sản phẩm" />
                <div className="pt-[46px]">
                        {
                        status_pay === true ?
                        <>
                            <div className="text-[#0000ff] text-lg text-center py-2">Đang đợi để yêu cầu phiếu giảm giá</div>
                            <div className="text-[#0000ff] text-lg text-center py-2">
                                Thời gian phiếu kết thúc:{' '}
                                {<span className="text-[#ff0000] font-semibold">{stringCountdown}</span>}{' '}
                            </div>
                        </> : 
                        <div className='bg-rose-400	p-2.5 text-center text-white'>
                            Tài khoản Quý khách đang bị khóa giao dịch<br />
                            Vui lòng <Link to={`/my?direct=support`} className='underline'>liên hệ với CSKH</Link>
                        </div>
                        }
                    <div className="products px-3 mb-14">
                        {products.map((product, index) => {
                            return (
                                <Product
                                    event={eventSale}
                                    product={product}
                                    key={index}
                                    onClick={() => handleShowConfirm(product, eventSale)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </Spin>
    );
}

export default GoodList;
