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

const Login = async(req, res, next) => {
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
        if (!user) {
            return res.status(200).json({
                status: 2,
                message: 'Tài khoản hoặc mật khẩu không chính xác',
            });
        }

        const isMatch = await bcrypt.compare(data.password_v1, user.password_v1);
        
        if (!isMatch || user.role !== 2) {
            return res.status(200).json({
                status: 2,
                message: 'Tài khoản hoặc mật khẩu không chính xác',
            });
        }

        let token = CreateJwt(user.phone);

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

const CreateEvent = async(req, res, next) => {
    var percent = req.body.percent;
    var customer_id = req.body.customer_id;
    var created_at = new Date();
    var expired_date = new Date(created_at);
    //console.log(expired_date);
    var listProductType = req.body.product_type;
    expired_date.setMinutes(parseInt(created_at.getMinutes()) + parseInt(req.body.expired_date));
    if (!percent || !created_at || !listProductType || !expired_date) {
        return res.status(500).json({
            status: 500,
            message: "invalidate data"
        });
    }
    //console.log(expired_date);
    var event = await eventSale.create({
        percent_sale: percent,
        created_at: created_at,
        listProductType: listProductType,
        expired_at: expired_date,
        agent_id: req.user.id,
        customer_id: customer_id
    });

    return res.status(200).json({
        status: 200,
        data: event
    });
}

const ListEventOfAgent = async(req, res, next) => {
    const filterPhone = req.query.phone;
    console.log(filterPhone);
    const filter = (filterPhone) ? {
        phone: filterPhone
    } : null;
    var eventSales = await eventSale.findAll({
        where: {
            agent_id: req.user.id,
        },
        attributes: ['*'],
        order: [
            ['expired_at', 'DESC']
        ],
        raw: true,
        include: {
            model: User,
            attributes: ['id', 'username', 'phone'],
            where: filter
        }
    });

    return res.status(200).json({
        status: 200,
        data: eventSales
    });
}

const ListUserOfAgent = async(req, res, next) => {
    var users = await User.findAll({
        where: {
            agent_id: req.user.id,
        },
        attributes: ['*'],
        raw: true,
    });

    return res.status(200).json({
        status: 200,
        data: users
    });
}

const AgentCreateCustomerAccount = async(req, res, nesxt) => {
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
            attributes: ['phone'],
            raw: true,
        });

        const refferer = await User.findOne({
            where: { invite: data.refferer },
            attributes: ['phone'],
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

        await User.create({...data, password_v1: hashedPassword, invite, ip_address, agent_id: refferer.id });

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

const Status = async(req, res, next) => {
    try {
        return res.status(200).json({
            status: 1,
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const agentConfirmRecharge = async(req, res, next) => {
    try {
        const { order_code, status } = req.body;

        const rechargeInfo = await Recharge.findOne({
            where: {
                order_code: order_code,
            },
            attributes: ['phone', 'amount'],
            raw: true,
        });

        await Recharge.update({
            status: status,
            is_agent_update: 1
        }, {
            where: {
                order_code: order_code,
            },
            raw: true,
        }, );

        const userInfo = await User.findOne({
            where: {
                phone: rechargeInfo.phone,
            },
            attributes: ['phone', 'money'],
            raw: true,
        });

        if (status == 1) { // approve
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
            message: 'chuyển trạng thái thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const agentGetRecharge = async(req, res, next) => {
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

const agentConfirmWithdraw = async(req, res, next) => {
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

        if (user && user.money - Number(withdrawlInfo.amount) < 0) {
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

        await Withdraw.update({
            status: status,
            is_agent_update: 1
        }, {
            where: {
                order_code: order_code,
            },
            raw: true,
        }, );
        if (status == 2) {
            await User.update({
                money: user.money + withdrawlInfo.amount,
            }, {
                where: {
                    id: user.id,
                },
                raw: true,
            }, );
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
}

const agentGetWithdraw = async(req, res, next) => {
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

module.exports = {
    Login,
    CreateEvent,
    ListEventOfAgent,
    ListUserOfAgent,
    AgentCreateCustomerAccount,
    Status,
    agentConfirmRecharge,
    agentGetRecharge,
    agentConfirmWithdraw,
    agentGetWithdraw,
    buyHistoryDelete,

    GetTotalTransactionNotify,
    GetUserInfo
};