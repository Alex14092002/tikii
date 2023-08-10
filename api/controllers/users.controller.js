import Joi from 'joi';
import createError from 'http-errors';
import sequelize, { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import { CreateJwt } from '../middleware';
import { User } from '../models';
import { Bank } from '../models';
import { Setting } from '../models';
import { eventSale } from '../models';
import { Product } from '../models';
import { Cart } from '../models';
import { on } from 'nodemon';
import { Recharge } from '../models';
import { Withdraw } from '../models';
require('dotenv').config();
const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};

const isPhoneVn = (params) => {
    let pattern = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    return pattern.test(params);
};

function formateT(params) {
    let result = params < 10 ? '0' + params : params;
    return result;
}

function timerJoin(params = '', split = '') {
    // params là truyền vào timespam còn split là truyền vào ngăn cách(-, :)
    let date = '';
    if (params) {
        date = new Date(Number(params));
    } else {
        date = new Date();
    }
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());
    return years + split + months + split + days;
}

function randomStr(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Login = async (req, res, next) => {
    try {
        const data = req.body;
        const schema = Joi.object({
            phone: Joi.string().required(),
            password_v1: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(200).json({
                status: 2,
                message: error.details[0].message,
            });
        }

        const user = await User.findOne({
            where: { phone: data.phone },
            raw: true,
        });


        if (!user || user.role !== 0) {
            return res.status(200).json({
                status: 2,
                message: 'Tài khoản hoặc mật khẩu không chính xác',
            });
        }

        const isMatch = await bcrypt.compare(data.password_v1, user.password_v1);

        if (!isMatch || user.role !== 0) {
            return res.status(200).json({
                status: 2,
                message: 'Tài khoản hoặc mật khẩu không chính xác',
            });
        }

        let token = CreateJwt(user.phone);

        addMoneyAfterEndEventSale(req, user);
        return res.status(200).json({
            status: 1,
            token: token,
            message: 'Đăng nhập thành công',
            user,
        });
    } catch (error) {
        console.log(error);
    }
};

const Register = async (req, res, next) => {
    try {
        const ip_address = req.socket.remoteAddress;
        const { password_v1, ...data } = req.body;

        const schema = Joi.object({
            phone: Joi.string().min(10).max(20).required(),
            username: Joi.string().min(10).max(50).required(),
            name_store: Joi.string().min(5).max(150).required(),
            refferer: Joi.string().required(),
            password_v1: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(200).json({
                status: 2,
                message: error.details[0].message,
            });
        }

        const user = await User.findOne({
            where: { phone: data.phone },
            attributes: ['phone', 'username', 'id'],
            raw: true,
        });

        const refferer = await User.findOne({
            where: { invite: data.refferer },
            attributes: ['phone', 'id'],
            raw: true,
        });

        if (user && user.phone) {
            return res.status(200).json({
                status: 2,
                message: 'Tài khoản đã tồn tại trong hệ thống',
            });
        }

        if (!refferer) {
            return res.status(200).json({
                status: 2,
                message: 'Mã mời không tồn tại',
            });
        }

        let result = '';
        let result2 = '';
        let result3 = '';
        let characters = '0123456789';
        let characters2 = '0123456789';
        let charactersLength = characters.length;
        let charactersLength2 = characters2.length;
        for (let i = 0; i < 1; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        for (let i = 0; i < 1; i++) {
            result2 += characters2.charAt(Math.floor(Math.random() * charactersLength2));
        }

        for (let i = 0; i < 3; i++) {
            result3 += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        const invite = result + result2 + result3;

        const hashedPassword = await bcrypt.hash(password_v1, 10);

        const el = await User.create({ ...data, password_v1: hashedPassword, invite, ip_address, agent_id: refferer.id });

        let token = CreateJwt(data.phone);

        return res.status(200).json({
            status: 1,
            token: token,
            user: el,
            message: 'Đăng ký thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const GetUserInfo = async (req, res, next) => {
    const phone = req.phone;

    if (phone) {
        const data = await User.findOne({
            where: {
                phone: phone,
            },
            attributes: ['id', 'phone', 'username', 'name_store', 'money', 'invite', 'grade', 'status', 'status_pay'],
            raw: true,
        });
        addMoneyAfterEndEventSale(req, data);
        return res.status(200).json(data);
    }
    return res.status(200).json({ data: null });
};

const GetSettings = async (req, res, next) => {
    const data = await Setting.findOne({
        where: {},
        attributes: ['link_support'],
        raw: true,
    });
    return res.status(200).json(data);
};

const StatusToken = async (req, res, next) => {
    return res.status(200).json({
        status: 1,
    });
};

const AddBankCard = async (req, res, next) => {
    try {
        const data = req.body;
        const phone = req.phone;

        if (!data.wallet_usdt) {
            const schema = Joi.object({
                full_name: Joi.string().max(100).required(),
                name_bank: Joi.string().max(100).required(),
                number_bank: Joi.string().max(100).required(),
                wallet_usdt: Joi.any().optional(),
            });

            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(200).json({
                    status: 2,
                    message: error.details[0].message,
                });
            }
        } else {
            const schema = Joi.object({
                wallet_usdt: Joi.string().max(100).required(),
            });

            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(200).json({
                    status: 2,
                    message: error.details[0].message,
                });
            }
        }
        const bank = await Bank.findOne({
            where: { phone: phone },
            attributes: ['phone', 'number_bank', 'wallet_usdt'],
            raw: true,
        });
        let is_edit = false;
        if (bank) {
            if (data.wallet_usdt) {
                /*return res.status(200).json({
                    status: 2,
                    message: 'Tài khoản này đã liên kết thẻ ngân hàng',
                });*/
                await Bank.update({ 
                    wallet_usdt: data.wallet_usdt
                 }, {
                    where: {
                        phone: phone,
                    },
                });
            }
            else {
                await Bank.update({ 
                    full_name: data.full_name,
                    name_bank: data.name_bank,
                    number_bank: data.number_bank
                 }, {
                    where: {
                        phone: phone,
                    },
                });
            }
            is_edit = true;
        }
        else {
            await Bank.create({ phone, ...data });
        }
        console.log("is_edit: ", is_edit);
        return res.status(200).json({
            status: 1,
            message: (is_edit === true)?'Lưu thông tin thành công':'Liên kết thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const GetBankCard = async (req, res, next) => {
    const phone = req.phone;
    const data = await Bank.findOne({
        where: {
            phone: phone,
        },
        attributes: ['*'],
        raw: true,
    });

    console.log(data);
    if (data && data['phone'] && data['number_bank'] == '') {
        return res.status(200).json({ data: null });

    }
    return res.status(200).json(data);
};

const ChangePassword = async (req, res, next) => {
    try {
        const phone = req.phone;
        const data = req.body;
        const schema = Joi.object({
            password_v1: Joi.string().required(),
            new_password: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(200).json({
                status: 2,
                message: error.details[0].message,
            });
        }

        const user = await User.findOne({
            where: { phone: phone },
            attributes: ['phone', 'password_v1'],
            raw: true,
        });

        const isMatch = await bcrypt.compare(data.password_v1, user.password_v1);

        if (!isMatch) {
            return res.status(200).json({
                status: 2,
                message: 'Mật khẩu hiện tại không chính xác',
            });
        }

        const hashedPassword = await bcrypt.hash(data.new_password, 10);

        await User.update({ password_v1: hashedPassword }, {
            where: {
                phone: phone,
            },
        },);

        return res.status(200).json({
            status: 1,
            message: 'Đổi mật khẩu thành công',
        });
    } catch (error) {
        next(error);
    }
};

const ChangePasswordPayment = async (req, res, next) => {
    try {
        const phone = req.phone;
        const data = req.body;
        const schema = Joi.object({
            password_v2: Joi.string().required(),
            new_password: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(200).json({
                status: 2,
                message: error.details[0].message,
            });
        }

        const user = await User.findOne({
            where: { phone: phone },
            attributes: ['phone', 'password_v2'],
            raw: true,
        });

        const isMatch = await bcrypt.compare(data.password_v2, user.password_v2);

        if (!isMatch) {
            return res.status(200).json({
                status: 2,
                message: 'Mật khẩu hiện tại không chính xác',
            });
        }

        const hashedPassword = await bcrypt.hash(data.new_password, 10);

        await User.update({ password_v2: hashedPassword }, {
            where: {
                phone: phone,
            },
        },);

        return res.status(200).json({
            status: 1,
            message: 'Đổi mật khẩu thành công',
        });
    } catch (error) {
        next(error);
    }
};

const GetRechargeInfo = async (req, res, next) => {
    try {
        const phone = req.phone;
        const RechargeOrder = await Recharge.findOne({
            where: { phone: phone, status: 0 },
            attributes: ['order_code', 'amount', 'status', 'createdAt'],
            raw: true,
        });

        if (!RechargeOrder) {
            return res.status(200).json({
                status: 2,
                message: 'Not Found',
            });
        }

        const InfoRecharge = await Setting.findOne({
            attributes: ['full_name', 'name_bank', 'number_bank', 'wallet_usdt', 'link_support'],
            raw: true,
        });

        return res.status(200).json({
            status: 1,
            data: { ...RechargeOrder, ...InfoRecharge },
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const RechargeMethod = async (req, res, next) => {
    try {
        const phone = req.phone;
        const { amount } = req.body;
        const amounts = [50000, 200000, 500000, 1000000, 5000000, 10000000, 30000000, 5000000000];

        const schema = Joi.object({
            amount: Joi.number()
                .min(50000)
                .max(5000000000)
                .required()
                .messages({
                    'number.empty': 'Vui lòng nhập số tiền nạp',
                    'number.min': 'Số tiền nạp tối thiểu là: ' + amounts[0],
                    'number.max': 'Số tiền nạp tối đa là: ' + amounts[amounts.length - 1],
                }),
        });

        const { error } = schema.validate({ amount });

        if (error) {
            return res.status(200).json({
                status: 2,
                message: error.details[0].message,
            });
        }

        const RechargeOrder = await Recharge.findAll({
            where: { phone: phone, status: 0 },
            attributes: ['id'],
            raw: true,
        });

        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        const RechargeOrderToday = await Recharge.findAll({
            where: {
                phone: phone,
                createdAt: {
                    [Op.between]: [
                        sequelize.literal(`"${startDate.toISOString()}"`),
                        sequelize.literal(`"${endDate.toISOString()}"`),
                    ],
                },
            },
            attributes: ['id'],
            raw: true,
        });

        if (RechargeOrderToday.length > 20) {
            return res.status(200).json({
                status: 2,
                message: 'Mỗi ngày bạn chỉ có thể tạo tối đa 20 đơn nạp',
            });
        }

        if (RechargeOrder.length > 0) {
            return res.status(200).json({
                status: 2,
                message: 'Có đơn nạp chưa hoàn tất giao dịch',
            });
        }

        let order_code = timerJoin() + randomStr(11).toUpperCase();

        let rechargeInfo = await Recharge.create({ phone, amount, order_code, status: 0 });
        let total_recharge = await countRecharge();
        let total_withdraw = await countWithdraw();
        global.pusher.trigger("my-channel", "recharge-event", {
            order_code: rechargeInfo.order_code,
            phone: rechargeInfo.phone,
            amount: rechargeInfo.amount,
            status: rechargeInfo.status,
            total_notify: (total_recharge + total_withdraw),
            total_deposit_notify: total_recharge,
            total_withdraw_notify: total_withdraw
        });

        return res.status(200).json({
            status: 1,
            message: 'Tạo đơn nạp thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const countRecharge = async () => {
    const { count } = await Recharge.findAndCountAll({
        where: {
            status: 0
        },
        offset: 0,
        limit: 1
    });
    return count;
}

const WithdrawMethod = async (req, res, next) => {
    try {
        const phone = req.phone;
        const { amount } = req.body;
        const amounts = [50000, 200000, 500000, 1000000, 5000000, 10000000, 30000000, 500000000, 5000000000];

        const schema = Joi.object({
            amount: Joi.number()
                .min(50000)
                .max(5000000000)
                .required()
                .messages({
                    'number.empty': 'Vui lòng nhập số tiền rút',
                    'number.min': 'Số tiền rút tối thiểu là: ' + amounts[0],
                    'number.max': 'Số tiền rút tối đa là: ' + amounts[amounts.length - 1],
                }),
        });

        const { error } = schema.validate({ amount });

        if (error) {
            return res.status(200).json({
                status: 2,
                message: error.details[0].message,
            });
        }

        const user = await User.findOne({
            where: { phone: phone },
            attributes: ['id', 'phone', 'money'],
            raw: true,
        });

        const WithdrawOrder = await Withdraw.findAll({
            where: { phone: phone, status: 0 },
            attributes: ['id'],
            raw: true,
        });

        const cardInfo = await Bank.findOne({
            where: {
                phone: phone,
            },
            attributes: ['full_name', 'name_bank', 'number_bank'],
            raw: true,
        });

        if (WithdrawOrder.length > 0) {
            return res.status(200).json({
                status: 2,
                message: 'Có đơn rút chưa hoàn tất giao dịch',
            });
        }

        if (user.money - Number(amount) < 0) {
            return res.status(200).json({
                status: 2,
                message: 'Số dư khả dụng không đủ',
            });
        }

        if (!cardInfo) {
            return res.status(200).json({
                status: 2,
                message: 'Hãy thực hiện liên kết ngân hàng trước',
            });
        }

        let order_code = timerJoin() + randomStr(11).toUpperCase();

        let withdrawInfo = await Withdraw.create({ phone, amount, order_code, status: 0, ...cardInfo });
        await User.update({
            money: user.money - amount,
        }, {
            where: {
                id: user.id,
                phone: user.phone
            },
        });
        let total_recharge = await countRecharge();
        let total_withdraw = await countWithdraw();
        global.pusher.trigger("my-channel", "withdraw-event", {
            order_code: withdrawInfo.order_code,
            phone: withdrawInfo.phone,
            amount: withdrawInfo.amount,
            status: withdrawInfo.status,
            total_notify: (total_recharge + total_withdraw),
            total_deposit_notify: total_recharge,
            total_withdraw_notify: total_withdraw
        });

        return res.status(200).json({
            status: 1,
            message: 'Tạo đơn rút thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const countWithdraw = async () => {
    const { count } = await Withdraw.findAndCountAll({
        where: {
            status: 0
        },
        offset: 0,
        limit: 1
    });
    return count;
}

const GetWithdrawRecord = async (req, res, next) => {
    const phone = req.phone;
    const data = await Withdraw.findAll({
        where: {
            phone: phone,
        },
        attributes: ['order_code', 'amount', 'status', 'createdAt'],
        order: [
            ['id', 'DESC']
        ],
        raw: true,
    });
    return res.status(200).json(data);
};

const CancelWithdrawRecord = async (req, res, next) => {
    let order_code = req.body.order_code;
    if(!order_code){
        return res.status(200).json({
            status: 2,
            message: 'Thiếu mã yêu cầu rút tiền',
        });
    }
    const agentWithdrawInfo = await Withdraw.findOne({
        where: { order_code: order_code, status: 0 },
        attributes: ['id','phone','amount'],
        raw: true,
    });
    if (!agentWithdrawInfo) {
        return res.status(200).json({
            status: 2,
            message: 'Yêu cầu rút tiền không tồn tại',
            allow_cancel: true
        });
    }
    const user = await User.findOne({
        where: {
            phone: agentWithdrawInfo.phone
        },
        attributes: ['id', 'phone', 'money'],
        raw: true
    })
    await Withdraw.update({ status: 3 }, {
        where: {
            id: agentWithdrawInfo.id,
        },
    },);
    await User.update({
        money: user.money + agentWithdrawInfo.amount,
    }, {
        where: {
            id: user.id,
        },
        raw: true,
    }, );

    let total_recharge = await countRecharge();
    let total_withdraw = await countWithdraw();
    global.pusher.trigger("my-channel", "cancel-transaction-event", {
        total_notify: (total_recharge + total_withdraw),
        total_deposit_notify: total_recharge,
        total_withdraw_notify: total_withdraw,
    });

    return res.status(200).json({
        status: 1,
        message: 'Hủy yêu cầu rút tiền thành công',
    });
};

const GetRechargeRecord = async (req, res, next) => {
    const phone = req.phone;
    const data = await Recharge.findAll({
        where: {
            phone: phone,
        },
        attributes: ['order_code', 'amount', 'status', 'createdAt'],
        order: [
            ['id', 'DESC']
        ],
        raw: true,
    });
    return res.status(200).json(data);
};

const CancelRechargeOrder = async (req, res, next) => {
    try {
        const phone = req.phone;

        const RechargeOrder = await Recharge.findOne({
            where: { phone: phone, status: 0 },
            attributes: ['id'],
            raw: true,
        });

        if (!RechargeOrder) {
            return res.status(200).json({
                status: 2,
                message: 'Đơn nạp không tồn tại',
                allow_cancel: true
            });
        }

        await Recharge.update({ status: 3 }, {
            where: {
                id: RechargeOrder.id,
            },
        },);

        let total_recharge = await countRecharge();
        let total_withdraw = await countWithdraw();
        global.pusher.trigger("my-channel", "cancel-transaction-event", {
            total_notify: (total_recharge + total_withdraw),
            total_deposit_notify: total_recharge,
            total_withdraw_notify: total_withdraw,
        });

        return res.status(200).json({
            status: 1,
            message: 'Hủy đơn nạp thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const GetEventFromAgent = async (req, res, next) => {
    try {
        console.log(req.user.agent_id);
        var eventSales = await eventSale.findAll({
            where: {
                agent_id: req.user.agent_id,
                expired_at: {
                    [Op.gt]: new Date(),
                },
                created_at: {
                    [Op.lte]: new Date(),
                },
                customer_id: req.user.id
            },
            attributes: ['*'],
            order: [
                ['expired_at', 'ASC']
            ],
            raw: true,
        });

        eventSales.forEach(event => {
            event.product_type = event.product_type.split(",");
        });
        return res.status(200).json({
            status: 200,
            message: eventSales,
            // products: products
        });
    } catch (error) {
        console.log(error);
    }
}

const GetListProductType = async (req, res, next) => {
    var eventSales = [];
    if (req.user && req.user.agent_id) {
        eventSales = await eventSale.findAll({
            where: {
                agent_id: req.user.agent_id,
                expired_at: {
                    [Op.gt]: new Date(),
                },
                created_at: {
                    [Op.lte]: new Date(),
                },
                customer_id: req.user.id
            },
            attributes: ['*'],
            order: [
                ['expired_at', 'ASC']
            ],
            raw: true,
        });
    }

    var listType = [{
        "id": null,
        "agent_id": null,
        "created_at": null,
        "expired_at": null,
        "listProductType": "1",
        "percent_sale": 0,
        "customer_id": null,
        "name": "Đồ gia dụng"
    },
    {
        "id": null,
        "agent_id": null,
        "created_at": null,
        "expired_at": null,
        "listProductType": "2",
        "percent_sale": 0,
        "customer_id": null,
        "name": "Điện tử"
    },
    {
        "id": null,
        "agent_id": null,
        "created_at": null,
        "expired_at": null,
        "listProductType": "3",
        "percent_sale": 0,
        "customer_id": null,
        "name": "Sang trọng"
    },
    {
        "id": null,
        "agent_id": null,
        "created_at": null,
        "expired_at": null,
        "listProductType": "4",
        "percent_sale": 0,
        "customer_id": null,
        "name": "Trang điểm"
    }
    ];
    if (eventSales.length > 0) {
        eventSales.forEach(event => {
            if (event.listProductType) {
                if (listType[parseInt(event.listProductType) - 1]) {
                    listType[parseInt(event.listProductType) - 1].id = event.id;
                    listType[parseInt(event.listProductType) - 1].agent_id = event.agent_id;
                    listType[parseInt(event.listProductType) - 1].created_at = event.created_at;
                    listType[parseInt(event.listProductType) - 1].expired_at = event.expired_at;
                    listType[parseInt(event.listProductType) - 1].percent_sale = event.percent_sale;
                    listType[parseInt(event.listProductType) - 1].customer_id = parseInt(event.customer_id);
                }
            }
        });
    }
    return res.status(200).json({
        status: 200,
        data: listType
    });
}

const GetProducsInType = async (req, res, next) => {
    var type = req.query.type;
    if (req.user) {
        var eventSales = await eventSale.findOne({
            where: {
                agent_id: req.user.agent_id,
                expired_at: {
                    [Op.gt]: new Date(),
                },
                created_at: {
                    [Op.lte]: new Date(),
                },
                listProductType: type,
                customer_id: req.user.id
            },
            attributes: ['*'],
            order: [
                ['expired_at', 'ASC']
            ],
            raw: true,
        });

        var products = await Product.findAll({
            where: {
                product_type: type,
                is_lock: 0
            },
            attributes: ['*'],
            order: [
                ['full_price', 'ASC']
            ],
            raw: true,
        });

        if (eventSales) {
            products.forEach(prod => {
                prod.sale_price = (prod.full_price * eventSales.percent_sale) / 100;
                prod.percent_sale = eventSales.percent_sale;
                prod.image_path = process.env.APP_URL + "/images/" + prod.image_path;
            });
        } else {
            products.forEach(prod => {
                prod.sale_price = prod.full_price;
                prod.percent_sale = 0;
                prod.image_path = process.env.APP_URL + "/images/" + prod.image_path;
            });
        }
        return res.status(200).json({
            status: 200,
            products: products,
            event_sale: eventSales
        });
    } else {
        var products = await Product.findAll({
            where: {
                product_type: type,
                is_lock: 0
            },
            attributes: ['*'],
            raw: true,
        });
        products.forEach(prod => {
            prod.sale_price = prod.full_price;
            prod.percent_sale = 0;
        });

        return res.status(200).json({
            status: 200,
            products: products,
            event_sale: []
        });
    }
}

const BuyProduct = async (req, res, next) => {
    var product_id = req.body.product_id;
    var product_type = req.body.product_type;
    var event_id = req.body.event_id;
    var money = req.user.money;
    var agent_id = req.user.agent_id;

    var cart = await Cart.findOne({
        where: {
            customer_id: req.user.id,
            event_id,
            product_id,
            product_type,
            is_closed: null
        },
        attributes: ['*'],
        order: [
            ['createdAt', 'ASC']
        ],
        raw: true,
    });

    if(cart){
        return res.status(200).json({
            status: 200,
            message: 'Quý khách đang đặt mua sản phẩm này'
        });
    }

    //addMoneyAfterEndEventSale(req, req.user);

    var eventSales = await eventSale.findOne({
        where: {
            agent_id: req.user.agent_id,
            expired_at: {
                [Op.gt]: new Date(),
            },
            created_at: {
                [Op.lte]: new Date(),
            },
            id: event_id,
            listProductType: product_type
        },
        attributes: ['*'],
        order: [
            ['expired_at', 'ASC']
        ],
        raw: true,
    });


    var product = await Product.findOne({
        where: {
            id: product_id,
            product_type: product_type
        },
        attributes: ['*'],
        raw: true
    });

    var sale_price = 0;
    if (!eventSales) {
        sale_price = 0; //(product.full_price * eventSales.percent_sale) / 100;
    } else {
        sale_price = (product.full_price * eventSales.percent_sale) / 100;
    }


    if (!product) {
        return res.status(200).json({
            status: 200,
            message: 'Không tồn tại sản phẩm này'
        });
    }
    if (req.user.money < product.full_price) {
        return res.status(200).json({
            status: 200,
            message: 'Quý khách không đủ tiền, vui lòng nạp tiền vào tài khoản'
        });
    }
    let userUpdateMoney = await User.update({ money: (req.user.money) - (product.full_price) }, {
        where: {
            id: req.user.id,
        },
        raw: true,
    },)
    if (userUpdateMoney) {
        var cartAdd = await Cart.create({
            product_id: product.id,
            product_type: product.product_type,
            full_price: product.full_price,
            sale_price: sale_price,
            agent_id: agent_id,
            event_id: (eventSales) ? eventSales.id : null,
            is_closed: null,
            created_at: new Date(),
            customer_id: req.user.id
        });
    }

    return res.status(200).json({
        status: 200,
        message: "Mua thành công"
    });
}

const buyHistory = async (req, res, next) => {
    //console.log(req.user.id);
    var carts = await Cart.findAll({
        where: {
            customer_id: req.user.id
        },
        include: [{
            model: Product,
            required: true,
            on: {
                col1: sequelize.where(sequelize.col("Product.id"), "=", sequelize.col("Cart.product_id")),
            },
            right: true // has no effect, will create an inner join
        },
        {
            model: User,
            required: true,
            on: {
                col1: sequelize.where(sequelize.col("User.id"), "=", sequelize.col("Cart.agent_id")),
            },
            right: true // has no effect, will create an inner join
        }
        ]
    });
    carts.forEach(product => {
        product.Product.agent_id = product.User.id;
        product.Product.agent_name = product.User.username;
        product.Product.invite = product.User.invite
        product.Product.image_path = process.env.APP_URL + "/images/" + product.Product.image_path;

    });
    return res.status(200).json({
        status: 200,
        data: carts
    });
};

const endTimeSale = async (req, res, next) => {
    addMoneyAfterEndEventSale(req);
    return res.status(200).json({
        status: 200,
        data: "done"
    });
}

const addMoneyAfterEndEventSale = async (req, user) => {
    var userId = (req.user) ? req.user.id : user.id;
    var userMoney = (req.user) ? req.user.money : user.money;
    const carts = await Cart.findAll({
        where: {
            customer_id: userId,
            is_closed: null
        },
        raw: true,
        attributes: ['*'],
        include: {
            model: eventSale,
            attributes: ['id', 'created_at', 'expired_at'],
            where: {
                expired_at: {
                    [Op.lte]: new Date()
                }
            }
        }
    });
    var addMoney = 0;
    if (carts.length > 0) {
        carts.forEach(product => {
            if (product.full_price) {
                addMoney += product.full_price + product.sale_price;
                Cart.update({
                    is_closed: 1
                }, {
                    where: {
                        id: product.id,
                        is_closed: null,
                        customer_id: userId
                    }
                });
            }
        });

        User.update({
            money: userMoney + addMoney
        }, {
            where: { id: userId }
        });
    }
}

module.exports = {
    Register,
    Login,
    GetUserInfo,
    GetSettings,
    StatusToken,
    ChangePassword,
    ChangePasswordPayment,
    GetRechargeInfo,
    RechargeMethod,
    WithdrawMethod,
    GetWithdrawRecord,
    GetRechargeRecord,
    CancelRechargeOrder,
    AddBankCard,
    GetBankCard,
    GetEventFromAgent,
    GetListProductType,
    GetProducsInType,
    BuyProduct,
    buyHistory,
    endTimeSale,

    CancelWithdrawRecord
};