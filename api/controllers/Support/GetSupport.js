//import Support from '../../models/mongod/support';
import {Support} from '../../models';
export default async function GetListSupport(req, res) {
    try {
        if(!req.params.support_id){
            res.status(500).json({
                status: 500,
                message: 'Thiếu ID hỗ trợ',
            });
        }
        const support = await Support.findByPk(req.params.support_id);
        if(!support){
            res.status(500).json({
                status: 500,
                message: 'Thông tin hỗ trợ không tìm thấy',
            });
        }
        res.status(200).json({
            status_code: 200,
            data: support
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}
