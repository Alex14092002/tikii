import React, { useEffect } from 'react';
import { TYPE_PRODUCT_IMAGE } from '../../../constants/typeProduct';

import convert from '../../../helpers/convert';

function ProductGroup({ item, ...props }) {
    const [stringCountdown, setStringCountdown] = React.useState('');
    useEffect(() => {
        if (item) {
            const interval = setInterval(() => {
                const now = new Date().getTime();
                const distance = new Date(item.expired_at).getTime() - now;
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                if (distance < 0) {
                    clearInterval(interval);
                    setStringCountdown('Đã kết thúc');
                    return;
                }
                setStringCountdown(convert.timeString(days, hours, minutes, seconds));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, []);
    return (
        <div className="flex items-center item cursor-pointer flex[sm]-column" {...props}>
            <img src={TYPE_PRODUCT_IMAGE[item.listProductType]} alt="" />
            <div className="text-white flex-1">
                <div className="flex flex-col  mx-auto ml-1.5">
                    <span
                        className="whitespace-nowrap fs-2"
                        style={{
                            fontSize: '18px',
                        }}
                    >
                        {item.name}
                    </span>
                    {item.expired_at && (
                        <>
                            <span className="whitespace-nowrap">
                                Đang giảm {item.percent_sale > 0 && item.percent_sale + `%`}
                            </span>
                            <span className="whitespace">{`Kết thúc trong: ${stringCountdown}`}</span>
                        </>
                    )}
                    <span
                        className="whitespace-nowrap"
                        style={{
                            fontSize: '14px',
                        }}
                    >
                        Bấm để vào
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProductGroup;
