import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import Joi from 'joi';

import AppUsers from '@src/services/AppUsers';
import Header from '@src/components/Header';
import './WalletUSDT.scss';

function WalletUSDT() {
    //const navigate = useNavigate();
    const [is_edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        wallet_usdt: '',
    });
    const [cardInfo, setCardInfo] = useState(formData);


    const schema = Joi.object({
        wallet_usdt: Joi.string().max(100).required(),
    });

    const GetBankCard = async () => {
        return await AppUsers.GetBankCard()
    }

    useEffect(() => {
        GetBankCard().then(data => {
            if (data) {
                let wallet_usdt = (data?.wallet_usdt !== null)?data?.wallet_usdt:'';
                setFormData({
                    wallet_usdt
                });
                setCardInfo(data);
                
                if(wallet_usdt != ''){
                    setEdit(true);
                }
            }
        });
    }, []);

    const handleAddBankCard = async () => {
        const { error } = schema.validate(formData);
        if (error) return message.error("Vui lòng nhập đầy đủ thông tin");

        const res = await AppUsers.AddBankCard(formData);
        if (res.status === 2) return message.error(res.message);
        if (res.status === 1) {
            message.success(res.message);
            /*setFormData({
                wallet_usdt: '',
            });*/
        }
    }
    return (
        <div className='page-card-usdt'>
            <Header title="Địa chỉ USDT ràng buộc" />
            <div className='pt-[46px] px-1'>
                <div className='flex items-center border-y-[1px] border-[#ebedf0]'>
                    <div className="w-[160px] label whitespace-nowrap">Địa chỉ USDT </div>
                    <input
                        className={classNames('w-full outline-none py-1.5 text-[#323233]', { "text-gray-500": cardInfo.wallet_usdt })}
                        type="text"
                        placeholder='Vui lòng nhập địa chỉ USDT của bạn'
                        value={formData.wallet_usdt}
                        onChange={(e) => setFormData((prev) => ({ ...prev, wallet_usdt: e.target.value.trim() }))}
                    />
                </div>
                <div onClick={() => handleAddBankCard()} className='bg-[#1989fa] py-1.5 mx-12 rounded-full text-center mt-12 border-[1px] border-[#2196f3]'>
                    <span className='text-white text-sm'>{is_edit === true?"Lưu thông tin":"Liên kết ví"}</span>
                </div>
            </div>
        </div>
    );
}

export default WalletUSDT;