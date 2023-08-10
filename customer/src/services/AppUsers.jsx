import axios from '../api/axios';

export default {
    Login: async (formData) => {
        let data = await axios.post('/api/admin/auth/login', formData);
        return data;
    },
    Register: async (formData) => {
        let data = await axios.post('/api/v1/users/auth/register', formData);
        return data;
    },
    GetUserInfo: async () => {
        let data = await axios.get('/api/v1/users/GetUserInfo');
        return data;
    },
    GetRechargeInfo: async () => {
        let data = await axios.get('/api/v1/users/GetRechargeInfo');
        return data;
    },
    CancelRechargeOrder: async () => {
        let data = await axios.put('/api/v1/users/CancelRechargeOrder');
        return data;
    },
    AddBankCard: async (formData) => {
        let data = await axios.post('/api/v1/users/AddBankCard', formData);
        return data;
    },
    GetBankCard: async () => {
        let data = await axios.get('/api/v1/users/GetBankCard');
        return data;
    },
    Status: async () => {
        let data = await axios.get('/api/v1/users/status');
        return data;
    },
    NewRecharge: async (formData) => {
        let data = await axios.post('/api/v1/users/recharge', formData);
        return data;
    },
    Withdraw: async (formData) => {
        let data = await axios.post('/api/v1/users/Withdraw', formData);
        return data;
    },
    GetWithdrawRecord: async () => {
        let data = await axios.get('/api/v1/users/GetWithdrawRecord');
        return data;
    },
    CancelWithdrawRecord: async (order_code) => {
        let data = await axios.post('/api/v1/users/CancelWithdrawRecord', {order_code});
        return data;
    },
    GetRechargeRecord: async () => {
        let data = await axios.get('/api/v1/users/GetRechargeRecord');
        return data;
    },
    GetSettings: async () => {
        let data = await axios.get('/api/v1/users/GetSettings');
        return data;
    },

    CreateTicket: async (data) => {
        let res = await axios.post('/api/v1/users/Support/Create', data);
        return res;
    },

    CreateMessage: async (data) => {
        let res = await axios.post('/api/v1/users/Message/Create', data);
        return res;
    },

    GetListMessage: async (data) => {
        let res = await axios.post('/api/v1/users/Message/List', data);
        return res;
    },

    // Product Type
    GetListProductType: async (data) => {
        let response = await axios.get('/api/v1/users/product-type');
        return response;
    },
    GetListProductByType: async (type) => {
        let response = await axios.get(`/api/v1/users/event/products?type=${type}`);
        return response;
    },

    BuyProduct: async (data) => {
        let response = await axios.post('/api/v1/users/event/products/buy', data);
        return response;
    },

    GetProductBought: async (data) => {
        let response = await axios.get('/api/v1/users/event/cart/history');
        return response;
    },
    // Event
    GetDetailEvenet: async (data) => {
        let res = await axios.post('/api/v1/users/Event/Detail', data);
        return res;
    },

    GetEventShow: async (data) => {
        let response = await axios.get('/api/v1/users/event/show');
        return response;
    },

    EventEnd: async (data) => {
        let res = await axios.post('/api/v1/users/event/end', data);
        return res;
    },

    UploadFile: async (data) => {
        let res = await axios.post('/api/upload/images', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
    EditSupport: async (data) => {
        let response = await axios.post('/api/v1/users/Support/Edit', data);
        return response;
    },

};
