import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faHouse, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { memo } from 'react';

import './Navbar.scss';

function Navbar({ link }) {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex justify-between items-center nav">
                <div
                    onClick={() => navigate('/')}
                    className={classNames('flex-1 select-none', { active: link === '/' || link.includes('/goodlist') })}
                >
                    <div className="nav-item flex flex-col">
                        <FontAwesomeIcon className="text-md mb-[3px]" icon={faHouse} />
                        <span className="text-[0.8rem] text-center capitalize">Trang chủ</span>
                    </div>
                </div>
                <div
                    onClick={() => navigate('/recharge')}
                    className={classNames('flex-1 select-none', { active: link === '/recharge' || link.includes('/recharge-record') })}
                >
                    <div className="nav-item flex flex-col">
                        <FontAwesomeIcon className="text-md mb-[3px]" icon={faWallet} />
                        <span className="text-[0.8rem] text-center capitalize">Nạp tiền</span>
                    </div>
                </div>
                <div
                    onClick={() => navigate('/withdraw')}
                    className={classNames('flex-1 select-none', { active: link === '/withdraw' || link.includes('/withdraw-record') })}
                >
                    <div className="nav-item flex flex-col">
                        <FontAwesomeIcon className="text-md mb-[3px]" icon={faBuildingColumns} />
                        <span className="text-[0.8rem] text-center capitalize">Rút tiền</span>
                    </div>
                </div>
                <div
                    onClick={() => navigate('/my')}
                    className={classNames('flex-1 select-none', { active: link === '/my' || link.includes('/card') || link.includes('/wallet-usdt')  || link.includes('/buy-history')  })}
                >
                    <div className="nav-item flex flex-col">
                        <FontAwesomeIcon className="text-md mb-[3px]" icon={faUser} />
                        <span className="text-[0.8rem] text-center capitalize">Tài khoản</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(Navbar);
