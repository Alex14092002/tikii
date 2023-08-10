import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import Joi from 'joi';

import AccountLayout from './AccountLayout';
import AppAdmins from '@services/AppAdmins';
import Loading from '@Loading';
import './Account.scss';
import { LOGIN_URL } from '../../../settings.json';

function Login() {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [password_v1, setPassword] = useState('');
    const [open, setOpen] = useState(true);
    const [checkBox, setCheckBox] = useState(true);
    const [submit, setSubmit] = useState(false);

    const schema = Joi.object({
        phone: Joi.string().required().messages({
            'string.empty': 'Vui lòng nhập số điện thoại',
        }),
        password_v1: Joi.string().required().messages({
            'string.empty': 'Vui lòng nhập mật khẩu',
        }),
    });

    const handleLogin = async () => {
        const { error } = schema.validate({ phone, password_v1 });
        if (error) return message.error(error.details[0].message);
        Loading(true);
        setSubmit(true);
        const data = await AppAdmins.Login({ phone, password_v1 });
        Loading(false);
        setSubmit(false);
        if (data.status === 2) return message.error(data.message);
        if (data.status === 1) {
            setSubmit(false);
            setTimeout(() => {
                navigate('/');
            }, 1000);
            localStorage.setItem('token', data.token);
            delete data.user['password_v1']
            localStorage.setItem('user', JSON.stringify(data.user));
            return message.success(data.message);
        }
    };

    useEffect(() => {
        window.location = LOGIN_URL;
    });

    return (
        <AccountLayout>
            <div className="md:px-4 pt-8">
                <div className="flex flex-col mb-4">
                    <label className="text-gray-400 py-2" htmlFor="username">
                        Tài khoản
                    </label>
                    <input
                        className="w-full outline-none border-2 rounded-md p-2"
                        type="text"
                        id="username"
                        placeholder="Nhập tài khoản"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    />
                </div>
                <div className="flex flex-col mb-4 relative">
                    <label className="text-gray-400 py-2" htmlFor="password">
                        Mật khẩu
                    </label>
                    <input
                        className="w-full outline-none border-2 rounded-md p-2 pr-[50px]"
                        type={open ? 'password' : 'text'}
                        id="password"
                        placeholder="Nhập mật khẩu"
                        value={password_v1}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    />
                    <FontAwesomeIcon
                        onClick={() => setOpen(!open)}
                        className="absolute top-[40%] translate-y-[40%] right-3 cursor-pointer p-2"
                        icon={open ? faLock : faLockOpen}
                    />
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5 ml-[1px]">
                        <input
                            onChange={(e) => setCheckBox(e.target.checked)}
                            defaultChecked="true"
                            id="terms"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        />
                    </div>
                    <label
                        htmlFor="terms"
                        className="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        <span className="text-white">Tôi đồng ý với các</span>{' '}
                        <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
                            điều khoản và điều kiện
                        </a>
                    </label>
                </div>
                <div className="flex flex-col mb-4 pt-12">
                    <button
                        disabled={submit && 'disabled'}
                        onClick={() => handleLogin()}
                        className={`bg-[#0162e8] py-2 text-white border-[#025cd8] rounded-sm ${submit && 'opacity-50'}`}
                    >
                        Đăng nhập {submit && <FontAwesomeIcon className="spinner" icon={faSpinner} />}
                    </button>
                </div>
                <div className="flex flex-col mb-4 pt-8">
                    <div className="text-center">
                        <Link to="#" className="text-blue-600">
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <div className="text-center text-white">
                        Không có tài khoản? Hãy nhấn vào{' '}
                        <Link to="#" className="text-blue-600">
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </div>
            \
        </AccountLayout>
    );
}

export default Login;
