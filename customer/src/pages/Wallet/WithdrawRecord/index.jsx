
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { message } from 'antd';

import AppUsers from '@src/services/AppUsers';
import Header from '@src/components/Header';
// import './TransactionHistory.scss';

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

function WithdrawRecord() {
    const [withdraws, setWithdraws] = useState([]);

    const GetBankCard = async () => {
        return await AppUsers.GetWithdrawRecord()
    }

    const cancelWithdraw = async (order_code) => {
        Swal.fire({
            title: '',
            text: "Quý khách thật sự muốn hủy lệnh rút này không?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Bỏ qua'
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log("order_code: ", order_code);
                let result_cancel = await AppUsers.CancelWithdrawRecord(order_code);
                if(result_cancel.status === 1){
                    Swal.fire(
                        '',
                        result_cancel.message,
                        'success'
                    );
                    GetBankCard().then(data => setWithdraws(data));
                } 
                else if(result_cancel.allow_cancel === true){
                    GetBankCard().then(data => setWithdraws(data));
                }
            }
        })
    }


    const formatMoneyVN = (money = '0') => {
        return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    const Copy = text => {
        message.success("Sao chép thành công");
        navigator.clipboard.writeText(text)
    };


    useEffect(() => {
        GetBankCard().then(data => setWithdraws(data));
    }, []);


    return (
        <div className='page-payment-history'>
            <Header title="Lịch sử giao dịch" />
            <div className='pt-[46px]'>
                <div className='list-items'>
                    {withdraws.map((item, index) => {
                        return (
                            <div key={index} className="flex justify-between border-b p-3">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1">
                                        <span className="text-black select-none" onClick={() => Copy(item.order_code)}>
                                            {item.order_code}
                                            <FontAwesomeIcon className='cursor-pointer px-3' icon={faCopy} />
                                        </span>
                                    </div>
                                    <span className={classNames("font-medium", item.status === 2 ? "text-red-500" : item.status === 1 ? "text-green-500" : "text-yellow-500")}>
                                        {formatMoneyVN(item.amount)} ₫
                                    </span>
                                    <span className="text-gray-500">{item.createdAt}</span>
                                </div>
                                <div>
                                    <h3 className={classNames("font-medium", item.status === 2 ? "text-red-500" : item.status === 1 ? "text-green-500" : item.status === 3?"text-rose-500":"text-yellow-500")}>
                                        {item.status === 2 ? "Thất bại" : item.status === 1 ? "Thành công" : item.status === 3?"Đã hủy":"Đang chờ"}
                                        {item.status === 0 ? <div style={{display: "inline-block"}}>&nbsp;| <a className="text-rose-500 cursor-pointer" onClick={() => cancelWithdraw(item.order_code)}>Hủy lệnh</a></div>:""}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='text-center'>
                    <span className='no-data'>{withdraws.length > 0 ? 'Không còn nữa' : 'Chưa có dữ liệu'}</span>
                </div>
            </div>
        </div>
    );
}

export default WithdrawRecord;