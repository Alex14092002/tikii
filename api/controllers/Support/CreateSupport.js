import {Support} from '../../models';

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
export default async function CreateSupport(req, res) {
    try {
        const { service, user, is_guest} = req.body;
        //console.log("virtual user or real:", user);
        if (!service || !user) {
            return res.status(200).json({
                status_code: 88,
                message: 'Missing required fields.',
            });
        }

        let supportInfo = await Support.findOne({
            where: {
                user,
                service
            },
            attributes: ['*'],
            raw: true,
        });
        if (supportInfo) {
            await Support.update({
                status: 'pending', status_sort: 1, is_guest: (is_guest === true?1:0)
            }, {
                where: {
                    id: supportInfo.id,
                },
                raw: true,
            });
        } else{
            supportInfo = await Support.create({status: 'pending', status_sort: 1, user, service, is_guest: (is_guest === true?1:0)});
        }
        const { count } = await Support.findAndCountAll({
            where: {
                status: ['processing','pending']
            },
            offset: 0,
            limit: 1
        });
        global.pusher.trigger("my-channel", "boxchat-create-support-event", {
            support_id: supportInfo.id,
            total_notify: count
        });
        
        res.status(200).json({
            status_code: 200,
            message: 'Create support successfully.',
            data: supportInfo
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message,
        });
    }
}
