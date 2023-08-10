import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { message } from 'antd';

import AppUsers from '@src/services/AppUsers';
import { useNavigate } from 'react-router-dom';

function BoxInfo({ data, setInfoRecharge }) {
    const navigate = useNavigate();

    const Copy = (text) => {
        message.success('Sao chép thành công');
        navigator.clipboard.writeText(text);
    };

    const handleCancelRecharge = async () => {
        const res = await AppUsers.CancelRechargeOrder();
        if (res.status === 1) {
            setInfoRecharge(null);
            return message.success('Hủy đơn nạp thành công');
        }
        else if(res.allow_cancel === true){
            setInfoRecharge(null);
        }
    };

    const handleTopUpDone = async () => {
        setInfoRecharge(null);
        message.success('Nạp tiền thành công');
        navigator.clipboard.writeText('');
        navigate('/my');
        return;
    };

    return (
        <div className="bg-white mt-1 px-3 pt-1 pb-3">
            <div className="flex justify-between items-center border-b py-3">
                <div className="min-w-[130px] text-sm text-black">Ngân hàng</div>
                <div className="flex-1 text-left text-sm font-semibold">{data.name_bank}</div>
                <FontAwesomeIcon className="text-xl" icon={faCopy} onClick={() => Copy(data.name_bank)} />
            </div>
            <div className="flex justify-between items-center border-b py-3">
                <div className="min-w-[130px] text-sm text-black">Số tài khoản</div>
                <div className="flex-1 text-left text-sm font-semibold">{data.number_bank}</div>
                <FontAwesomeIcon className="text-xl" icon={faCopy} onClick={() => Copy(data.number_bank)} />
            </div>
            <div className="flex justify-between items-center border-b py-3">
                <div className="min-w-[130px] text-sm text-black">Chủ tài khoản</div>
                <div className="flex-1 text-left text-sm font-semibold">{data.full_name}</div>
                <FontAwesomeIcon className="text-xl" icon={faCopy} onClick={() => Copy(data.full_name)} />
            </div>
            <div className="flex justify-between items-center border-b py-3">
                <div className="min-w-[130px] text-sm text-black">Số tiền thanh toán</div>
                <div className="flex-1 text-left text-sm font-semibold">{data.amount}.00</div>
                <FontAwesomeIcon className="text-xl" icon={faCopy} onClick={() => Copy(data.amount)} />
            </div>
            <div className="flex justify-between items-center border-b py-3">
                <div className="min-w-[130px] text-sm text-black">Mã đơn hàng</div>
                <div className="flex-1 text-left text-sm font-semibold">{data.order_code}</div>
                <FontAwesomeIcon className="text-xl" icon={faCopy} onClick={() => Copy(data.order_code)} />
            </div>
            <div className="flex justify-between items-center border-b py-3">
                <div className="min-w-[130px] text-sm text-black">Ngày tạo đơn hàng</div>
                <div className="flex-1 text-left text-sm font-semibold">{data.createdAt}</div>
                <FontAwesomeIcon className="text-xl" icon={faCopy} onClick={() => Copy(data.createdAt)} />
            </div>

            <div className="text-[#f2413b] mt-2">
                <p className="text-xs">
                    *Số tiền chuyển phải điền đúng với lệnh bạn đã tạo, nếu không sẽ không được cập nhật tiền thành công
                </p>
                <p className="text-xs">
                    Nếu quý khách chuyển sai số tiền đã tạo lệnh , khoản tiền bị thất thoát công ty chúng tôi sẽ không
                    chịu trách nhiệm !
                </p>
                <p className="text-xs">Lưu ý : Không hủy bỏ lệnh nạp nếu đã chuyển tiền hoàn tất</p>
            </div>

            <div
                onClick={() => handleTopUpDone()}
                className="flex justify-center rounded-full mt-12 cursor-pointer mx-3 bg-[#f2413b]"
            >
                <button className="py-3 flex justify-center items-center gap-1 text-center">
                    <span className="text-white text-sm">Đã nạp xong</span>
                </button>
            </div>

            <div
                onClick={() => handleCancelRecharge()}
                className="flex justify-center rounded-full mt-12 cursor-pointer mx-3 bg-[#b5b5b5]"
            >
                <button className="py-3 flex justify-center items-center gap-1 text-center">
                    <span className="text-white text-sm">Hủy đơn nạp</span>
                </button>
            </div>
        </div>
    );
}

export default BoxInfo;
