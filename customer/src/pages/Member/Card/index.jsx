//import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import Joi from 'joi';

import AppUsers from '@src/services/AppUsers';
import Header from '@src/components/Header';
import './Card.scss';
import classNames from 'classnames';
import convert from '../../../helpers/convert';

function Card() {
    //const navigate = useNavigate();
    const [is_edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        name_bank: '',
        number_bank: '',
        wallet_usdt: '',
    });
    const [cardInfo, setCardInfo] = useState(formData);

    const schema = Joi.object({
        full_name: Joi.string().max(100).required(),
        name_bank: Joi.string().max(100).required(),
        number_bank: Joi.string().max(100).required(),
        wallet_usdt: Joi.any().optional(),
    });

    const GetBankCard = async () => {
        return await AppUsers.GetBankCard();
    };

    useEffect(() => {
        GetBankCard().then((data) => {
            if (data) {
                let full_name = (data?.full_name !== null)?data?.full_name:'';
                let name_bank = (data?.name_bank !== null)?data?.name_bank:'';
                let number_bank = (data?.number_bank !== null)?data?.number_bank:'';
                setFormData({
                    full_name,
                    name_bank,
                    number_bank,
                    wallet_usdt: '',
                });
                if(full_name != '' || name_bank != '' || number_bank != ''){
                    setEdit(true);
                }
                setCardInfo(data);
            }
        });
    }, []);

    const handleAddBankCard = async () => {
        const { error } = schema.validate(formData);
        //console.log(error);
        if (error) return message.error('Vui lòng nhập đầy đủ thông tin');

        const res = await AppUsers.AddBankCard({ ...formData });
        if (res.status === 2) return message.error(res.message);
        if (res.status === 1) {
            message.success(res.message);
            /*setFormData({
                full_name: '',
                name_bank: '',
                number_bank: '',
                wallet_usdt: '',
            });*/
        }
    };
    return (
        <div className="page-card">
            <Header title="Liên kết thẻ ngân hàng" />
            <div className="pt-[46px] px-1">
                <div className="flex items-center border-y-[1px] border-[#ebedf0]">
                    <div className="w-[150px] label">Chủ tài khoản </div>
                    <input
                        className={classNames('w-full outline-none py-1.5 text-[#323233]', {
                            'text-gray-500': cardInfo.full_name,
                        })}
                        type="text"
                        placeholder="Nhập tên chủ tài khoản"
                        value={formData.full_name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
                    />
                </div>
                <div className="flex items-center border-b-[1px] border-[#ebedf0]">
                    <div className="w-[150px] label">Số tài khoản ngân hàng </div>
                    <input
                        className={classNames('w-full outline-none py-1.5 text-[#323233]', {
                            'text-gray-500': cardInfo.number_bank,
                        })}
                        type="text"
                        placeholder="Nhập số tài khoản ngân hàng"
                        value={
                            formData.number_bank
                            // ? convert.replaceCharacters(formData.number_bank)
                            // : formData.number_bank
                        }
                        onChange={(e) => setFormData((prev) => ({ ...prev, number_bank: e.target.value.trim() }))}
                    />
                </div>
                <div className="flex items-center border-b-[1px] border-[#ebedf0]">
                    <div className="w-[150px] label">Tên ngân hàng </div>
                    <input
                        className={classNames('w-full outline-none py-1.5 text-[#323233]', {
                            'text-gray-500': cardInfo.name_bank,
                        })}
                        type="text"
                        placeholder="Nhập tên ngân hàng"
                        value={formData.name_bank}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name_bank: e.target.value }))}
                    />
                </div>

                <div
                    onClick={() => handleAddBankCard()}
                    className="bg-[#1989fa] py-1.5 mx-12 rounded-full text-center mt-12 border-[1px] border-[#2196f3]"
                >
                    <span className="text-white text-sm">{is_edit ?"Lưu thông tin":"Thêm ngân hàng"}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;
