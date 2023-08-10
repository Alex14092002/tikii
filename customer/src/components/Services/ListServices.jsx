import React from 'react';
import ServiceCard from './ServiceCard';
import WithDrawLogo from '../../assets/images/widthdrawal_logo.jpeg';
import TopUpLogo from '../../assets/images/recharge_logo.jpeg';
import Password from '../../assets/images/forgotpassword_logo.png';
function ListServices({ onSelect }) {
    return (
        <div
            className="
                grid grid-cols-1
                sm:grid-cols-1
                md:grid-cols-3
                lg:grid-cols-3
                gap-4
            "
        >
            <ServiceCard
                image={'https://salt.tikicdn.com/ts/tmp/75/62/db/37060092c38af527b818fdcdc659e3eb.png'}
                onClick={() => onSelect('topup')}
                title="Vấn đề nạp tiền"
            />
            <ServiceCard
                image={'https://salt.tikicdn.com/ts/tmp/27/a7/a3/72a4f669dc2042745374cc76c494704f.png'}
                onClick={() => onSelect('withdraw')}
                title="Vấn đề rút tiền"
            />
            <ServiceCard
                image={'https://salt.tikicdn.com/ts/tmp/81/b0/49/20140f67a0465d966eeff452280f3d70.png'}
                onClick={() => onSelect('shopping')}
                title="Vấn đề mua hàng"
            />
            <ServiceCard image={Password} onClick={() => onSelect('forgotpassword')} title="Quên mật khẩu" />
        </div>
    );
}

export default ListServices;
