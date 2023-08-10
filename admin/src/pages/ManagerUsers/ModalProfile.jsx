import { Modal } from 'antd';

function ModalProfile({ id_user, openProfile, setOpenProfile }) {
    return (
        <Modal
            title="Thông tin người dùng"
            centered
            open={openProfile}
            onOk={() => setOpenProfile(false)}
            onCancel={() => setOpenProfile(false)}
            width={720}
            okButtonProps={{
                type: 'primary',
                danger: true,
            }}
        >
            <p>{id_user}</p>
        </Modal>
    );
}

export default ModalProfile;
