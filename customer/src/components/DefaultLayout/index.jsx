//import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { message } from 'antd';

import AppUsers from '@src/services/AppUsers';
import { setUser } from '../../stores/userSlice';
import Navbar from '../Navbar';

function DefaultLayout({ children }) {
    let props = children.props;
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    
    const fetchDataUser = async () => {
        const response = await AppUsers.GetUserInfo();
        if (response && response.phone) {
            dispatch(setUser(response));
            window.user_phone = response.phone;
        } else if(document.location.pathname != '/' && document.location.pathname != '/login' && document.location.pathname != '/register'){
           window.location = "/login";
        }
    };

    /*const IsLogin = async () => {
        const res = await AppUsers.Status();
        if (res.status !== 1) {
            message.error(res.message);
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
    }*/

    useEffect(() => {
        if(!(user !== undefined && user !== null && user.id !== undefined && parseInt(user.id) > 0)){
            fetchDataUser();
        }
        // document.title = props.title;
        /*window.scrollTo({ top: 0 }); // , behavior: 'smooth'
        if (!props.isLogin) IsLogin();

        return () => {
            IsLogin();
        }*/
    }, [children.props.link]);
    return (
        <div className="App bg-white">
            {children}
            {props.layout && <Navbar link={props.link} />}
        </div>
    );
}

export default DefaultLayout;
