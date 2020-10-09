import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Spin } from 'antd';

import './style.css';

import { RoomsList, Logout } from '../../components';

const Rooms = ({ setRole, setAuth }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rooms, setRooms] = useState([]);

  const getRooms = async () => {
    try {
      const {
        data: { data },
      } = await axios.get('/api/v1/rooms');
      setLoading(false);
      setRooms(data);
    } catch (err) {
      setLoading(false);
      setError('Something went wrong, please try again later');
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div className="rooms__wrapper">
      <Logout setAuth={setAuth} setRole={setRole} />
      {error ? (
        <p className="rooms__error">{error}</p>
      ) : (
        <>
          {loading && (
            <div className="rooms__spinner">
              <Spin />
            </div>
          )}
          <RoomsList rooms={rooms} />
        </>
      )}
    </div>
  );
};

Rooms.propTypes = {
  setRole: PropTypes.func.isRequired,
  setAuth: PropTypes.func.isRequired,
};

export default Rooms;
