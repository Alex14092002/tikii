import { faLock, faLockOpen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountLayout from './AccountLayout';
//import axios from '../../api/axios';
import { message } from 'antd';
import './Account.scss';
import { LOGIN_URL } from '../../../settings.json';

function Register() {
    const history = useNavigate();
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(true);
    const [submit, setSubmit] = useState(false);
    const [checkBox, setCheckBox] = useState(true);

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

    const validateRegister = () => {
        if (!fullName || !phone || !password) {
            return error('Vui lòng nhập đầy đủ thông tin!');
        }

        let checkPhone = /(0[3|5|7|8|9])+([0-9]{8})\b/g.test(phone);
        if (!checkPhone) return error('Số điện thoại không đúng định dạng!');
        if (!checkBox) {
            return error('Vui lòng đồng ý điều khoản dịch vụ!');
        }
    };

    async function register() {
        let check = validateRegister();
        if (!check) return false;

        // setSubmit(true);
        // let { data } = await axios.post('/api/v1/service/auth/register', {
        //     name: fullName,
        //     phone: phone,
        //     password: password,
        // });
        // if (data.status === 'success') {
        //     success(data.message);
        //     localStorage.setItem('session_id', data.session_id);
        //     setTimeout(() => {
        //         return history('/');
        //     }, 1000);
        // } else {
        //     setSubmit(false);
        //     return error(data.message);
        // }
    }
    return (
        <AccountLayout>
            <div className="md:px-4 pt-8">
                <div className="flex flex-col mb-4">
                    <label className="text-gray-400 py-2 cursor-pointer" htmlFor="fullname">
                        Họ và tên
                    </label>
                    <input
                        className="w-full outline-none border-2 rounded-md p-2"
                        type="text"
                        id="fullname"
                        spellCheck="false"
                        placeholder="Nhập họ và tên"
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-400 py-2 cursor-pointer" htmlFor="username">
                        Tài khoản
                    </label>
                    <input
                        className="w-full outline-none border-2 rounded-md p-2"
                        type="text"
                        id="username"
                        spellCheck="false"
                        placeholder="Nhập tài khoản"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-4 relative">
                    <label className="text-gray-400 py-2 cursor-pointer" htmlFor="password">
                        Mật khẩu
                    </label>
                    <input
                        className="w-full outline-none border-2 rounded-md p-2 pr-[50px]"
                        type={open ? 'password' : 'text'}
                        id="password"
                        spellCheck="false"
                        placeholder="Nhập mật khẩu"
                        onChange={(e) => setPassword(e.target.value)}
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
                            defaultChecked={checkBox}
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
                <div className="flex flex-col mb-4 pt-6">
                    <button
                        disabled={submit && 'disabled'}
                        onClick={() => register()}
                        className={`bg-[#0162e8] py-2 text-white border-[#025cd8] rounded-sm ${submit && 'opacity-30'}`}
                    >
                        Đăng ký {submit && <FontAwesomeIcon className="spinner" icon={faSpinner} />}
                    </button>
                </div>
                <div className="flex justify-center flex-col mb-4 pt-4">
                    <div className="text-center text-white">
                        Bạn đã có tài khoản?{' '}
                        <Link to={LOGIN_URL} className="text-blue-600">
                            Đăng nhập ngay
                        </Link>
                    </div>
                </div>
            </div>
            {contextHolder}
        </AccountLayout>
    );
}

export default Register;
