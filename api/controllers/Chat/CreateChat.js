//import Message from '../../models/mongod/message';
import { User } from '../../models';
import { Message, Support } from '../../models';

export default async function (req, res) {
    try {
        const { content, file, file_type, support_id, is_guest, user } = req.body;
        if (!content && !file) {
            return res.status(200).json({
                message: 'Missing required fields.',
                status_code: 88,
            });
        }
        const supportInfo = await Support.findByPk(support_id);

        await Support.update({
            status: 'processing'
        }, {
            where: {
                id: supportInfo.id,
            },
            raw: true,
        });
        let agent_id = 0, customer_id = 0;
        let sender = user;
        let user_info = user;
        if(is_guest === false){
            user_info = await User.findOne({
                where: {
                    phone: user,
                },
                attributes: ['id', 'phone', 'agent_id', 'money', 'username', 'role'],
                raw: true,
            });
            if(user_info){
                sender = user_info.phone;
                agent_id = user_info.agent_id;
                customer_id = user_info.id;
            }
        }
        const newMessage = await Message.create({
            sender,
            content,
            file,
            file_type,
            agent_id,
            customer_id,
            support_id: supportInfo.id
        });
        let message = content.substring(0, 50);
        if(message.length < content.length){
            message += '...';
        }

        const { count } = await Support.findAndCountAll({
            where: {
                status: ['processing','pending']
            },
            offset: 0,
            limit: 1
        });

        global.pusher.trigger("my-channel", "boxchat-event", {
            user: user_info,
            is_guest,
            is_admin: false,
            support_id: supportInfo.id,
            message,
            total_notify: count
        });

        global.pusher.trigger("my-channel", "boxchat-send-event", {
            user: user_info,
            is_admin: false,
            support_id: supportInfo.id,
            data: newMessage
        });

        res.status(200).json({
            message: 'Sent',
            status_code: 200,
            data: newMessage
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            error_code: 500,
            error_message: 'Server Internal Error',
            message: 'Server Internal Error',
        });
    }
}
