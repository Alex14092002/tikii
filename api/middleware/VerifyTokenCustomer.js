import { User } from '../models';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const VerifyTokenCustomer = async(req, res, next) => {
    let key = process.env.JWT_SECRET;
    let authorization = req.headers.authorization;
    if (authorization && authorization.split(' ')[1]) {
        let token = authorization.split(' ')[1];
        //console.log("token: ", token);
        jwt.verify(token, key, async(err, decoded) => {
            //console.log("verifyTokenCustomer err: ", err);
            if (err) {
                return res.status(200).json({
                    status: 4,
                    message: 'Phiên đăng nhập hết hạn',
                });
            }
            let phone = decoded.data;
            let user = await User.findOne({
                where: {
                    phone,
                },
                attributes: ['id', 'phone', 'agent_id', 'money', 'username', 'role'],
                raw: true,
            });
            if (!user) {
                return res.status(200).json({
                    status: 4,
                    message: 'Phiên đăng nhập hết hạn',
                });
            }
            if (user.role != 0) {
                return res.status(200).json({
                    status: 4,
                    message: 'Phiên đăng nhập hết hạn',
                });
            }
            req.user = user;
            req.phone = phone;
            next();
        });
    } else {
        if (req.url == "/product-type") {
            next();
        } 
        else{
            return res.status(200).json({
                status: 4,
                message: 'Phiên đăng nhập hết hạn',
                login: true
            });
        }
        /*if (req.url != "/product-type" || req.url != "/event/products") {
            next();
        } else{
            return res.status(200).json({
                status: 4,
                message: 'Phiên đăng nhập hết hạn',
            });
        }*/
    }
};

export default VerifyTokenCustomer;