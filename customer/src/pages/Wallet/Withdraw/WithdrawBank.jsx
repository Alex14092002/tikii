import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { message } from 'antd';

import AppUsers from '@src/services/AppUsers';
import watch from 'redux-watch';
import { useDispatch, useSelector } from 'react-redux';
import {store} from '../../../stores';
import { setUser } from '../../../stores/userSlice';

function WithdrawBank() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const [amount, setAmount] = useState({ amount: '' });
    const [status_pay, setStatusPay] = useState(true);
    const [money, setMoney] = useState(0);

    let w = watch(store.getState, 'user')
    store.subscribe(w((newVal, oldVal, objectPath) => {
        if(newVal.user !== null && newVal.user.status_pay !== undefined){
            setStatusPay(newVal.user.status_pay === 1);
            setMoney(newVal.user.money);
        }
    }))

    const handleWithdraw = async () => {
        const res = await AppUsers.Withdraw(amount);

        if (res.status === 2) return message.error(res.message);
        if (res.status === 1) {
            message.success(res.message);
            const response = await AppUsers.GetUserInfo();
            if (response && response.phone) {
                dispatch(setUser(response));
            }
            setTimeout(() => {
                navigate('/withdraw-record');
            }, 1000);
        }
    };

    useEffect(() => {
        if(user !== null){
            setStatusPay(user.status_pay === 1);
            setMoney(user.money);
        }
    }, []);

    return (
        <>
            <div className="flex justify-between items-center p-3 border-b-[1px] border-[#ebedf0]">
                <span className="text-[#323233] text-sm font-semibold">Kiểu tài khoản</span>
                <span className="text-[#969799] text-sm">Tài khoản trung tâm mua sắm</span>
            </div>
            <div className="flex justify-between items-center p-3 border-b-[1px] border-[#ebedf0]">
                <span className="text-[#323233] text-sm font-semibold">Số dư</span>
                <span className="text-[#000000] text-sm">{money.toLocaleString() || 0}</span>
            </div>
            <div className="flex flex-col justify-between items-start p-3 border-b-[1px] border-[#ebedf0] bg-[#f7f8fa]">
                <p className="text-[#323233] text-sm font-semibold">Rút tiền bằng thẻ ngân hàng</p>
                <span className="text-[#969799] text-[0.8rem] mt-1">
                    Số tiền tối thiểu cho một lần rút tiền là 50.000₫, tối đa 5.000.000.000₫, phí ngân hàng 0₫ phí xử lý!
                </span>
            </div>
            <div className="flex items-center p-3 border-b-[1px] border-[#ebedf0]">
                <div className="w-[120px] text-sm font-semibold">Số tiền rút </div>
                <input
                    type="text"
                    className="w-full outline-none py-1.5 text-sm"
                    placeholder="Vui lòng nhập số tiền rút (bắt buộc)"
                    value={amount.amount}
                    onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
                    onChange={(e) => setAmount({ amount: e.target.value })}
                />
            </div>
            {
              status_pay === true ?
            <div
                onClick={() => handleWithdraw()}
                className="bg-[#1989fa] py-3 mx-12 rounded-full text-center mt-12 border-[1px] border-[#2196f3]"
            >
                <span className="text-white text-sm">Xác nhận gửi</span>
            </div> : 
            <div className='bg-rose-400	p-2.5 text-center text-white'>
                Tài khoản Quý khách đang bị khóa giao dịch<br />
                Vui lòng <Link to={`/my?direct=support`} className='underline'>liên hệ với CSKH</Link>
            </div>
            }
        </>
    );
}

export default WithdrawBank;
