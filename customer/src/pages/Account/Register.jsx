import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faLock, faMobilePhone, faStore, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { message } from 'antd';
import Joi from 'joi';

import AppUsers from '@src/services/AppUsers';
import './Account.scss';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        phone: '',
        name_store: '',
        username: '',
        password_v1: '',
        refferer: '',
    });

    const schema = Joi.object({
        phone: Joi.string().min(9).max(20).required(),
        username: Joi.string().min(10).max(50).required(),
        name_store: Joi.string().min(5).max(150).required(),
        refferer: Joi.string().required(),
        password_v1: Joi.string().required(),
    });


    const handleRegister = async () => {
        const { error } = schema.validate(formData);
        if (error) return message.error("Vui lòng nhập đầy đủ thông tin");

        const res = await AppUsers.Register(formData);
        if (res.status === 2) return message.error(res.message);
        if (res.status === 1) {
            message.success(res.message);
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));

            setFormData({
                phone: '',
                name_store: '',
                username: '',
                password_v1: '',
                refferer: '',
            });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    }

    return (
        <div className="page-login">
            <div className="bg-top"></div>
            <div className="bg-xia"></div>
            <div className="title">
                <div className='text-center'> Đăng ký </div>
                <div className='desc'> User Registration </div>
            </div>
            <div className="main">
                <div className="form">
                    <div className="van-cell van-cell--center van-field">
                        <FontAwesomeIcon className='text-lg text-[#666666]' icon={faMobilePhone} />
                        <input
                            type="number"
                            className='w-full outline-none pl-5'
                            placeholder='Số điện thoại'
                            value={formData.phone}
                            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value.trim() }))}
                        />
                    </div>
                    <div className="van-cell van-cell--center van-field">
                        <FontAwesomeIcon className='text-lg text-[#666666]' icon={faStore} />
                        <input
                            type="text"
                            className='w-full outline-none pl-3.5'
                            placeholder='Tên cửa hàng'
                            value={formData.name_store}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name_store: e.target.value }))}
                        />
                    </div>
                    <div className="van-cell van-cell--center van-field">
                        <FontAwesomeIcon className='text-lg text-[#666666]' icon={faUser} />
                        <input
                            type="text"
                            className='w-full outline-none pl-3.5'
                            placeholder='Tên tài khoản'
                            value={formData.username}
                            onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                        />
                    </div>
                    <div className="van-cell van-cell--center van-field">
                        <FontAwesomeIcon className='text-lg text-[#666666]' icon={faLock} />
                        <input
                            type="password"
                            className='w-full outline-none pl-3.5'
                            placeholder='Mật khẩu mở khóa'
                            value={formData.password_v1}
                            onChange={(e) => setFormData((prev) => ({ ...prev, password_v1: e.target.value.trim() }))}
                        />
                    </div>
                    <div className="van-cell van-cell--center van-field">
                        <FontAwesomeIcon className='text-lg text-[#666666]' icon={faFlag} />
                        <input
                            type="text"
                            className='w-full outline-none pl-3.5'
                            placeholder='Mã mời'
                            value={formData.refferer}
                            onChange={(e) => setFormData((prev) => ({ ...prev, refferer: e.target.value.trim() }))}
                        />
                    </div>

                    <div className='flex justify-between px-3 text-[#003366] font-medium text-sm'>
                        <p onClick={() => navigate('/login')} className='text-left cursor-pointer'>Quay lại đăng nhập</p>
                    </div>

                    <div onClick={() => handleRegister()} className='bg-[#1989fa] p-3 rounded-full text-center mt-6 border-[1px] border-[#2196f3]'>
                        <span className='text-white text-sm'>Đăng ký</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;