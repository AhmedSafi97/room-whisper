import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

import './style.css';

const Message = ({ author, text, date }) => (
  <div className="message__wrapper">
    <div className="message__author-date__wrapper">
      <p className="message__author">{author}</p>
      <p className="message__date">{moment(date).format('hh:mm:ss')}</p>
    </div>
    <p className="message__text">{text}</p>
  </div>
);

Message.propTypes = {
  author: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
};

export default React.memo(Message);
