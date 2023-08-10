import DropDown from './DropDown';
import './Header.scss';

import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function Header(props) {
    let { open, toggleOpen } = props;
    const [theme, setTheme] = useState(true);
    return (
        <header className="w-full">
            <div className="flex justify-between md:justify-end items-center bg-[#111c45] text-white px-6 py-2 rounded-xl">
                <div onClick={() => toggleOpen(!open)} className="cursor-pointer md:hidden text-[20px]">
                    <FontAwesomeIcon icon={faBars} />
                </div>
                {/* <div className="hidden md:flex items-center w-[300px] relative z-10">
                    <input
                        className="w-full caret-red-500 bg-[#0b1437] text-gray-200 px-4 py-2 pr-8 outline-none rounded-full"
                        type="search"
                        placeholder="search..."
                    />
                    <FontAwesomeIcon className="absolute right-[15px] cursor-pointer" icon={faMagnifyingGlass} />
                </div> */}
                <div className="flex items-center list-nav">
                    <div className="mr-4 text-[20px] cursor-pointer header-bell">
                        <FontAwesomeIcon icon={faBell} />
                    </div>
                    <DropDown />
                </div>
            </div>
        </header>
    );
}

export default Header;
