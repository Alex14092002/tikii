import {Support, Message} from '../../models';
export default async function (req, res) {
    try {
        const { supportId } = req.body;
        if (supportId) {
            const support = await Support.findByPk(supportId);
            if (!support) {
                return res.status(200).json({
                    status_code: 88,
                    message: 'Support not found.',
                });
            }

            const messages = await Message.findAll({
                where: {
                    support_id: supportId,
                },
                order: [
                    ['createdAt', 'ASC']
                ],
                attributes: ['*'],
                raw: true
            });

            res.status(200).json({
                status_code: 200,
                message: 'Get messages successfully.',
                data: messages,
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            error_code: 500,
            error_message: 'Server Internal Error',
            message: 'Server Internal Error',
        });
    }
}
