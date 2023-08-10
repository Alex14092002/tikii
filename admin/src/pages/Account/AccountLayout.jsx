import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.scss';

function AccountLayout({ children }) {
    const history = useNavigate();
    useEffect(() => {
        let token = localStorage.getItem('session_id');
        if (token) history('/');
    }, []);
    return (
        <div className="bg-[#0b1437] h-screen flex justify-center">
            <div className="bg-[#111c44] flex-[58.33333%] max-w-[58.33333%] hidden lg:block overflow-hidden">
                <div className="wellcome-bg">
                    <h1 className="text-[35px] font-semibold">
                        Chào mừng bạn đến với FPT Software <span className="text-red-500">❤</span>
                    </h1>
                </div>
            </div>
            <div className="bg-[#111c44] container md:w-[50%] xl:w-[41.66667%] px-[12px] pt-2 z-10">
                <div className="flex flex-col justify-center">
                    <div className="text-center my-3">
                        {/* <img className="mx-auto" width="80" height="80" src={logo_bingo68} alt="" /> */}
                    </div>
                    <p className="text-center my-3 font-semibold text-xl login_text-red">
                        Chào mừng bạn đến với FPT Software <span className="text-red-500">❤</span>
                    </p>
                    <p className="text-center text-md font-semibold text-white">Nhập tài khoản của bạn để tiếp tục</p>
                </div>
                <div className="">{children}</div>
            </div>
        </div>
    );
}

export default AccountLayout;
