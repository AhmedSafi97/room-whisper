import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import axios from 'axios';
import { Button, Spin, Result, Empty } from 'antd';

const Rooms = ({ history, role }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [room, setRoom] = useState([]);
  const fetchData = async () => {
    try {
      const {
        data: { data },
      } = await axios.get('/api/v1/rooms');
      const rooms = data.map((x) => x.room);
      setLoading(false);
      setRoom(rooms);
    } catch (err) {
      setError('Something went wrong, please try again later');
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Button onClick={() => history.push('/login')}>Logout</Button>
      <div>
        {loading && <Spin />}
        {error && !loading && (
          <Result
            status="500"
            title="500"
            subTitle="Something went Wrong, please try again later"
          />
        )}
        {room.length === 0 && !error && !loading && (
          <Empty
            description={<span>no room available, come back later</span>}
          />
        )}
        {room.length > 0 && !error && !loading && (
          <div>
            {role === 'admin' ? (
              <Button>Create new Room</Button>
            ) : (
              <p>Welcome, pick a room and start chatting</p>
            )}

            <div>
              {room.map((r) => (
                <Button key={r} onClick={() => history.push(`/rooms/${r}`)}>
                  {r}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Rooms.defaultProps = {
  role: 'user',
};

Rooms.propTypes = {
  role: PropTypes.string,
  history: ReactRouterPropTypes.history.isRequired,
};

export default Rooms;
