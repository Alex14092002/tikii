import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import AppUsers from '@src/services/AppUsers';
import SelectType from './SelectType';
import RechargeBank from './RechargeBank';
import RechargeUSDT from './RechargeUSDT';
import { useEffect, useState } from 'react';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import BoxInfo from './BoxInfo';
// import './Recharge.scss';

function Recharge() {
    let navigate = useNavigate();
    const [type, setType] = useState(2);

    const [infoRecharge, setInfoRecharge] = useState(null);

    const GetRechargeInfo = async () => {
        return await AppUsers.GetRechargeInfo();
    };

    useEffect(() => {
        GetRechargeInfo().then((data) => {
            if (data.status !== 2) setInfoRecharge(data.data);
        });
    }, []);

    return (
        <div className="page-recharge-history">
            <div className="select-none">
                <div className="header bg-white">
                    <div
                        className="cursor-pointer navbar-left"
                        onClick={() => {
                            return navigate(-1);
                        }}
                    >
                        <FontAwesomeIcon className="text-[#1989fa] px-3 text-sm" icon={faChevronLeft} />
                    </div>
                    <div className="cursor-pointer navbar-title">
                        Nạp bằng ngân hàng
                    </div>
                </div>
            </div>
            <div className="pt-[46px]">
                {!infoRecharge && (
                    <>
                        {<RechargeBank setInfoRecharge={setInfoRecharge} />}
                    </>
                )}

                {infoRecharge && <BoxInfo data={infoRecharge} setInfoRecharge={setInfoRecharge} />}
            </div>
        </div>
    );
}

export default Recharge;
