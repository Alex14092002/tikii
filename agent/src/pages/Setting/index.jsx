import { Tabs } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faGear } from '@fortawesome/free-solid-svg-icons';
import System from './System';

function Setting() {
    const onChange = (key) => {
        // console.log(key);
    };
    return (
        <Tabs
            defaultActiveKey="1"
            onChange={onChange}
            items={[
                {
                    label: (
                        <p className="text-[#fff]">
                            <FontAwesomeIcon icon={faGear} />
                            <span className="ml-2 pr-2">Cài đặt chung</span>
                        </p>
                    ),
                    key: '1',
                    children: <System />,
                },
            ]}
        />
    );
}

export default Setting;
