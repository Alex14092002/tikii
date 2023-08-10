import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Sidebar.scss';
import {
    faBuildingColumns,
    faCaretRight,
    faChevronLeft,
    faGear,
    faHome,
    faUsers,
    faWallet,
    faSurprise,
    faStore
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { useEffect } from 'react';
import service from '@src/services/AppAdmins';
import { LOGIN_URL } from '../../../../settings.json';

const menus = [
    { title: 'Trang chủ', link: '/', icon: faHome },
    { title: 'Quản lý người dùng', link: '/manager-user', icon: faUsers }, // more: true
    { title: 'Quản lý nạp rút', link: '/transaction', icon: faWallet, notify: true, notify_key: "transaction_notify" },
    // { title: 'Phương thức thanh toán', link: '/payment-method', icon: faBuildingColumns },
    { title: 'Hỗ trợ', link: '/manage-contact', icon: faSurprise, notify: true, notify_key: "support_notify" },
    { title: 'Sản phẩm', link: '/product', icon: faStore },
    // { title: 'Quản lý mã mời', link: '/manage-reference', icon: faSurprise },
    { title: 'Cài đặt hệ thống', link: '/system-configuration', icon: faGear },
];

function Sidebar(props) {
    let history = useNavigate();
    let { open, toggleOpen } = props;
    function Logout() {
        localStorage.removeItem('session_id');
        window.location = LOGIN_URL;
        //return history('/auth/login');
    }
    const fetchTotalSupportNotify = async () => {
        try {
            const response = await service.GetTotalSupportNotify();
            if (response.status_code === 200) {
                $("#support_notify").addClass("hidden");
                if(parseInt(response.total_notify) > 0){
                    $("#support_notify").html(response.total_notify);
                    $("#support_notify").removeClass("hidden");
                }
            }
        } catch (error) {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: error.message,
            });
        }
    };
    const fetchTotalTransactionNotify = async () => {
        try {
            const response = await service.GetTotalTransactionNotify();
            if (response.status_code === 200) {
                $("#transaction_notify").addClass("hidden");
                $("#deposit_notify").addClass("hidden");
                $("#withdraw_notify").addClass("hidden");
                if(parseInt(response.total_notify) > 0){
                    $("#transaction_notify").html(response.total_notify);
                    $("#transaction_notify").removeClass("hidden");
                }
                if(parseInt(response.total_deposit_notify) > 0){
                    $("#deposit_notify").html(response.total_deposit_notify);
                    $("#deposit_notify").removeClass("hidden");
                }
                if(parseInt(response.total_withdraw_notify) > 0){
                    $("#withdraw_notify").html(response.total_withdraw_notify);
                    $("#withdraw_notify").removeClass("hidden");
                }
            }
        } catch (error) {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: error.message,
            });
        }
    };
    useEffect(() => {
        fetchTotalSupportNotify();
        fetchTotalTransactionNotify();
    });
    return (
        <>
            {open && <div onClick={() => toggleOpen(!open)} className="md:hidden box-shadow_side"></div>}
            <div
                className={`${
                    !open && 'translate-x-[-250px]'
                } md:translate-x-[0px] duration-150 xl:duration-300 bg-[#111c44] h-screen fixed z-20 ${
                    open ? 'w-[16rem]' : 'w-20'
                }`}
            >
                <div
                    onClick={() => {
                        toggleOpen(!open);
                        props.toggleSideBar();
                    }}
                    className={`${
                        !open && 'md:rotate-180'
                    } cursor-pointer duration-300 flex items-center justify-center right-[-15px] top-[22px] hover:right-[-8px] rounded-full w-8 h-8 absolute bg-indigo-500 shadow-lg hover:right-[${
                        open && '-6px'
                    }] shadow-indigo-500/50 text-white`}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div>
                    <div className="flex justify-center items-center gap-x-4 min-h-[5rem] shadow-sm shadow-cyan-500/50">
                        {/* <img
                            className={`cursor-pointer duration-500 ${open && 'md:rotate-[360deg] absolute'}`}
                            width="80"
                            height="80"
                            src={logo_bingo68}
                            alt=""
                        /> */}
                        <h1 className={`${!open && 'md:scale-0'} text-white duration-100 text-xl font-bold`}>Tiki</h1>
                    </div>
                    <div>
                        <ul className="pl-2 py-2">
                            {menus.map((item) => {
                                return (
                                    <Tippy
                                        key={Math.random()}
                                        placement="right-end"
                                        content={item.title}
                                        delay={[0, 70]}
                                        className={open ? 'hidden' : 'tippy'}
                                    >
                                        <NavLink
                                            to={item.link}
                                            className={`text-gray-300 item-nav relative flex items-center gap-x-3 cursor-pointer px-2 py-3 mb-2 mr-2 hover:bg-light-white rounded-md duration-300 slide-bar_hover ${
                                                !open && 'justify-center'
                                            } 
                                    `}
                                            style={({ isActive }) =>
                                                isActive
                                                    ? {
                                                          color: '#fff',
                                                          background:
                                                              'linear-gradient(118deg,#7367f0,rgba(115,103,240,.7))',
                                                      }
                                                    : undefined
                                            }
                                        >
                                            <FontAwesomeIcon className="duration-500" icon={item.icon} />
                                            <span className={`duration-500 ${!open && 'hidden'} text-md`}>
                                                {item.title}
                                            </span>
                                            {open && item.more && (
                                                <FontAwesomeIcon
                                                    className="absolute duration-300 right-[20px] arrow-more"
                                                    icon={faCaretRight}
                                                />
                                            )}
                                            { item.notify === true?<div id={item.notify_key} className="rounded-full text-white text-xs bg-red-500 item-nav__notify w-[20px] h-[20px] flex item-center justify-center hidden">0</div>:"" }
                                            {/* {open && <div className="slide-bar_active"></div>} */}
                                        </NavLink>
                                    </Tippy>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
