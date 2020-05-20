import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button } from 'antd';
import io from 'socket.io-client';

const socket = io({
  autoConnect: false,
});

const ChattingRoom = ({ history }) => {
  const [users, setUsers] = useState();
  const [username, setUsername] = useState();
  const { room } = useParams();

  useEffect(() => {
    socket.open();
    socket.emit('joinRoom', { room });
    socket.on('joinRoom', (onlineUsers) => {
      setUsers(onlineUsers);
    });
    socket.on('username', setUsername);

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

  return (
    <div>
      <Button onClick={leaveRoom}>Leave room</Button>
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
        </div>
      )}
    </div>
  );
};

ChattingRoom.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default ChattingRoom;
