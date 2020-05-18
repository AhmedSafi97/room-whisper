import React from 'react';
import PropTypes from 'prop-types';

const Rooms = ({ role }) => {
  return <div>Hello {role}</div>;
};

Rooms.defaultProps = {
  role: 'user',
};

Rooms.propTypes = {
  role: PropTypes.string,
};

export default Rooms;
