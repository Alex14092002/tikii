import { Card } from 'antd';
import React from 'react';
import styled from 'styled-components';
function ServiceCard({ title, image, ...props }) {
    return (
        <Card
            className="text-center "
            hoverable
            style={{
                boxShadow: '0 1px 5px rgba(0,0,0,.1)',
            }}
            {...props}
        >
            <div className="service__image text-center mb-3">
                <img
                    src="https://image.vncslive999.com/question/7637606944/497c1292198b494c84a0025702070848.png"
                    alt=""
                    style={{
                        width: 60,
                        height: 60,
                        margin: '0 auto',
                    }}
                />
            </div>
            <div className="service__title text-[9999]">{title}</div>
        </Card>
    );
}

export default ServiceCard;
