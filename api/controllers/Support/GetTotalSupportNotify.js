import {Support} from '../../models';
export default async function GetListSupport(req, res) {
    try {
        const { count } = await Support.findAndCountAll({
            where: {
                status: ['processing','pending']
            },
            offset: 0,
            limit: 1
        });
        res.status(200).json({
            status_code: 200,
            total_notify: count,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}
