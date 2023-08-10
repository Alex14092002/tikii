import { User, Support, Message } from '../../models';

export default async function (req, res) {
    try {
        const { content, file, file_type, support_id } = req.body;
        if (!content && !file) {
            return res.status(200).json({
                message: 'Missing required fields.',
                status_code: 88,
            });
        }

        const support = await Support.findByPk(support_id);
        let agent_id = 0, customer_id = 0;
        let user = null;
        if(support.is_guest === 1){
            user = {
                phone: support.user
            }
        } 
        else{
            user = await User.findOne({
                where: {
                    phone: support.user,
                },
                attributes: ['phone', 'money', 'username', 'role', 'ip_address', 'status', 'createdAt'],
                raw: true,
            });
            agent_id = user.agent_id;
            customer_id = user.id;
        }

        const newMessage = await Message.create({
            sender: 'admin',
            content,
            file,
            file_type,
            agent_id,
            customer_id,
            support_id: support.id
        });
        let message = content.substring(0, 50);
        if(message.length < content.length){
            message += '...';
        }

        global.pusher.trigger("my-channel", "boxchat-event", {
            user,
            is_admin: true,
            support_id: support.id,
            message,
        });
        global.pusher.trigger("my-channel", "boxchat-send-event", {
            user,
            is_admin: true,
            support_id: support.id,
            data: newMessage
        });

        res.status(200).json({
            message: 'Sent',
            status_code: 200,
            data: newMessage,
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
