
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

function RechargeUSDT() {
    return (
        <>
            <div className="flex justify-between items-center p-3 border-b-[1px] border-[#ebedf0]">
                <span className='text-[#323233] text-sm font-semibold'>Kiểu tài khoản</span>
                <span className='text-[#969799] text-sm'>Tài khoản trung tâm mua sắm</span>
            </div>
            <div className="flex flex-col justify-between items-start p-3 border-b-[1px] border-[#ebedf0] bg-[#f7f8fa]">
                <p className='text-[#323233] text-sm font-semibold'>Rút tiền bằng USDT</p>
                <span className='text-[#969799] text-[0.8rem] mt-1'>Số tiền tối thiểu cho một lần rút tiền là 50.000đ, tối đa 500.000.000$, 0₫ phí xử lý!</span>
            </div>
            <div className="p-3 mt-3">

                <div className='p-3 rounded-md' style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
                    <div className='mb-3'>
                        <span className='text-sm font-semibold'>BNB Smart Chain address</span>
                        <p className='flex items-center flex-wrap gap-1.5 text-sm'>
                            <span>0xb4d926E849092aB0b6D6F24fD1Adb9C9B56A6497</span>
                            <FontAwesomeIcon className='text-blue-500 text-lg cursor-pointer' icon={faCopy} />
                        </p>

                    </div>
                    <QRCode
                        style={{ height: "auto", maxWidth: "150px", width: "150px", margin: 'auto' }}
                        value="0xb4d926E849092aB0b6D6F24fD1Adb9C9B56A6497s"
                        viewBox="0 0 256 256"
                    />
                </div>

                <div className='text-[#e67e22] text-sm text-center mt-3'>
                    Chỉ gửi USDT đến địa chỉ này, việc gửi các loại tiền hoặc token khác đến địa chỉ này có thể khiến bạn mất tiền và token mà không thể khôi phục.
                </div>
            </div>
        </>
    );
}

export default RechargeUSDT;