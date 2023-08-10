import {Support} from '../../models';
export default async function GetListSupport(req, res) {
    try {
        const supportList = await Support.findAll({
            order: [
                ['status_sort', 'ASC'],
                ['createdAt', 'DESC']
            ],
            attributes: ['*'],
            raw: true
        });
        let total_notify = 0;
        supportList.forEach(element => {
            if(['pending','processing'].includes(element.status)){
                total_notify++;
            }
        });
        res.status(200).json({
            status_code: 200,
            data: supportList,
            total_notify
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}
