import {
    faBuildingColumns,
    faChevronLeft,
    faDollarSign,
    faKey,
    faLock,
    faPenNib,
    faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import img_header from '@src/assets/images/img-header.jpg';
import Loading from '@src/libs/Loading';
import AppAdmins from '@services/AppAdmins';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { DatePicker, Statistic } from 'antd';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

function formatMoney(money = 0, type = ',') {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${type}`);
}

function formateT(params) {
    let result = params < 10 ? '0' + params : params;
    return result;
}

const dateFormat = 'YYYY-MM-DD';

const formatter = (value) => (
    <CountUp className="text-[#7367f0] text-[1.25rem]" end={value} separator="." duration={1.25} />
);

function EditUser() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [userData, setUserData] = useState({});
    const date = new Date();
    const years = formateT(date.getFullYear());
    const months = formateT(date.getMonth() + 1);
    const days = formateT(date.getDate());

    const [startDate, setStartDate] = useState(`01/${months}/${years}`);
    const [endDate, setEndDate] = useState(`${days}/${months}/${years}`);
    const [analytics, setAnalytics] = useState('');

    const [NameBank, setNameBank] = useState('');
    const [NameUser, setNameUser] = useState('');
    const [Stk, setStk] = useState('');
    const [walletUsdt, setWalletUsdt] = useState('');
    useEffect(() => {
        (async () => {
            Loading(true);
            let { data } = await AppAdmins.GetUserDetail({ userId });
            setUserData(data);
            Loading(false);
            setNameBank(data.name_bank);
            setNameUser(data.full_name);
            setStk(data.number_bank);
            setWalletUsdt(data.wallet_usdt);
        })();
    }, []);

    // useEffect(() => {
    //     (async () => {
    //         Loading(true);
    //         let { data } = await AppAdmins.StatisticalUserDetails(userId, startDate, endDate);
    //         setAnalytics(data);
    //         Loading(false);
    //     })();
    // }, [startDate, endDate]);

    const handleUpdate = async () => {
        Loading(true);
        await AppAdmins.EditBankCard(userId, NameBank, NameUser, Stk, walletUsdt);
        Loading(false);
        toast.success(`🚀 Cập nhật thành công!`, {
            position: 'top-right',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    };

    return (
        <>
            <div className="bg-white rounded-md mt-8 p-2">
                <div className="flex justify-between items-center py-3 text-md text-black">
                    <div onClick={() => navigate(-1)} className="flex items-center cursor-pointer">
                        <FontAwesomeIcon icon={faChevronLeft} />
                        <p className="ml-2 font-semibold">Trở về</p>
                    </div>
                    <h3 className="flex-1 text-center font-semibold mr-16">Thông tin người dùng</h3>
                    <div></div>
                </div>
                <div className="w-full flex flex-col justify-center">
                    <img className="rounded-full w-[100px] h-[100px] mx-auto" src={img_header} alt="" />
                    <h3 className="text-center py-2 font-semibold text-[#ea5455]">
                        Số dư: {formatMoney(Math.round(userData?.money), '.')}
                    </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-2">
                    <div>
                        <label className="text-[#5e5873] text-[.9rem]" htmlFor="phone">
                            Tài khoản
                        </label>
                        <input
                            id="phone"
                            type="text"
                            disabled
                            defaultValue={userData?.phone}
                            placeholder="Tài khoản"
                            className="w-full duration-300 border bg-[#efefef] text-[#888] border-[#d8d6de] rounded-md focus:border-[#7367f0] outline-none p-1 pl-2"
                        />
                    </div>
                    <div>
                        <label className="text-[#5e5873] text-[.9rem]" htmlFor="daily_invite">
                            Tổng nạp
                        </label>
                        <input
                            id="daily_invite"
                            type="text"
                            disabled
                            value={formatMoney(Math.round(userData?.ResultRecharge), '.')}
                            placeholder="Tổng nạp"
                            className="w-full duration-300 border bg-[#efefef] text-[#888] border-[#d8d6de] rounded-md focus:border-[#7367f0] outline-none p-1 pl-2"
                        />
                    </div>
                    <div>
                        <label className="text-[#5e5873] text-[.9rem]" htmlFor="refferer">
                            Tổng rút
                        </label>
                        <input
                            id="refferer"
                            type="text"
                            disabled
                            value={formatMoney(Math.round(userData?.ResultWithdrawl), '.')}
                            placeholder="Tổng rút"
                            className="w-full duration-300 border bg-[#efefef] text-[#888] border-[#d8d6de] rounded-md focus:border-[#7367f0] outline-none p-1 pl-2"
                        />
                    </div>
                    <div>
                        <label className="text-[#5e5873] text-[.9rem]" htmlFor="ip_address">
                            Địa chỉ IP
                        </label>
                        <input
                            disabled
                            id="ip_address"
                            type="text"
                            defaultValue={userData?.ip_address}
                            className="w-full bg-[#efefef] text-[#888] duration-300 border border-[#d8d6de] rounded-md focus:border-[#7367f0] outline-none p-1 pl-2"
                        />
                    </div>
                    <div>
                        <label className="text-[#5e5873] text-[.9rem]" htmlFor="time">
                            Ngày đăng ký
                        </label>
                        <input
                            disabled
                            id="time"
                            type="text"
                            defaultValue={userData?.createdAt}
                            className="w-full duration-300 border bg-[#efefef] text-[#888] border-[#d8d6de] rounded-md focus:border-[#7367f0] outline-none p-1 pl-2"
                        />
                    </div>
                    <div></div>
                    <div>
                        <label className="text-[#5e5873] text-[.9rem]" htmlFor="name_bank">
                            Tên ngân hàng
                        </label>
                        <input
                            id="name_bank"
                            type="text"
                            placeholder="Tên ngân hàng"
                            className="w-full duration-300 border border-[#d8d6de] rounded-md focus:border-[#7367f0] outline-none p-1 pl-2"
                            value={NameBank}
                            onChange={(e) => setNameBank(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-[#5e5873] text-[.9rem]" htmlFor="name_user">
                            Chủ tài khoản
                        </label>
                        <input
                            id="name_user"
                            type="text"
                            placeholder="Chủ tài khoản"
                            className="w-full duration-300 border border-[#d8d6de] rounded-md focus:border-[#7367f0] outline-none p-1 pl-2"
                            value={NameUser}
                            onChange={(e) => setNameUser(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-[#5e5873] text-[.9rem]" htmlFor="account_number">
                            Số tài khoản
                        </label>
                        <input
                            id="account_number"
                            type="text"
                            placeholder="Số tài khoản"
                            className="w-full duration-300 border border-[#d8d6de] rounded-md focus:border-[#7367f0] outline-none p-1 pl-2"
                            value={Stk}
                            onChange={(e) => setStk(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-[#5e5873] text-[.9rem]" htmlFor="walletUsdt">
                            Địa chỉ ví
                        </label>
                        <input
                            id="walletUsdt"
                            type="text"
                            placeholder="Địa chỉ ví"
                            className="w-full duration-300 border border-[#d8d6de] rounded-md focus:border-[#7367f0] outline-none p-1 pl-2"
                            value={walletUsdt}
                            onChange={(e) => setWalletUsdt(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row my-5 pt-10 gap-5 text-white">
                    <button
                        onClick={() => handleUpdate()}
                        className="duration-300 w-full min-w-[105px] p-2 px-5 rounded-md text-md border border-[#7367f0] bg-[#7367f0] hover:text-[#7367f0] hover:bg-[#fff]"
                    >
                        <FontAwesomeIcon className="mr-2" icon={faPenNib} />
                        <span>Cập nhật</span>
                    </button>
                    <button className="duration-300 w-full min-w-[105px] p-2 px-5 rounded-md text-md border text-[#7367f0] border-[#7367f0] hover:text-[#fff] hover:bg-[#7367f0]">
                        <FontAwesomeIcon className="mr-2" icon={faLock} />
                        <span className="">Khóa</span>
                    </button>
                    <button className="duration-300 w-full min-w-[105px] p-2 px-5 rounded-md text-md border text-[#ea5455] border-[#ea5455] hover:text-[#fff] hover:bg-[#ea5455]">
                        <FontAwesomeIcon className="mr-2" icon={faKey} />
                        <span className="">Đổi mật khẩu</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default EditUser;
