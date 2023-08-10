import { User } from '../../models';
//import Conversation from '../../models/mongod/conversation';
//import Support from '../../models/mongod/support';
import {Support} from '../../models';
export default async function (req, res) {
    try {
        const { support_id } = req.body;
        if (!support_id) {
            return res.status(200).json({
                status_code: 88,
                message: 'Missing required fields.',
            });
        }

        const hasSupport = await Support.findByPk(support_id);
        if (!hasSupport) {
            return res.status(200).json({
                status_code: 88,
                message: 'Support not found.',
            });
        }

        const phone = req.phone;

        if (!phone) {
            return res.status(200).json({
                status_code: 88,
                message: 'User not has phone.',
            });
        }

        const userInfo = await User.findOne({
            where: {
                phone: phone,
            },
            attributes: ['phone', 'money', 'username', 'role', 'ip_address', 'status', 'createdAt'],
        });

        if (!userInfo) {
            return res.status(200).json({
                status_code: 88,
                message: 'User not found.',
            });
        }
        await Support.update({
            status: 'processing'
        }, {
            where: {
                id: hasSupport.id,
            },
            raw: true,
        });
        res.status(200).json({
            status_code: 200,
            message: 'Join conversation successfully.',
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message,
        });
    }
}
