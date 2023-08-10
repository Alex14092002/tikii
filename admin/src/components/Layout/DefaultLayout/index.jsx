import { Header, Sidebar, Footer } from '../index';
import AppAdmins from '@services/AppAdmins';
//import Loading from '@src/libs/Loading';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
//import { message } from 'antd';
//import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../stores//reducer/userSlice';
import { LOGIN_URL } from '../../../../settings.json';

function DefaultLayout({ children }) {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    //let navigate = useNavigate();
    const [toggleSide, setToggleSideBar] = useState(true);
    const [open, setOpen] = useState(isMobile ? false : true);
    const toggleSideBar = () => {
        setToggleSideBar(!toggleSide);
    };

    const fetchDataUser = async () => {
        const response = await AppAdmins.GetUserInfo();
        if (response && response.data && response.data.phone) {
            dispatch(setUser(response.data));
        } else if(document.location.pathname != '/login' && document.location.pathname != '/register'){
          window.location = LOGIN_URL;
        }
    };

    useEffect(() => {
        if (isMobile && open) setOpen(!open);
        /*(async () => {
            let data = await AppAdmins.Status();
            if (data.status != 1) {
                message.error(data.message);
                localStorage.removeItem('token');
                setTimeout(() => {
                    Loading(false);
                    window.location = LOGIN_URL;
                    //navigate('/auth/login');
                }, 1000);
            }
        })();*/

        if(!(user !== undefined && user !== null && user.id !== undefined && parseInt(user.id) > 0)){
            fetchDataUser();
        }
    }, [children.props.link]);

    const toggleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="App">
            <Sidebar open={open} toggleOpen={toggleOpen} toggleSideBar={toggleSideBar} />
            <div
                className={`w-full px-2 md:px-6 pt-4 bg-[#0b1437] duration-300 min-h-screen ${
                    toggleSide ? 'sm:w-[calc(100%-16rem)]' : 'sm:w-[calc(100%-5rem)]'
                } float-right`}
            >
                <Header open={open} toggleOpen={toggleOpen} toggleSide={toggleSide} />
                {children}
                <Footer />
            </div>
        </div>
    );
}

export default DefaultLayout;
