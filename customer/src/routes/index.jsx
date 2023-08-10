import { Login, Register } from '@src/pages/Account';
import GoodList from '@src/pages/GoodList';
import Home from '@src/pages/Home';
import { Card, My, WalletUSDT } from '@src/pages/Member';
import { Recharge, RechargeRecord, Withdraw, WithdrawRecord } from '@src/pages/Wallet';
import BuyHistory from '../pages/Member/BuyHistory';

// Public Router
const publicRoutes = [
    { path: '/', component: Home, isLogin: true },

    { path: '/login', component: Login, isLogin: true },

    { path: '/register', component: Register, isLogin: true },

    { path: '/card', component: Card, layout: true },

    { path: '/recharge', component: Recharge, layout: true },

    { path: '/recharge-record', component: RechargeRecord, layout: true },

    { path: '/withdraw', component: Withdraw, layout: true },

    { path: '/wallet-usdt', component: WalletUSDT, layout: true },

    { path: '/buy-history', component: BuyHistory, layout: true },

    { path: '/withdraw-record', component: WithdrawRecord, layout: true },

    { path: '/goodlist/:type', component: GoodList, layout: true },

    { path: '/my', component: My, layout: true },

    // { path: '/login/identify', component: Fotgot },
];

export { publicRoutes };
