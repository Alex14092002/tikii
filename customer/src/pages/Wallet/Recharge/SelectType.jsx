import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import memberPay from '@src/assets/images/member-pay.png';
import bit from '@src/assets/images/bit.png';

function SelectType({ setType }) {
    return (
        <>
            <div onClick={() => setType(3)} className="flex justify-between items-center p-3 border-b-[1px] border-[#ebedf0]">
                <div className='flex items-center gap-3'>
                    <img width="30" height="30" src={bit} alt="" />
                    <span className='select-none'>Nạp bằng USDT</span>
                </div>
                <FontAwesomeIcon className='text-[#9999]' icon={faChevronRight} />
            </div>
            <div onClick={() => setType(2)} className="flex justify-between items-center p-3">
                <div className='flex items-center gap-3'>
                    <img width="30" height="30" src={memberPay} alt="" />
                    <span className='select-none'>Nạp bằng ngân hàng </span>
                </div>
                <FontAwesomeIcon className='text-[#9999]' icon={faChevronRight} />
            </div>

        </>
    );
}

export default SelectType;