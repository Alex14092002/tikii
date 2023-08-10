import { Fragment, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import DefaultLayout from '@src/components/DefaultLayout';
import { notification } from 'antd';
import { publicRoutes } from './routes';
import AppUsers from './services/AppUsers';

import { useDispatch } from 'react-redux';
import { setUser } from './stores/userSlice';

import pusher from './helpers/pusher';

function App() {
    const dispatch = useDispatch();
    const fetchDataUser = async () => {
        try {
            const response = await AppUsers.GetUserInfo();
            if (response && response.phone) {
                dispatch(setUser(response));
            }
        } catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Lỗi kết nối đến máy chủ',
            });
        }
    };
    window.channel = pusher.subscribe('my-channel');
    useEffect(() => {
        if(document.location.pathname != '/' && document.location.pathname != '/login' && document.location.pathname != '/register'){
            fetchDataUser();
        }
        window.channel.bind('boxchat-event', function(data) {
            if(window.user_phone !== undefined && window.user_phone !== null && window.user_phone == data.user.phone && data.is_admin === true && window.is_support_page === false){
                notification.success({
                    message: 'CSKH',
                    description: data.message,
                    onClick: () => {
                        window.location = '/my?direct=support';
                    }
                });
            }
        });
        window.is_support_page = false;
    }, []);
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Layout = DefaultLayout;
                    if (!route.layout) Layout = Fragment;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page link={route.path} layout={route.layout} isLogin={route.isLogin} />
                                </Layout>
                            }
                            exact
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
