
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { message } from 'antd';

import AppUsers from '@src/services/AppUsers';
import Header from '@src/components/Header';
// import './RechargeRecord.scss';

function RechargeRecord() {
    const [recharges, setRecharges] = useState([]);

    const GetBankCard = async () => {
        return await AppUsers.GetRechargeRecord()
    }


    const formatMoneyVN = (money = '0') => {
        return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    const Copy = text => {
        message.success("Sao chép thành công");
        navigator.clipboard.writeText(text)
    };


    useEffect(() => {
        GetBankCard().then(data => setRecharges(data));
    }, []);


    return (
        <div className='page-payment-history'>
            <Header title="Lịch sử nạp tiền" />
            <div className='pt-[46px]'>
                <div className='list-items'>
                    {recharges.map((item, index) => {
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
                                    <h3 className={classNames("font-medium", item.status === 2 ? "text-red-500" : item.status === 1 ? "text-green-500" : "text-yellow-500")}>
                                        {item.status === 2 ? "Thất bại" : item.status === 1 ? "Thành công" : "Đang chờ"}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='text-center'>
                    <span className='no-data'>{recharges.length > 0 ? 'Không còn nữa' : 'Chưa có dữ liệu'}</span>
                </div>
            </div>
        </div>
    );
}

export default RechargeRecord;