import axios from '@axios';

export default {
    Login: async ({ phone, password_v1 }) => {
        let data = await axios.post('/api/admin/auth/login', { phone, password_v1 });
        return data;
    },
    Status: async () => {
        let data = await axios.get('/api/v1/agent/status');
        return data;
    },
    GetUserInfo: async () => {
        let data = await axios.get('/api/v1/agent/GetUserInfo');
        return data;
    },
    ListUser: async () => {
        let data = await axios.get('/api/v1/agent/users/list');
        return data;
    },
    GetRecharge: async () => {
        let data = await axios.get('/api/v1/agent/agent/GetRecharge');
        return data;
    },
    GetWithdrawl: async () => {
        let data = await axios.get('/api/v1/agent/agent/GetWithdraw');
        return data;
    },
    GetSettings: async () => {
        let data = await axios.get('/api/admin/GetSettings');
        return data;
    },
    PaymentMethod: async () => {
        let data = await axios.get('/api/admin/PaymentMethod');
        return data;
    },
    GetUserDetail: async ({ userId }) => {
        let data = await axios.get('/api/admin/GetUserDetail/' + userId);
        return data;
    },
    handleLockAccount: async ({ id, status }) => {
        let data = await axios.put('/api/admin/LockAccount', { id, status });
        return data;
    },
    EditUser: async (id, money, type, password) => {
        let data = await axios.put('/api/admin/EditUser', { id, money, type, password });
        return data;
    },
    EditBankCard: async (userId, NameBank, NameUser, Stk, walletUsdt) => {
        let data = await axios.put('/api/admin/EditBankCard', { userId, NameBank, NameUser, Stk, walletUsdt });
        return data;
    },
    ConfirmRecharge: async (order_code, status) => {
        let data = await axios.put('/api/v1/agent/agent/ConfirmRecharge', { order_code, status });
        return data;
    },
    ConfirmWithdrawal: async (order_code, status) => {
        let data = await axios.put('/api/v1/agent/agent/ConfirmWithdraw', { order_code, status });
        return data;
    },
    EditPaymentMethod: async (id, NameMethod, NumberMethod, NameUser, TypeMethod, StatusMethod) => {
        let data = await axios.put('/api/admin/EditPaymentMethod', {
            id,
            NameMethod,
            NumberMethod,
            NameUser,
            TypeMethod,
            StatusMethod,
        });
        return data;
    },
    SettingsConfig: async (value) => {
        let data = await axios.put('/api/admin/SettingsConfig', value);
        return data;
    },
    EditStatusPay: async ({ phone, status_pay }) => {
        let data = await axios.put('/api/admin/EditStatusPay', { phone, status_pay });
        return data;
    },

    GetSupportList: async () => {
        let response = await axios.get('/api/admin/Support/List');
        return response;
    },

    EditSupport: async (data) => {
        let response = await axios.post('/api/admin/Support/Edit', data);
        return response;
    },

    JoinConversation: async (data) => {
        let response = await axios.post('/api/admin/Conversation/Join', data);
        return response;
    },

    CreateMessage: async (data) => {
        let res = await axios.post('/api/admin/Message/Create', data);
        return res;
    },

    GetListMessage: async (data) => {
        let res = await axios.post('/api/admin/Message/List', data);
        return res;
    },

    // Event
    CreateEvent: async (data) => {
        let res = await axios.post('/api/v1/agent/event/create', data);
        return res;
    },

    GetListEvent: async (phone) => {
        const response = await axios.get('/api/v1/agent/event/list', {
            params: {
                phone: phone,
            },
        });
        return response;
    },

    EmptyCard: async (customer_id) => {
        const response = await axios.delete(`/api/v1/agent/empty-cart/${customer_id}`);
        return response;
    },
    

    GetTotalTransactionNotify: async () => {
        let response = await axios.get('/api/v1/agent/Transaction/TotalNotify');
        return response;
    },
};
