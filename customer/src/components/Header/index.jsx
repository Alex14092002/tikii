import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import back from '@src/assets/images/back.png';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import { memo } from 'react';

function Header({ left = true, title = '', right = '', to = '' }) {
    let navigate = useNavigate();
    return (
        <div className="select-none">
            <div className="header bg-white">
                <div className="cursor-pointer navbar-left" onClick={() => left && navigate(to ? to : -1)}>
                    {left &&
                        <FontAwesomeIcon className='text-[#1989fa] px-3 text-sm' icon={faChevronLeft} />
                    }
                </div>
                <div className="cursor-pointer navbar-title">{title && title}</div>
                <div className="cursor-pointer navbar-right">{right && right}</div>
            </div>
        </div>
    );
}

export default memo(Header);
