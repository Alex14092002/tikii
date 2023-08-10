import './Recharge.scss';
import BoxRecharge from './HistoryRecharge';
import HistoryRecharge from './HistoryWithdrawal';
import { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faList } from '@fortawesome/free-solid-svg-icons';

function Recharge() {
    const [tab, setTab] = useState('1');
    const onChange = (key) => {
        setTab(key);
    };
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get('tab') !== undefined && urlParams.get('tab') !== null && urlParams.get('tab') != ''){
            setTab(urlParams.get('tab') == "withdrawal"?"2":"1");
        } 
        window.channel.bind('cancel-transaction-event', function(data) {
            $("#transaction_notify").addClass("hidden");
            $("#deposit_notify").addClass("hidden");
            $("#withdraw_notify").addClass("hidden");
            if(parseInt(data.total_notify) > 0){
                $("#transaction_notify").html(data.total_notify);
                $("#transaction_notify").removeClass("hidden");
            }
            if(parseInt(data.total_deposit_notify) > 0){
                $("#deposit_notify").html(data.total_deposit_notify);
                $("#deposit_notify").removeClass("hidden");
            }
            if(parseInt(data.total_withdraw_notify) > 0){
                $("#withdraw_notify").html(data.total_withdraw_notify);
                $("#withdraw_notify").removeClass("hidden");
            }
        });
    }, []);
    return (
        <Tabs
            activeKey={tab}
            onChange={onChange}
            items={[
                {
                    label: (
                        <div className='flex item-center'>
                            <p className="text-[#fff]">
                                <FontAwesomeIcon icon={faList} />
                                <span className="ml-2">Lịch sử nạp tiền</span>
                            </p>
                            <div id="deposit_notify" className="rounded-full text-white text-xs bg-red-500 item-nav__notify w-[20px] h-[20px] flex item-center justify-center hidden ml-1">0</div>
                        </div>
                    ),
                    key: '1',
                    children: <BoxRecharge />,
                },
                {
                    label: (
                        <div className='flex item-center'>
                            <p className="text-[#fff]">
                                <FontAwesomeIcon icon={faCoins} />

                                <span className="ml-2">Lịch sử rút tiền</span>
                            </p>
                            <div id="withdraw_notify" className="rounded-full text-white text-xs bg-red-500 item-nav__notify w-[20px] h-[20px] flex item-center justify-center hidden ml-1">0</div>
                        </div>
                    ),
                    key: '2',
                    children: <HistoryRecharge />,
                },
            ]}
        />
    );
}

export default Recharge;
