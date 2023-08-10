import { FileImageOutlined } from '@ant-design/icons';
import { Image, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import socket from '../../../../utils/socket';
import { ChatWrapper } from './styles';
import service from '../../../../services/AppAdmins';
import Message from './Message';
const IMAGE_USER = 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png';
const IMAGE_ADMIN = 'https://cdn-icons-png.flaticon.com/512/190/190119.png';
function BoxChat({ messages, setMessages, support }) {
    const boxChatRef = useRef(null);
    const user = `ADMIN - ${JSON.parse(localStorage.getItem('user'))?.phone}`;
    const [message, setMessage] = useState('');
    const [previewImg, setPreviewImg] = useState('');

    const scrollToView = () => {
        const element = document.querySelector('.box__body');
        element.scrollTop = element.scrollHeight;
    };

    const handleSelectImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSendMessage = async () => {
        let data = {
            content: message,
            support_id: support._id,
            image: '',
            user: user,
        };

        const file = document.querySelector('#file').files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            data.image = 'response_file.data';
        }

        const response = await service.CreateMessage(data);
        if (response.status_code === 200) {
            setMessages((prev) => [...prev, response.data]);
            setMessage('');
            setPreviewImg(null);
            document.querySelector('#file').value = '';
            socket.emit('chat::sendMessage', response.data);
        }
    };

    useEffect(() => {
        scrollToView();
        socket.on('chat::receivedMessage', (data) => {
            if (support.conversation_id === data.conversation_id) {
                setMessages((prev) => [...prev, data]);
            }
        });

        return () => {
            socket.off('chat::receivedMessage');
        };
    }, [messages]);

    return (
        <ChatWrapper>
            <div className="box">
                <div className="box__body" ref={boxChatRef}>
                    <div className="box__body--items">
                        {messages.map((message, index) => (
                            <Message message={message} user={user} key={index} />
                        ))}
                    </div>
                </div>
                <div className="preview mb-3 text-right">
                    {previewImg && <Image width={200} height={300} src={previewImg} alt="" />}
                </div>
                <div className="box__footer">
                    <div className="box__footer--image">
                        <input
                            id="file"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                                handleSelectImage(e);
                            }}
                        />
                        <div
                            className="bg-[#1989fa] p-3 text-center border-[1px] border-[#2196f3]"
                            onClick={() => {
                                document.getElementById('file').click();
                            }}
                        >
                            <FileImageOutlined
                                style={{
                                    color: '#fff',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                }}
                                size={20}
                            />
                        </div>
                    </div>
                    <div className="box__footer--input">
                        <Input.TextArea
                            cols={1}
                            rows={2}
                            type="text"
                            placeholder="Nhập tin nhắn"
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                        />
                    </div>
                    <div className="box__footer--button">
                        <div
                            className="bg-[#1989fa] p-3  text-center border-[1px] border-[#2196f3]"
                            onClick={() => handleSendMessage()}
                        >
                            <span className="text-white text-sm">Gửi</span>
                        </div>
                    </div>
                </div>
            </div>
        </ChatWrapper>
    );
}

export default BoxChat;
