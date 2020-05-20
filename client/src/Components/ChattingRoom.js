import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import axios from 'axios';
import { Spin, Result, Button } from 'antd';
import io from 'socket.io-client';

const socket = io({
  autoConnect: false,
});

const ChattingRoom = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const { room } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`/api/v1/rooms/${room}/users`);
        setLoading(false);
        setUsers(data);
      } catch (err) {
        setLoading(false);
        setError('Something went wrong, please try again later');
      }
    };
    fetchData();
    socket.open();
    console.log(socket.disconnected);
    socket.emit('joinRoom', { room });
    socket.on('joinRoom', (onlineUsers) => {
      setUsers(onlineUsers);
    });
    return () => {
      socket.removeAllListeners();
      socket.close();
    };
  }, [room]);

  const leaveRoom = () => {
    history.push('/rooms');
  };

  return (
    <div>
      <Button onClick={leaveRoom}>Leave room</Button>
      {loading && <Spin />}
      {error && !loading && (
        <Result
          status="500"
          title="500"
          subTitle="Something went Wrong, please try again later"
        />
      )}
      {!loading && !error && (
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
