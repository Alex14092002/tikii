import Joi from 'joi';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { CreateJwt } from '../middleware';
import { User } from '../models';
import { Bank } from '../models';
import { Cart } from '../models';

import { Recharge } from '../models';
import { Setting } from '../models';
import { Withdraw, Product } from '../models';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
        //const hashedPassword = await bcrypt.hash('123456', 10);
        //console.log(hashedPassword);
        const schema = Joi.object({
            phone: Joi.string().required(),
            password_v1: Joi.string().required(),
        });

        const { error } = schema.validate(data);

        if (error) {
            return res.status(200).json({
                status: 2,
                message: error.details[0].message,
            });
        }

        let user = await User.findOne({
            where: { phone: data.phone },
            attributes: ['phone', 'password_v1', 'role'],
            raw: true,
        });

        //console.log(user);

        if (!user) {
            return res.status(200).json({
                status: 2,
                message: 'Tài khoản hoặc mật khẩu không chính xác',
            });
        }
        let url_direct = process.env.ADMIN_URL;
        const isMatch = await bcrypt.compare(data.password_v1, user.password_v1);

        if (!isMatch) {
            return res.status(200).json({
                status: 2,
                message: 'Tài khoản hoặc mật khẩu không chính xác',
            });
        }
        if(user.role === 0){
            url_direct = '';
            user = await User.findOne({
                where: {
                    phone: data.phone,
                },
                attributes: ['id', 'phone', 'username', 'name_store', 'money', 'invite', 'grade', 'status', 'status_pay'],
                raw: true,
            });
        }
        else if(user.role === 2){
            url_direct = process.env.AGENT_URL;
        }

        let token = CreateJwt(user.phone);

        return res.status(200).json({
            status: 1,
            token: token,
            message: 'Đăng nhập thành công',
            user: user,
            url_direct
        });
    } catch (error) {
        console.log(error);
    }
};

