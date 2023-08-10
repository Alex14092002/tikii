import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import memberPay from '@src/assets/images/member-pay.png';
import bit from '@src/assets/images/bit.png';
import { message } from 'antd';

function SelectType({ setType, cardInfo }) {

    const navigate = useNavigate();

    const handleClick = (typeStep) => {
        if (typeStep == 2 && !cardInfo.number_bank || typeStep == 3 && !cardInfo.wallet_usdt) message.error("Hãy liên kết thông tin rút tiền trước");
        if (typeStep == 2 && !cardInfo.number_bank) return navigate('/card');
        if (typeStep == 3 && !cardInfo.wallet_usdt) return navigate('/wallet-usdt');

        if (typeStep == 3) return message.error("Phương thức rút tiền này đang bảo trì");

        setType(typeStep);
    }

    return (
        <>
            <div onClick={() => handleClick(3)} className="flex justify-between items-center p-3 border-b-[1px] border-[#ebedf0]">
                <div className='flex items-center gap-3'>
                    <img width="30" height="30" src={bit} alt="" />
                    <span className='select-none'>Rút bằng USDT</span>
                </div>
                <FontAwesomeIcon className='text-[#9999]' icon={faChevronRight} />
            </div>
            <div onClick={() => handleClick(2)} className="flex justify-between items-center p-3">
                <div className='flex items-center gap-3'>
                    <img width="30" height="30" src={memberPay} alt="" />
                    <span className='select-none'>Rút bằng ngân hàng </span>
                </div>
                <FontAwesomeIcon className='text-[#9999]' icon={faChevronRight} />
            </div>

        </>
    );
}

export default SelectType;