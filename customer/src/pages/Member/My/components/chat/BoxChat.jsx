import { FileImageOutlined } from '@ant-design/icons';
import { Image, Input, Spin, notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
//import socket from '../../../../../utils/socket';
import { ChatWrapper } from './styles';

import AppUsers from '@src/services/AppUsers';
import Message from './Message';
import { v4 as uuid } from 'uuid';

import { GiSandsOfTime } from 'react-icons/gi';

const antIcon = <GiSandsOfTime size={40} />;

function BoxChat({ service }) {
    const boxChatRef = useRef(null);
    const { user } = useSelector((state) => state.user);
    const [message, setMessage] = useState('');
    const [waiting, setWaiting] = useState(false);
    const [support, setSupport] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);
    const [confirmSend, setConfirmSend] = useState("Gửi")
    const [messages, setMessages] = useState([
        {
            _id: '1',
            content: 'CSKH của sàn thương mại điện tử Tiki xin kính chào quý khách chúng tôi có thể giúp gì được cho quý khách hàng ạ.',
            sender: 'admin',
        },
    ]);

    const scrollToBottom = () => {
        let el = document.querySelector('.box__body');
        el.scrollTop = el?.scrollHeight;
    };

    const handleSendMessage = async () => {

        setConfirmSend("Đang gửi")

        const file = document.querySelector('#file').files[0];
        if (!message && !file) return;
        let data = {
            content: message,
            user: `${user?.phone}`,
            support_id: support.id,
            is_guest: false
        };

        if (file) {
            const formData = new FormData();
            formData.append('user_upload_id', uuid());
            formData.append('file', file);

            const response_file = await AppUsers.UploadFile(formData);
            if (response_file.status === 200) {
                data.file = response_file.url;
                data.file_type = response_file.type;
            }
        }

        const response = await AppUsers.CreateMessage(data);
        if (response.status_code === 200) {
            setMessages((prev) => [...prev, response.data]);
            scrollToBottom();
            setMessage('');
            setPreviewImg(null);
            document.querySelector('#file').value = '';
            //socket.emit('chat::sendMessage', response.data);
        }
        setConfirmSend("Gửi")

    };

    const handleSelectImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreviewImg(reader.result);
        };
    };

    const autoCreateTicket = async () => {
        const data = {
            service: service,
            user: `${user?.phone}`,
            is_guest: false
        };
        setWaiting(true);
        const response = await AppUsers.CreateTicket(data);
        setWaiting(false);
        if (response.status_code === 200) {
            localStorage.setItem('support_id', response.data.id)
            setSupport(response.data);
        } else {
            notification.error({
                message: 'Lỗi',
                description: 'Có lỗi xảy ra vui lòng thử lại',
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
        /*socket.on('chat::receivedMessage', (data) => {
            if (conversation === data.conversation_id) {
                setMessages((prev) => [...prev, data]);
            }
        });*/

        return () => {
            //socket.off('chat::receivedMessage');
        };
    }, [messages]);

    useEffect(() => {
        autoCreateTicket();
        window.channel.bind('boxchat-send-event', function(response) {
            if(window.user_phone !== undefined && window.user_phone !== null && window.user_phone == response.user.phone && response.is_admin === true){
                //console.log(response.data);
                //console.log(messages);
                setMessages((prev) => [...prev, response.data]);
                scrollToBottom();
            }
        });
    }, []);

    return (
        <ChatWrapper>
            {waiting ? (
                <div className="box__waiting">
                    <div className="box__waiting--content">
                        <div className="box__waiting--content__title">
                            Vui lòng chờ trong giây lát
                        </div>

                        <div className="loading">
                            {antIcon}
                        </div>
                    </div>
                </div>
            ) : (
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
                                onClick={() => {
                                    document.getElementById('file').click();
                                }}
                                className="bg-[#1989fa] p-3 text-center border-[1px] border-[#2196f3]"
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
                                onPressEnter={() => handleSendMessage()}
                            />
                        </div>
                        <div className="box__footer--button">
                            <div
                                className="bg-[#1989fa] p-3  text-center border-[1px] border-[#2196f3]"
                                onClick={() =>


                                    handleSendMessage()
                                }
                            >
                                <span className="text-white text-sm">{confirmSend}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </ChatWrapper>
    );
}

export default BoxChat;
