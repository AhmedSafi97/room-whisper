/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import './style.css';

const RoomExcerpt = ({ name, users }) => {
  const history = useHistory();

  return (
    <div
      className="room-excerpt__wrapper"
      role="button"
      tabIndex={-1}
      onClick={() => history.push(`/rooms/${name}`)}
    >
      <h2>{name}</h2>
      <p>{users} online</p>
    </div>
  );
};

RoomExcerpt.propTypes = {
  name: propTypes.string.isRequired,
  users: propTypes.number.isRequired,
};

export default RoomExcerpt;
