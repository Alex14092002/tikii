import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import { Fragment, useEffect } from 'react';
//import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { notification } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css'; // optional
import Loading from '@src/components/Loading';
import pusher from './utils/pusher';
import Helper from './utils/helper';

function App() {
    window.channel = pusher.subscribe('my-channel');
    window.current_support_id = 0;
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get('token') !== undefined && urlParams.get('token') !== null && urlParams.get('token') != ''){
            localStorage.setItem('token', urlParams.get('token'));
            window.location = '/';
        } 
        window.channel.bind('boxchat-event', function(data) {
            if(data.is_admin === false && window.current_support_id != data.support_id){
                if(data.message !== undefined && data.message !== null && data.message != ''){
                    let message = 'Khách vãng lai: ' + data.user;
                    if(data.is_guest === false){
                        message = data.user.phone;
                    }
                    notification.success({
                        message,
                        description: data.message,
                        onClick: () => {
                            window.location = '/manage-contact?support=' + data.support_id;
                        }
                    });
                }
            }
        });
        window.channel.bind('boxchat-create-support-event', function(data) {
            $("#support_notify").addClass("hidden");
            if(parseInt(data.total_notify) > 0){
                $("#support_notify").html(data.total_notify);
                $("#support_notify").removeClass("hidden");
            }
        });
        window.channel.bind('withdraw-event', function(data) {
            if(data.status === 0){
                notification.success({
                    message: 'Tài khoản: ' + data.phone,
                    description:  (
                        <>
                           Đã thực hiện rút tiền: {Helper.formatMoney(data.amount)}đ<br />
                           Mã đơn: {data.order_code}
                        </>
                    ),
                    onClick: () => {
                        window.location = '/transaction?tab=withdraw';
                    }
                });
                $("#transaction_notify").addClass("hidden");
                if(parseInt(data.total_notify) > 0){
                    $("#transaction_notify").html(data.total_notify);
                    $("#transaction_notify").removeClass("hidden");
                }
                $("#withdraw_notify").addClass("hidden");
                if(parseInt(data.total_withdraw_notify) > 0){
                    $("#withdraw_notify").html(data.total_withdraw_notify);
                    $("#withdraw_notify").removeClass("hidden");
                }
            }
        });
        window.channel.bind('recharge-event', function(data) {
            if(data.status === 0){
                notification.success({
                    message: 'Tài khoản: ' + data.phone,
                    description: (
                        <>
                           Đã thực hiện nạp tiền: {Helper.formatMoney(data.amount)}đ<br />
                           Mã đơn: {data.order_code}
                        </>
                    ),
                    onClick: () => {
                        window.location = '/transaction';
                    }
                });
                $("#transaction_notify").addClass("hidden");
                if(parseInt(data.total_notify) > 0){
                    $("#transaction_notify").html(data.total_notify);
                    $("#transaction_notify").removeClass("hidden");
                }
                $("#deposit_notify").addClass("hidden");
                if(parseInt(data.total_deposit_notify) > 0){
                    $("#deposit_notify").html(data.total_deposit_notify);
                    $("#deposit_notify").removeClass("hidden");
                }
            }
        });
        window.channel.bind('confirm-recharge-event', function(data) {
            $("#transaction_notify").addClass("hidden");
            if(parseInt(data.total_notify) > 0){
                $("#transaction_notify").html(data.total_notify);
                $("#transaction_notify").removeClass("hidden");
            }
            $("#deposit_notify").addClass("hidden");
            if(parseInt(data.total_deposit_notify) > 0){
                $("#deposit_notify").html(data.total_deposit_notify);
                $("#deposit_notify").removeClass("hidden");
            }
        });
        window.channel.bind('confirm-withdraw-event', function(data) {
            $("#transaction_notify").addClass("hidden");
            if(parseInt(data.total_notify) > 0){
                $("#transaction_notify").html(data.total_notify);
                $("#transaction_notify").removeClass("hidden");
            }
            $("#withdraw_notify").addClass("hidden");
            if(parseInt(data.total_withdraw_notify) > 0){
                $("#withdraw_notify").html(data.total_withdraw_notify);
                $("#withdraw_notify").removeClass("hidden");
            }
        });
    }, []);
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Layout = DefaultLayout;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                route.Layout ? (
                                    <Layout>
                                        <Page link={route.path} title={route.title} />
                                    </Layout>
                                ) : (
                                    <Fragment>
                                        <Page link={route.path} title={route.title} />
                                    </Fragment>
                                )
                            }
                            exact
                        />
                    );
                })}
            </Routes>
            <Loading />
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Router>
    );
}

export default App;
