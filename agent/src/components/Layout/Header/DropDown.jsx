import ModalChangePass from './ModalChangePass';
import img_header from '@src/assets/images/img-header.jpg';

import React, { useState } from 'react';
import { Dropdown } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL } from '../../../../settings.json';

function DropDown() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        localStorage.removeItem('token');
        window.location = LOGIN_URL;
        //navigate('/auth/login');
    };

    const items = [
        {
            key: '1',
            label: (
                <div className="text-[#7367f0]" onClick={() => setIsOpen(true)}>
                    <FontAwesomeIcon className="mr-2" icon={faGear} />
                    <span className="text-black">Đổi mật khẩu</span>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div onClick={() => handleLogOut()} className="text-[#7367f0]">
                    <FontAwesomeIcon className="mr-2" icon={faPowerOff} />
                    <span className="text-black">Đăng xuất</span>
                </div>
            ),
        },
    ];

    return (
        <>
            <Dropdown
                menu={{
                    items,
                }}
                placement="bottomLeft"
                arrow
            >
                <div className="w-[40px] h-[40px] bg-white rounded-full cursor-pointer border-2">
                    <img className="w-[40px] h-[40px] rounded-full" src={img_header} alt="" />
                </div>
            </Dropdown>
            <ModalChangePass isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}

export default DropDown;
