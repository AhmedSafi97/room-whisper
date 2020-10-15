import React from 'react';
import propTypes from 'prop-types';

import './style.css';

import RoomExcerpt from '../RoomExcerpt';

const RoomsList = ({ rooms }) => {
  return (
    <div className="rooms-list__wrapper">
      {rooms.map(({ _id, room, users }) => (
        <RoomExcerpt key={_id} name={room} users={users} />
      ))}
    </div>
  );
};

RoomsList.propTypes = {
  rooms: propTypes.arrayOf(
    propTypes.shape({
      _id: propTypes.string.isRequired,
      room: propTypes.string.isRequired,
    })
  ).isRequired,
};

export default RoomsList;
