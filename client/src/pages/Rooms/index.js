import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Spin, Result, Empty, Form, Input, message } from 'antd';
import { useHistory } from 'react-router-dom';

const Rooms = ({ role, setRole, setAuth }) => {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [room, setRoom] = useState([]);

  const fetchData = async () => {
    try {
      const {
        data: { data },
      } = await axios.get('/api/v1/rooms');
      setLoading(false);
      setRoom(data);
    } catch (err) {
      setLoading(false);
      setError('Something went wrong, please try again later');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createRoom = async ({ newRoom }) => {
    try {
      await axios.post('/api/v1/rooms', { room: newRoom });
      await fetchData();
      message.success('room has been created successfully');
    } catch (err) {
      if (err.response) {
        if (err.response.status === 500)
          message.error('Something went wrong, please try again later');
        else message.error(err.response.data.message);
      } else message.error('Something went wrong, please try again later');
    }
  };

  const logout = async () => {
    try {
      await axios.get('/api/v1/logout');
      setAuth(false);
      setRole('user');
    } catch (err) {
      message.error('Something went wrong, please try again later');
    }
  };

  return (
    <div>
      <div>
        <Button onClick={logout}>Logout</Button>
        <br />
        <br />
      </div>
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
              <Form name="createRoom" onFinish={createRoom}>
                <Form.Item
                  name="newRoom"
                  label="new room name"
                  rules={[
                    {
                      required: true,
                      message: 'enter room name!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Create Room
                  </Button>
                </Form.Item>
              </Form>
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

Rooms.propTypes = {
  role: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
  setAuth: PropTypes.func.isRequired,
};

export default Rooms;
