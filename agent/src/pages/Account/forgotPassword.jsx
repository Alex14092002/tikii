import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountLayout from './AccountLayout';
//import axios from '../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { message } from 'antd';
import './Account.scss';
import { LOGIN_URL } from '../../../settings.json';

function Login() {
    const history = useNavigate();
    const [phone, setPhone] = useState('');
    const [submit, setSubmit] = useState();
    const [messageApi, contextHolder] = message.useMessage();

    const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };
    const error = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };
    return (
        <AccountLayout>
            <div className="md:px-4 pt-8">
                <div className="flex flex-col mb-4">
                    <label className="text-gray-400 py-2" htmlFor="email">
                        Địa chỉ Email
                    </label>
                    <input
                        className="w-full outline-none border-2 rounded-md p-2"
                        type="text"
                        id="email"
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Nhập địa chỉ Email"
                        value={phone}
                    />
                </div>
                <div className="flex flex-col mb-4 pt-4">
                    <button
                        disabled={submit && 'disabled'}
                        className={`bg-[#0162e8] py-2 text-white border-[#025cd8] rounded-sm ${submit && 'opacity-50'}`}
                    >
                        Xác nhận {submit && <FontAwesomeIcon className="spinner" icon={faSpinner} />}
                    </button>
                </div>
                <div className="flex flex-col mb-4 pt-8">
                    <div className="text-center text-white">
                        Đã có tài khoản? Hãy nhấn vào{' '}
                        <Link to={LOGIN_URL} className="text-blue-600">
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
            {contextHolder}
        </AccountLayout>
    );
}

export default Login;
