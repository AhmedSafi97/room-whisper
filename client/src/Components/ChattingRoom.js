import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button, Spin, Input, Form } from 'antd';
import io from 'socket.io-client';
import moment from 'moment';

const socket = io({
  autoConnect: false,
});

const ChattingRoom = ({ history }) => {
  const [users, setUsers] = useState();
  const [username, setUsername] = useState();
  const [messages, setMessages] = useState([]);
  const { room } = useParams();
  const [form] = Form.useForm();
  const containerNode = useRef(null);

  useEffect(() => {
    socket.open();
    socket.emit('joinRoom', { room });
    socket.on('joinRoom', (onlineUsers) => {
      setUsers(onlineUsers);
    });
    socket.on('username', setUsername);
    socket.on('msg', (newMessage) => {
      setMessages((msgs) => [...msgs, ...newMessage]);
    });
    return () => {
      socket.removeAllListeners();
      socket.close();
    };
  }, [room]);

  useEffect(() => {
    if (users && username) {
      if (!users.includes(username)) history.push('/rooms');
    }
  }, [users, username, history]);

  useEffect(() => {
    if (containerNode.current) {
      containerNode.current.scrollTop = containerNode.current.scrollHeight;
    }
  });

  const leaveRoom = () => {
    history.push('/rooms');
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = ({ msg }) => {
    socket.emit('msg', { msg, room, username });
    onReset();
  };

  return (
    <div>
      <Button onClick={leaveRoom}>Leave room</Button>
      {!users && <Spin />}
      {users && (
        <div>
          <p>
            {room}, {users.length} online users
          </p>
          <div>
            online users :
            <div>
              {users.map((user) => (
                <div key={user}>{user}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="chat-container" ref={containerNode}>
              {messages.length !== 0 &&
                messages.map((m) => (
                  <div key={m.date} className="chat">
                    <span>
                      <b>{m.author} :</b>
                    </span>
                    <p>{m.msg}</p>
                    <span>
                      {moment(m.date).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                    </span>
                  </div>
                ))}
            </div>
            <Form name="sendMsg" form={form} onFinish={onFinish}>
              <Form.Item
                name="msg"
                rules={[
                  {
                    required: true,
                    message: 'write something!',
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Send
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

ChattingRoom.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default ChattingRoom;
