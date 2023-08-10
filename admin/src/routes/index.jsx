import NotFound from '@src/pages/404';
import { forgotPassword, Login, Register } from '@src/pages/Account';
import EditUser from '@src/pages/EditUser';
import Home from '@src/pages/Home';
import ManageReference from '@src/pages/ManageReference';
import ManageSupport from '@src/pages/ManageSupport';
import ManagerUsers from '@src/pages/ManagerUsers';
import PaymentMethod from '@src/pages/PaymentMethod';
import Setting from '@src/pages/Setting';
import Transaction from '@src/pages/Transaction';
import Product from '@src/pages/Product';

// Public Router
const publicRoutes = [
    { path: '/', component: Home, Layout: true },

    { path: '/manager-user', component: ManagerUsers, Layout: true },

    { path: '/transaction', component: Transaction, Layout: true },

    { path: '/auth/login', component: Login, Layout: false },

    { path: '/auth/register', component: Register, Layout: false },

    { path: '/auth/forgot-password', component: forgotPassword, Layout: false },

    { path: '/edit-user/:userId', component: EditUser, Layout: true },

    { path: '/payment-method', component: PaymentMethod, Layout: true },

    { path: '/manage-reference', component: ManageReference, Layout: true },

    { path: '/system-configuration', component: Setting, Layout: true },

    { path: '/manage-contact', component: ManageSupport, Layout: true },

    { path: '/product', component: Product, Layout: true },

    { path: '*', title: `NotFound`, component: NotFound, Layout: false },
];
// Private Router
const privateRoutes = [];

export { privateRoutes, publicRoutes };
