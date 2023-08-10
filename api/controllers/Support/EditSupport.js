import {Support} from '../../models';
export default async function EditSupport(req, res) {
    try {
        const { status, support_id } = req.body;
        if (!status || !support_id) {
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
        let status_sort = hasSupport.status_sort;
        if(status == 'processing'){
            status_sort = 2;
        }
        else if(status == 'done'){
            status_sort = 3;
        }

        await Support.update({
            status, status_sort
        }, {
            where: {
                id: hasSupport.id,
            },
            raw: true,
        });

        const { count } = await Support.findAndCountAll({
            where: {
                status: ['processing','pending']
            },
            offset: 0,
            limit: 1
        });

        /*global.pusher.trigger("my-channel", "boxchat-event", {
            is_admin: false,
            support_id: hasSupport.id,
            total_notify: count
        });*/

        global.pusher.trigger("my-channel", "boxchat-create-support-event", {
            support_id: hasSupport.id,
            total_notify: count
        });

        res.status(200).json({
            status_code: 200,
            message: 'Update support successfully.',
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message,
        });
    }
}