const Status = async (req, res, next) => {
    try {
        return res.status(200).json({
            status: 1,
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const ListUser = async (req, res, next) => {
    try {
        const data = await User.findAll({
            raw: true,
            // order: [
            // ['id', 'phone', 'invite', 'refferer', 'agent_id', 'DESC']
            // ],
        });
        return res.status(200).json({
            status: 1,
            data: data,
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const GetRecharge = async (req, res, next) => {
    try {
        const data = await Recharge.findAll({
            raw: true,
            order: [
                ['id', 'DESC']
            ]
        });
        return res.status(200).json({
            status: 1,
            data: data,
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const GetWithdrawl = async (req, res, next) => {
    try {
        const data = await Withdraw.findAll({
            raw: true,
            order: [
                ['id', 'DESC']
            ]
        });

        return res.status(200).json({
            status: 1,
            data: data,
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const GetSettings = async (req, res, next) => {
    try {
        const user_id = req.user.id
        let data = await Setting.findOne({
            where: {
                user_id,
            },
            raw: true
        });

        if (!data) {
            data = null
        }

        return res.status(200).json({
            status: 1,
            data: data,
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const PaymentMethod = async (req, res, next) => {
    try {
        const data = await RechargeInfo.findAll({ raw: true });

        return res.status(200).json({
            status: 1,
            data: data,
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const GetUserDetail = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userInfo = await User.findOne({
            where: {
                id: id,
            },
            attributes: ['phone', 'money', 'username', 'role', 'ip_address', 'invite', 'status', 'grade', 'createdAt'],
            raw: true,
        });

        if (!userInfo) {
            return res.status(200).json({
                status: 2,
                message: 'Nhận thành bại',
            });
        }

        const bankcard = await Bank.findOne({
            where: {
                phone: userInfo.phone,
            },
            attributes: ['name_bank', 'full_name', 'number_bank', 'wallet_usdt'],
            raw: true,
        });

        const TotalRecharge = await Recharge.findAll({
            where: {
                phone: userInfo.phone,
                status: 1,
            },
            attributes: ['amount'],
            raw: true,
        });

        const ResultRecharge = TotalRecharge.reduce((a, b) => {
            return a + b.amount;
        }, 0);

        const TotalWithdrawl = await Withdraw.findAll({
            where: {
                phone: userInfo.phone,
                status: 1,
            },
            attributes: ['amount'],
            raw: true,
        });

        const ResultWithdrawl = TotalWithdrawl.reduce((a, b) => {
            return a + b.amount;
        }, 0);

        const data = { ...userInfo, ...bankcard, ResultRecharge, ResultWithdrawl };

        return res.status(200).json({
            status: 1,
            data: data,
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const Statistical = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.body;

        const date = new Date();
        const years = formateT(date.getFullYear());
        const months = formateT(date.getMonth() + 1);
        const days = formateT(date.getDate());

        const users = await User.count({
            attributes: ['phone'],
            raw: true,
        }); // Đếm tất cả user

        const user = await User.count({
            attributes: ['phone'],
            where: {
                createdAt: {
                    [Op.gte]: `${years}-${months}-${days} 00:00:00`,
                    [Op.lt]: `${years}-${months}-${days} 23:59:00`,
                },
            },
            raw: true,
        }); // Đếm user mới đăng kí trong ngày

        const totalRecharge = await Recharge.sum('amount', {
            where: {
                status: 1,
                createdAt: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                },
            },
            raw: true,
        }); // Tổng nạp

        const totalWithdrawl = await Withdraw.sum('amount', {
            where: {
                status: 1,
                createdAt: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                },
            },
            raw: true,
        }); // Tổng rút

        const totalDetail = await FinancialDetails.sum('amount', {
            where: {
                type: 4,
                createdAt: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                },
            },
            raw: true,
        }); // Tổng cộng tiền

        return res.status(200).json({
            status: 1,
            data: {
                TotalUser: users,
                TotalUserNew: user,
                TotalRecharge: totalRecharge,
                TotalWithdrawl: totalWithdrawl,
                TotalPlus: totalDetail,
            },
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const LockAccount = async (req, res, next) => {
    try {
        const { id, status } = req.body;

        const userInfo = await User.findOne({
            where: {
                id: id,
            },
            attributes: ['phone'],
            raw: true,
        });

        if (!userInfo) {
            return res.status(200).json({
                status: 2,
                message: 'Nhận thành bại',
            });
        }

        await User.update({ id, status }, {
            where: {
                id: id,
            },
            raw: true,
        },);

        return res.status(200).json({
            status: 1,
            message: 'Khóa tài khoản thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const EditUser = async (req, res, next) => {
    try {
        const { id, money, type, password } = req.body;

        const userInfo = await User.findOne({
            where: {
                id: id,
            },
            attributes: ['phone', 'money'],
            raw: true,
        });

        if (!userInfo) {
            return res.status(200).json({
                status: 2,
                message: 'Nhận thành bại',
            });
        }

        if (type === 'plus') {
            await User.update({ money: userInfo.money + Number(money) }, {
                where: {
                    id: id,
                },
                raw: true,
            },);

            return res.status(200).json({
                status: 1,
                message: 'Cộng tiền thành công',
            });
        }

        if (type === 'minus') {
            await User.update({ money: userInfo.money - Number(money) }, {
                where: {
                    id: id,
                },
                raw: true,
            },);

            return res.status(200).json({
                status: 1,
                message: 'Trừ tiền thành công',
            });
        }

        if (type === 'change-password') {
            console.log(password);
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.update({ password_v1: hashedPassword }, {
                where: {
                    id: id,
                },
                raw: true,
            },);
            return res.status(200).json({
                status: 1,
                message: 'Đổi mật khẩu thành công',
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const EditBankCard = async (req, res, next) => {
    try {
        const { userId, NameBank, NameUser, Stk, walletUsdt, grade } = req.body;

        const userInfo = await User.findOne({
            where: {
                id: userId,
            },
            attributes: ['phone'],
            raw: true,
        });

        if (!userInfo) {
            return res.status(200).json({
                status: 2,
                message: 'Nhận thành bại',
            });
        }

        await Bank.update({
            name_bank: NameBank,
            full_name: NameUser,
            number_bank: Stk,
            wallet_usdt: walletUsdt,
        }, {
            where: {
                phone: userInfo.phone,
            },
            raw: true,
        },);

        await User.update({
            grade
        }, {
            where: {
                id: userId
            },
            raw: true,
        },);

        return res.status(200).json({
            status: 1,
            message: 'Cập nhật ngân hàng thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const ConfirmRecharge = async (req, res, next) => {
    try {
        const { order_code, status } = req.body;

        const rechargeInfo = await Recharge.findOne({
            where: {
                order_code: order_code,
            },
            attributes: ['phone', 'amount', 'status'],
            raw: true,
        });

        if(rechargeInfo.status != 0){
            return res.status(200).json({
                status: 2,
                message: 'Thông tin đơn nạp tiền đã xử lý',
            });
        }

        await Recharge.update({
            status: status,
        }, {
            where: {
                order_code: order_code,
            },
            raw: true,
        },);

        const userInfo = await User.findOne({
            where: {
                phone: rechargeInfo.phone,
            },
            attributes: ['phone', 'money'],
            raw: true,
        });

        if (status == 1) {
            await User.update({
                money: userInfo.money + rechargeInfo.amount,
            }, {
                where: {
                    phone: rechargeInfo.phone,
                },
                raw: true,
            },);
        }
        let total_recharge = await countRecharge();
        let total_withdraw = await countWithdraw();
        global.pusher.trigger("my-channel", 'confirm-recharge-event', {
            order_code: rechargeInfo.order_code,
            phone: rechargeInfo.phone,
            amount: rechargeInfo.amount,
            status,
            total_notify: (total_recharge + total_withdraw),
            total_deposit_notify: total_recharge,
            total_withdraw_notify: total_withdraw
        });

        return res.status(200).json({
            status: 1,
            message: 'Cập nhật đơn nạp thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const ConfirmWithdrawal = async (req, res, next) => {
    try {
        const { order_code, status } = req.body;

        const withdrawlInfo = await Withdraw.findOne({
            where: {
                order_code: order_code,
            },
            attributes: ['phone', 'amount', 'order_code', 'status'],
            raw: true,
        });

        if(!withdrawlInfo){
            return res.status(200).json({
                status: 2,
                message: 'Thông tin đơn rút tiền không tìm thấy',
            });
        }

        if(withdrawlInfo.status != 0){
            return res.status(200).json({
                status: 2,
                message: 'Thông tin đơn rút tiền đã xử lý',
            });
        }

        const cardInfo = await Bank.findOne({
            where: {
                phone: withdrawlInfo.phone,
            },
            attributes: ['full_name', 'name_bank', 'number_bank'],
            raw: true,
        });

        const user = await User.findOne({
            where: {
                phone: withdrawlInfo.phone
            },
            attributes: ['id', 'phone', 'money'],
            raw: true
        })

        /*if (user && user.money - Number(withdrawlInfo.amount) < 0) {
            return res.status(200).json({
                status: 2,
                message: 'Số dư khả dụng không đủ',
            });
        }*/

        if (!cardInfo) {
            return res.status(200).json({
                status: 2,
                message: 'Hãy thực hiện liên kết ngân hàng trước',
            });
        }

        await Withdraw.update({
            status: status
        }, {
            where: {
                order_code: order_code,
            },
            raw: true,
        },);

        if (status == 2) {
            await User.update({
                money: user.money + withdrawlInfo.amount,
            }, {
                where: {
                    id: user.id,
                },
                raw: true,
            },);
        }
        let total_recharge = await countRecharge();
        let total_withdraw = await countWithdraw();
        global.pusher.trigger("my-channel", 'confirm-withdraw-event', {
            order_code: withdrawlInfo.order_code,
            phone: withdrawlInfo.phone,
            amount: withdrawlInfo.amount,
            status,
            total_notify: (total_recharge + total_withdraw),
            total_deposit_notify: total_recharge,
            total_withdraw_notify: total_withdraw
        });
        return res.status(200).json({
            status: 1,
            message: 'Cập nhật đơn rút thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const EditPaymentMethod = async (req, res, next) => {
    try {
        const { id, NameMethod, NumberMethod, NameUser, TypeMethod, StatusMethod } = req.body;

        await RechargeInfo.update({
            name_info: NameMethod,
            detail_info: NumberMethod,
            name_account: NameUser,
            type: TypeMethod,
            status: StatusMethod,
        }, {
            where: {
                id: id,
            },
            raw: true,
        },);

        return res.status(200).json({
            status: 1,
            message: 'Cập nhật phương thức thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const SettingsConfig = async (req, res, next) => {
    try {
        let data = req.body;
        data['phone'] = req.user.phone
        data['user_id'] = req.user.id

        const isExist = await Setting.findOne({
            where: {
                phone: data['phone']
            },
            raw: true
        })
        if (isExist) {
            await Setting.update(data, {
                where: {
                    phone: data.phone
                },
                raw: true,
            });
        } else {
            await Setting.create(data)
        }
        return res.status(200).json({
            status: 1,
            message: 'Cập nhật phương thức thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const EditStatusPay = async (req, res, next) => {
    try {
        const { phone, status_pay } = req.body;

        await User.update({
            status_pay: status_pay,
        }, {
            where: {
                phone: phone,
            },
            raw: true,
        },);

        return res.status(200).json({
            status: 1,
            message: 'Cập nhật tài khoản thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const adminCreateAgentAccount = async (req, res, next) => {
    try {
        const ip_address = req.socket.remoteAddress;
        const { password_v1, ...data } = req.body;

        const schema = Joi.object({
            phone: Joi.string().min(10).max(20).required(),
            username: Joi.string().min(10).max(50).required(),
            invite: Joi.string(),
            store_name: Joi.string().min(10).allow(null),
            password_v1: Joi.string().required(),
            role_id: Joi.number().required()
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
            attributes: ['phone'],
            raw: true,
        });

        const refferer = await User.findOne({
            where: { invite: data.invite },
            attributes: ['phone', 'id'],
            raw: true,
        });
        if (user && user.phone) {
            return res.status(200).json({
                status: 2,
                message: 'User da ton tai',
            });
        }
        function makeid(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        }
        var agent_id = null;
        var invite = null;

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
        if (refferer && data.role_id == 2) {
            return res.status(200).json({
                status: 2,
                message: 'Ma moi da ton tai',
            });
        } else if (refferer && data.role_id == 0) {
            console.log("Tao customer");
            agent_id = refferer.id;
        }

        if (data.role_id == 0) {
            invite = result + result2 + result3;
            console.log("INVITE Customer:", invite);
        } else if (data.role_id == 2) {
            invite = makeid(13)
            console.log("INVITE AGENT:", invite);
        }
        
        const hashedPassword = await bcrypt.hash(password_v1, 10);
        await User.create({
            password_v1: hashedPassword,
            refferer: data.invite,
            invite: invite,
            ip_address,
            role: data.role_id,
            agent_id: agent_id,
            store_name: data.store_name,
            phone: data.phone,
            username: data.username
        });

        let token = CreateJwt(data.phone);

        return res.status(200).json({
            status: 1,
            token: token,
            message: 'Đăng ký thành công',
        });
    } catch (error) {
        console.log(error);
    }
}

const buyHistoryDelete = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.customer_id
            },
            raw: true,
        });

        if (user) {
            const CartStatus = await Cart.destroy({
                where: {
                    is_closed: 1,
                    customer_id: user.id
                }
            })
            return res.status(200).json({
                status: 200,
                message: 'success',
            });
        }
        return res.status(500).json({
            status: 500,
            message: 'Fail',
        });
    } catch (error) {
        console.log(error);
    }
}

const ChangePassword = async (req, res, next) => {


    const { old_password, password } = req.body
    const user_id = req.user.id

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update({ password_v1: hashedPassword }, {
        where: {
            id: user_id,
        },
        raw: true,
    },);
    return res.status(200).json({
        status: 1,
        message: 'Đổi mật khẩu thành công',
    });
}
const CreateProduct = async (req, res, next) => {
    try {
        const { product_name, product_type, full_price, image_path } = req.body;

        if (!product_name) {
            return res.status(200).json({
                status: 2,
                message: 'Thiếu tên sản phẩm',
            });
        }

        if (!(full_price > 0)) {
            return res.status(200).json({
                status: 2,
                message: 'Thiếu giá bán sản phẩm',
            });
        }

        const product_info = await Product.findOne({
            where: {
                product_name
            },
            raw: true,
        });

        if (product_info) {
            return res.status(200).json({
                status: 2,
                message: 'Sản phẩm đã có trong hệ thống',
            });
        }

        const product = await Product.create({
            product_name, product_type, full_price, image_path, description: ''
        });

        return res.status(200).json({
            status: 1,
            product,
            message: 'Thông tin sản phẩm đã tạo thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const UpdateProduct = async (req, res, next) => {
    try {
        const { product_name, product_type, full_price, image_path, description } = req.body;

        if (!product_name) {
            return res.status(200).json({
                status: 2,
                message: 'Thiếu tên sản phẩm',
            });
        }

        if (!(full_price > 0)) {
            return res.status(200).json({
                status: 2,
                message: 'Thiếu giá bán sản phẩm',
            });
        }

        const product_info = await Product.findByPk(req.params.id);

        if (!product_info) {
            return res.status(200).json({
                status: 2,
                message: 'Không tìm thấy thông tin sản phẩm',
            });
        }
        await product_info.update({
            product_name, product_type, full_price, image_path, description
        });
        
        return res.status(200).json({
            status: 1,
            product: product_info,
            message: 'Thông tin sản phẩm đã cập nhật thành công',
        });
    } catch (error) {
        console.log(error);
    }
}

const UpdateLockProduct = async (req, res, next) => {
    try {

        const product_info = await Product.findByPk(req.params.id);

        if (!product_info) {
            return res.status(200).json({
                status: 2,
                message: 'Không tìm thấy thông tin sản phẩm',
            });
        }
        let is_lock = 0;
        if(product_info.is_lock === 0){
            is_lock = 1;
        }
        await product_info.update({
            is_lock
        });
        
        return res.status(200).json({
            status: 1,
            product: product_info,
            message: 'Sản phẩm đã '+(is_lock == 1?"khóa":"mở khóa")+' thành công',
        });
    } catch (error) {
        console.log(error);
    }
}

const GetListProduct = async (req, res, next) => {
    try {
        const data = await Product.findAll({
            order: [
                ['product_type', 'ASC'],
                ['id', 'DESC']
            ],
            attributes: ['*'],
            raw: true
        });

        return res.status(200).json({
            status: 1,
            data: data
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
const GetTotalTransactionNotify = async (req, res, next) => {
    let total_recharge = await countRecharge();
    let total_withdraw = await countWithdraw();
    return res.status(200).json({
        status_code: 200,
        total_notify: (total_recharge + total_withdraw),
        total_deposit_notify: total_recharge,
        total_withdraw_notify: total_withdraw
    });
}

const GetUserInfo = async (req, res, next) => {
    const phone = req.phone;

    if (phone) {
        const info = await User.findOne({
            where: {
                phone: phone,
            },
            attributes: ['id', 'phone', 'username', 'invite'],
            raw: true,
        });
        return res.status(200).json({
            status_code: 200,
            data: info
        });
    }
    return res.status(200).json({ data: null });
};


const withdrawalHistoryDelete = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.customer_id
            },
            raw: true,
        });

        if (user) {
             await Withdraw.destroy({
                where: {
                    status: {
                        [Op.not]: 0
                    },
                    phone: user.phone
                }
            })
            return res.status(200).json({
                status: 200,
                message: 'Lịch sử rút tiền đã xóa thành công',
            });
        }
        return res.status(500).json({
            status: 500,
            message: 'Fail',
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    Login,
    Status,
    ListUser,
    GetRecharge,
    GetWithdrawl,
    GetSettings,
    PaymentMethod,
    GetUserDetail,
    Statistical,
    LockAccount,
    EditUser,
    EditBankCard,
    ConfirmRecharge,
    ConfirmWithdrawal,
    EditPaymentMethod,
    SettingsConfig,
    EditStatusPay,
    adminCreateAgentAccount,
    buyHistoryDelete,
    ChangePassword,

    CreateProduct,
    GetListProduct,
    UpdateProduct,
    UpdateLockProduct,
    GetTotalTransactionNotify,
    GetUserInfo,
    withdrawalHistoryDelete
};