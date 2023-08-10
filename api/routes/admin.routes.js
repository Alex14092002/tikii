import express from 'express';
import adminController from '../controllers/admin.controller';
import usersController from '../controllers/users.controller';
import { VerifyTokenAdmin } from '../middleware';
import GetListSupport from '../controllers/Support/GetListSupport';
import GetTotalSupportNotify from '../controllers/Support/GetTotalSupportNotify';
import GetSupport from '../controllers/Support/GetSupport';
import EditSupport from '../controllers/Support/EditSupport';
import JoinConversation from '../controllers/Conversation/JoinConversation';
import GetListChat from '../controllers/Chat/GetListChat';
import CreateChatAdmin from '../controllers/Chat/CreateChatAdmin';
import CreateEvent from '../controllers/Event/CreateEvent';

const router = express.Router();

const adminRoute = (app) => {
    router.post('/auth/login', adminController.Login);

    router.put('/LockAccount', VerifyTokenAdmin, adminController.LockAccount);
    router.put('/EditUser', VerifyTokenAdmin, adminController.EditUser);
    router.put('/EditBankCard', VerifyTokenAdmin, adminController.EditBankCard);
    router.put('/ConfirmRecharge', VerifyTokenAdmin, adminController.ConfirmRecharge);
    router.put('/ConfirmWithdrawal', VerifyTokenAdmin, adminController.ConfirmWithdrawal);
    router.put('/EditPaymentMethod', VerifyTokenAdmin, adminController.EditPaymentMethod);
    router.put('/SettingsConfig', VerifyTokenAdmin, adminController.SettingsConfig);
    router.put('/EditStatusPay', VerifyTokenAdmin, adminController.EditStatusPay);
    router.put('/change-password', VerifyTokenAdmin, adminController.ChangePassword);

    router.get('/status', VerifyTokenAdmin, adminController.Status);
    router.get('/ListUser', VerifyTokenAdmin, adminController.ListUser);
    router.get('/GetRecharge', VerifyTokenAdmin, adminController.GetRecharge);
    router.get('/GetWithdrawl', VerifyTokenAdmin, adminController.GetWithdrawl);
    router.get('/GetSettings', VerifyTokenAdmin, adminController.GetSettings);
    router.get('/PaymentMethod', VerifyTokenAdmin, adminController.PaymentMethod);
    router.post('/Statistical', VerifyTokenAdmin, adminController.Statistical);
    router.get('/GetUserDetail/:id', VerifyTokenAdmin, adminController.GetUserDetail);

    router.get('/Support/List', VerifyTokenAdmin, GetListSupport);
    router.get('/Support/TotalNotify', VerifyTokenAdmin, GetTotalSupportNotify);
    router.get('/Support/:support_id', VerifyTokenAdmin, GetSupport);
    router.post('/Support/Edit', VerifyTokenAdmin, EditSupport);
    router.post('/Conversation/Join', VerifyTokenAdmin, JoinConversation);
    router.post('/Message/List', VerifyTokenAdmin, GetListChat);
    router.post('/Message/Create', VerifyTokenAdmin, CreateChatAdmin);

    router.get('/Product/List', VerifyTokenAdmin, adminController.GetListProduct);
    router.post('/Product/Create', VerifyTokenAdmin, adminController.CreateProduct);
    router.post('/Product/Update/:id', VerifyTokenAdmin, adminController.UpdateProduct);
    router.post('/Product/Lock/:id', VerifyTokenAdmin, adminController.UpdateLockProduct);
    router.get('/Product/Type', VerifyTokenAdmin, usersController.GetListProductType);

    // EVENT
    router.post('/Event/Create', VerifyTokenAdmin, CreateEvent);
    router.post('/register-agent', VerifyTokenAdmin, adminController.adminCreateAgentAccount);

    router.get('/Transaction/TotalNotify', VerifyTokenAdmin, adminController.GetTotalTransactionNotify);
    router.get('/GetUserInfo', VerifyTokenAdmin, adminController.GetUserInfo);

    router.delete('/empty-cart/:customer_id', VerifyTokenAdmin, adminController.buyHistoryDelete);
    router.delete('/empty-withdrawal-history/:customer_id', VerifyTokenAdmin, adminController.withdrawalHistoryDelete);
    return app.use('/api/admin', router);
};

export default adminRoute;