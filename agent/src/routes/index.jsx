import Home from '@src/pages/Home';
import { forgotPassword, Login, Register } from '@src/pages/Account';
import NotFound from '@src/pages/404';
import Transaction from '@src/pages/Transaction';
import ManagerUsers from '@src/pages/ManagerUsers';
import Setting from '@src/pages/Setting';
import PaymentMethod from '@src/pages/PaymentMethod';
import EditUser from '@src/pages/EditUser';
import ManageSupport from '@src/pages/ManageSupport';
import ManageEvent from '@src/pages/ManageEvent';

// Public Router
const publicRoutes = [
    { path: '/', component: ManagerUsers, Layout: true },

    { path: '/manager-user', component: ManagerUsers, Layout: true },

    { path: '/transaction', component: Transaction, Layout: true },

    { path: '/auth/login', component: Login, Layout: false },

    { path: '/auth/register', component: Register, Layout: false },

    { path: '/auth/forgot-password', component: forgotPassword, Layout: false },

    { path: '/edit-user/:userId', component: EditUser, Layout: true },

    { path: '/payment-method', component: PaymentMethod, Layout: true },

    // { path: '/manage-contact', component: ManageSupport, Layout: true },

    { path: '/system-configuration', component: Setting, Layout: true },

    { path: '/manage-event', component: ManageEvent, Layout: true },

    { path: '*', title: `NotFound`, component: NotFound, Layout: false },
];
// Private Router
const privateRoutes = [];

export { publicRoutes, privateRoutes };
