import { Image } from 'antd';
import React from 'react';
const IMAGE_USER = 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png';
const IMAGE_ADMIN = 'https://cdn-icons-png.flaticon.com/512/190/190119.png';
function Message({ message, user }) {
    return (
        <div className={`item ${message.sender === user ? 'item--sender' : 'item--receiver'}`}>
            <div className="item--image">
                <img src={message.sender === user ? IMAGE_ADMIN : IMAGE_USER} alt="" />
            </div>
            <div className="item--content">
                {message.image && <Image width={200} height={200} src={message.image} />}
                <span className="text-sm">{message.content}</span>
            </div>
        </div>
    );
}

export default Message;
