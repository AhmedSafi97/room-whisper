import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Spin, Input } from 'antd';
import io from 'socket.io-client';

import './style.css';

import { MessagesList } from '../../components';

const socket = io({
  autoConnect: false,
});

const ChattingRoom = () => {
  const history = useHistory();

  const [users, setUsers] = useState();
  const [username, setUsername] = useState();
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const { room } = useParams();

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

  const leaveRoom = () => {
    history.push('/rooms');
  };

  const onFinish = (e) => {
    e.preventDefault();
    if (msg) {
      const date = Date.now();
      socket.emit('msg', { msg, room, username, date });
      setMsg('');
    }
  };

  if (!users) return <Spin className="chatting__spinner" />;

  return (
    <div className="chatting__wrapper">
      <div className="chatting__header">
        <p>
          {room}, {users.length} online users
        </p>
        <Button onClick={leaveRoom}>Leave room</Button>
      </div>
      <MessagesList messages={messages} />
      <form className="chatting__form" onSubmit={onFinish}>
        <Input
          size="large"
          autoComplete="off"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button size="large" type="primary" htmlType="submit">
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChattingRoom;
