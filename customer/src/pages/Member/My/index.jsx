import { faBuildingColumns, faChevronRight, faMoneyBill, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import tiki from '@src/assets/images/2.png';
import Header from '@src/components/Header';
import AppUsers from '@src/services/AppUsers';
import { message } from 'antd';
import './My.scss';
import convert from '../../../helpers/convert';
import ModalSupport from './components/ModalSupport';
import { setUser } from '../../../stores/userSlice';

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

function My() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [settings, setSettings] = useState({});
    const [showModal, setShowModal] = useState(false);

    const Copy = (text) => {
        message.success('Sao chép thành công');
        navigator.clipboard.writeText(text);
    };

    const GetUserInfo = async () => {
        return await AppUsers.GetUserInfo();
    };

    const GetSettings = async () => {
        return await AppUsers.GetSettings();
    };

    const handleMarkDone = async (support_id) => {
        const data = {
            status: 'done',
            support_id,
        };
        const response = await AppUsers.EditSupport(data);
    
        if (response.status_code === 200) {
            return 1
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: response.message,
            });
        }
    };

    const handleShowModalSupport = async () => {
        if (parseInt(localStorage.getItem('support_id'))) {
            await handleMarkDone(localStorage.getItem('support_id'))
            localStorage.removeItem('support_id')
        }

        const user_id = sessionStorage.getItem('user_id');
        if (user_id) return setShowModal(true);
        sessionStorage.setItem('user_id', makeid(7));
        setShowModal(true);
    };

    useEffect(() => {
        GetUserInfo().then((data) => {
            setUserInfo(data);
            dispatch(setUser(data));
        });
        GetSettings().then((data) => setSettings(data));
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get('direct') == 'support'){
            handleShowModalSupport();
        }
    }, []);

    return (
        <div className="page-my pb-16">
            <Header title="Trung tâm cá nhân" />

            <div className="top pt-[46px]">
                <div className="flex p-4">
                    <div>
                        <img width="80" height="80" src={tiki} alt="" />
                    </div>
                    <div className="text-white text-sm font-medium pl-3">
                        <p className="text-overflow-name">Cửa hàng: {userInfo?.name_store}</p>
                        <p className="text-overflow-name">Tài khoản: {userInfo?.username}</p>
                        <p className="text-overflow-name">Điện thoại: {userInfo?.phone}</p>
                        <p>Hội viên: Thành viên trung tâm thương mại</p>
                        <p
                            className="flex items-center cursor-pointer select-none"
                            onClick={() => Copy(userInfo?.invite)}
                        >
                            ID: {userInfo?.invite}
                            <FontAwesomeIcon className="ml-1.5" icon={faCopy} />
                        </p>
                    </div>
                    {(userInfo?.grade !== undefined && userInfo?.grade !== null && userInfo?.grade != '')?
                    <div className='grade'>
                        <div className='grade__text flex items-center justify-center'>
                        {userInfo?.grade == 'VIP-Hoang-Kim'?<span>VIP<br />Hoàng Kim</span>:<span>{userInfo?.grade}</span>}
                        </div>
                    </div>
                    :""}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 py-3">
                <div className="flex flex-col justify-center items-center">
                    <div className="bg-[#ebedf0] rounded-xl p-4">
                        <FontAwesomeIcon icon={faMoneyBill} />
                    </div>
                    <span className="font-medium text-[#646566] text-sm mt-1">
                        {convert.toVND(userInfo?.money) || 0}
                    </span>
                </div>
                <div onClick={() => navigate('/recharge')} className="flex flex-col justify-center items-center">
                    <div className="bg-[#ebedf0] rounded-xl p-4">
                        <FontAwesomeIcon icon={faWallet} />
                    </div>
                    <span className="font-medium text-[#646566] text-sm mt-1">Nạp tiền</span>
                </div>
                <div onClick={() => navigate('/withdraw')} className="flex flex-col justify-center items-center">
                    <div className="bg-[#ebedf0] rounded-xl p-4">
                        <FontAwesomeIcon icon={faBuildingColumns} />
                    </div>
                    <span className="font-medium text-[#646566] text-sm mt-1">Rút tiền</span>
                </div>
            </div>

            <div className="space"></div>

            <div className="list-action select-none">
                <div onClick={() => navigate('/card')} className="item-action">
                    <span>Liên kết thẻ ngân hàng</span>
                    <FontAwesomeIcon className="text-[#969799]" icon={faChevronRight} />
                </div>
                <div onClick={() => navigate('/buy-history')} className="item-action">
                    <span>Lịch sử mua hàng</span>
                    <FontAwesomeIcon className="text-[#969799]" icon={faChevronRight} />
                </div>
                <div onClick={() => navigate('/withdraw-record')} className="item-action">
                    <span>Lịch sử rút tiền</span>
                    <FontAwesomeIcon className="text-[#969799]" icon={faChevronRight} />
                </div>
                <div onClick={() => navigate('/recharge-record')} className="item-action">
                    <span>Lịch sử nạp tiền</span>
                    <FontAwesomeIcon className="text-[#969799]" icon={faChevronRight} />
                </div>
                <div onClick={() => handleShowModalSupport()} className="item-action">
                    <span>Liên hệ với CSKH</span>
                    <FontAwesomeIcon className="text-[#969799]" icon={faChevronRight} />
                </div>
            </div>

            <div
                className="btn-logout rounded-full p-3 text-center select-none"
                onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                }}
            >
                <span>Đăng xuất</span>
            </div>

            {showModal && <ModalSupport open={showModal} setModal={setShowModal} />}
        </div>
    );
}

export default My;
