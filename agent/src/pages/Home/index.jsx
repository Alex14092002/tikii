import { faBuildingColumns, faDollarSign, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, Statistic } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import Loading from '@src/libs/Loading';

import AppAdmins from '@src/services/AppAdmins';

const dateFormat = 'YYYY-MM-DD';

function formateT(params) {
    let result = params < 10 ? '0' + params : params;
    return result;
}

const formatter = (value) => (
    <CountUp className="text-white text-[1.25rem]" end={value} separator="." duration={1.25} />
);

function Home() {
    const date = new Date();
    const years = formateT(date.getFullYear());
    const months = formateT(date.getMonth() + 1);
    const days = formateT(date.getDate());

    const [startDate, setStartDate] = useState(`01/${months}/${years}`);
    const [endDate, setEndDate] = useState(`${days}/${months}/${years}`);
    const [analytics, setAnalytics] = useState('');

    useEffect(() => {
        // (async () => {
        //     Loading(true);
        //     let { data } = await AppAdmins.Statistical(startDate, endDate);
        //     setAnalytics(data);
        //     Loading(false);
        // })();
    }, [startDate, endDate]);

    return (
        <div className="home min-h-[500px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-[#111c45] flex flex-col justify-center items-center gap-3 rounded-md px-4 py-6">
                    <h3 className="text-white font-semibold text-[0.8rem]">Thống kê theo khoảng thời gian</h3>
                    <div className="w-full">
                        <DatePicker
                            className="w-full"
                            format="DD/MM/YYYY"
                            onChange={(_, dateString) => setStartDate(dateString)}
                            defaultValue={dayjs(`${years}-${months}-01`, dateFormat)}
                        />
                    </div>
                    <div className="w-full">
                        <DatePicker
                            className="w-full"
                            format="DD/MM/YYYY"
                            onChange={(_, dateString) => setEndDate(dateString)}
                            defaultValue={dayjs(`${years}-${months}-${days}`, dateFormat)}
                        />
                    </div>
                </div>
                <div className="col-span-1 md:col-span-2 rounded-md bg-[#111c45] px-4 py-6 text-white">
                    <h3 className="font-semibold text-[0.8rem]">Thống kê</h3>
                    <div className="flex select-none">
                        <div className="flex flex-col flex-1">
                            <div className="py-2 my-2">
                                <div className="flex items-center">
                                    <FontAwesomeIcon
                                        className="rounded-full w-[50px] py-4"
                                        style={{
                                            background:
                                                'linear-gradient(118deg, rgb(115, 103, 240), rgba(115, 103, 240, 0.7))',
                                        }}
                                        icon={faWallet}
                                    />
                                    <div className="ml-3">
                                        <h3 className="font-semibold text-sm">
                                            <Statistic value={analytics?.Total_Recharge} formatter={formatter} />
                                        </h3>
                                        <p className="text-sm">Tổng nạp</p>
                                    </div>
                                </div>
                            </div>
                            <div className="py-2 my-2">
                                <div className="flex items-center">
                                    <FontAwesomeIcon
                                        className="rounded-full w-[50px] py-4"
                                        style={{
                                            background:
                                                'linear-gradient(118deg, rgb(115, 103, 240), rgba(115, 103, 240, 0.7))',
                                        }}
                                        icon={faDollarSign}
                                    />
                                    <div className="ml-3">
                                        <h3 className="font-semibold text-sm">
                                            <Statistic value={analytics?.Total_Rewards} formatter={formatter} />
                                        </h3>
                                        <p className="text-sm">Trả thưởng</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="py-2 my-2">
                                <div className="flex items-center">
                                    <FontAwesomeIcon
                                        className="rounded-full w-[50px] py-4"
                                        style={{
                                            background:
                                                'linear-gradient(118deg, rgb(115, 103, 240), rgba(115, 103, 240, 0.7))',
                                        }}
                                        icon={faBuildingColumns}
                                    />
                                    <div className="ml-3">
                                        <h3 className="font-semibold text-sm">
                                            <Statistic value={analytics?.Total_Withdrawal} formatter={formatter} />
                                        </h3>
                                        <p className="text-sm">Tổng rút</p>
                                    </div>
                                </div>
                            </div>
                            <div className="py-2 my-2">
                                <div className="flex items-center">
                                    <FontAwesomeIcon
                                        className="rounded-full w-[50px] py-4"
                                        style={{
                                            background:
                                                'linear-gradient(118deg, rgb(115, 103, 240), rgba(115, 103, 240, 0.7))',
                                        }}
                                        icon={faDollarSign}
                                    />
                                    <div className="ml-3">
                                        <h3 className="font-semibold text-sm">
                                            <Statistic value={analytics?.Total_Sells} formatter={formatter} />
                                        </h3>
                                        <p className="text-sm">Tổng cược</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-white">
                <div className="bg-[#7367f0] rounded-md px-4 py-6 cursor-pointer">
                    <h3 className="font-semibold text-xl">
                        <Statistic value={analytics?.Total_Users} formatter={formatter} />
                    </h3>
                    <span className="text-sm">Tổng người dùng</span>
                </div>
                <div className="bg-[#28c76f] rounded-md px-4 py-6 cursor-pointer">
                    <h3 className="font-semibold text-xl">
                        <Statistic value={analytics?.Total_Users_Today} formatter={formatter} />
                    </h3>
                    <span className="text-sm"> Người dùng mới</span>
                </div>
                <div className="bg-[#ff9f43] rounded-md px-4 py-6 cursor-pointer">
                    <h3 className="font-semibold text-xl">
                        <Statistic value={analytics?.Total_Bets} formatter={formatter} />
                    </h3>
                    <span className="text-sm">Số lượng vé đã bán</span>
                </div>
                <div className="bg-red-500 rounded-md px-4 py-6 cursor-pointer">
                    <h3 className="font-semibold text-xl">
                        <Statistic value={analytics?.Total_BetWin} formatter={formatter} />
                    </h3>
                    <span className="text-sm">Số lượng vé đã trúng</span>
                </div>
            </div>
        </div>
    );
}

export default Home;
