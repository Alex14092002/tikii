import Marquee from 'react-fast-marquee';
import { Link, useNavigate } from 'react-router-dom';

import c7 from '@src/assets/images/c7.png';
import c8 from '@src/assets/images/c8.png';
import { Spin, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import service from '../../services/AppUsers';
import './Home.scss';
import MarqueeComponent from './components/Marquee';
import ProductGroup from './components/ProductGroup';

function Home() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const [listProductType, setListProductType] = useState([]);
    const [loadingComponent, setLoadingComponent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleNavigation = (type) => {
        if (localStorage.getItem('token')) return navigate('/goodlist/' + type);
        navigate('/login');
    };

    const fetchDataProductType = async () => {
        try {
            setIsLoading(true);
            const response = await service.GetListProductType();
            if (response.status === 200) {
                setListProductType(response?.data);
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: 'Không thể lấy dữ liệu từ máy chủ',
                });
            }
            setIsLoading(false);
        } catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Không thể lấy dữ liệu từ máy chủ',
            });
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDataProductType();
    }, [loadingComponent]);

    return (
        <Spin spinning={isLoading}>
            <div className="bg-[#1989fa]">
                <div className="home-page max-w-[640px] mx-auto">
                    <div className="top">
                        <img src={c7} alt="" />
                        <div className="marquee-position">
                            <Marquee>
                                <span className="text-[12px]">
                                    Cảm ơn quý khách hàng đã không ngừng ủng hộ TiKi Mall , TiKi Merchant Mall . Sẽ
                                    triển khai nhiều Chương Trình ưu đãi nhiều hơn nữa . Chúng Tôi mong rằng quý khách
                                    hàng sẽ tuân thủ theo quy định của Công Ty chúng tôi ! Chân Thành Cảm Ơn .
                                </span>
                            </Marquee>
                        </div>
                    </div>
                    <div className="center">
                        <img src={c8} alt="" />
                    </div>

                    <div className="scroll-to-top mt-[30%] mx-auto">
                        <MarqueeComponent />
                    </div>

                    <div
                        className="btn-group grid grid-cols-2 gap-3 w-[88%] mx-auto mt-3"
                        style={{
                            marginTop: '50px',
                        }}
                    >
                        {listProductType.map((item, index) => (
                            <ProductGroup
                                onClick={() => handleNavigation(item.listProductType)}
                                key={index}
                                item={item}
                            />
                        ))}
                    </div>
                    { !(user !== undefined && user !== null && user.id !== undefined && parseInt(user.id) > 0)?
                    <div className='text-center flex item-center justify-center'>
                        <Link className='text-white' to="/login">ĐĂNG NHẬP</Link>       
                        <div className='text-white ml-2 mr-2'>|</div>                 
                        <Link className='text-white' to="/register">ĐĂNG KÝ</Link>
                    </div> : ""
                    }
                </div>
            </div>
        </Spin>
    );
}

export default Home;
