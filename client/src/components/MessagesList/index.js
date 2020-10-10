import React, { useEffect, useRef } from 'react';
import propTypes from 'prop-types';

import './style.css';

import Message from '../Message';

const MessagesList = ({ messages }) => {
  const messagesRef = useRef();

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={messagesRef} className="messages-list__wrapper">
      {messages.map(({ _id, author, msg, date }) => (
        <Message key={_id} text={msg} author={author} date={date} />
      ))}
    </div>
  );
};

MessagesList.propTypes = {
  messages: propTypes.arrayOf(
    propTypes.shape({
      _id: propTypes.string.isRequired,
      author: propTypes.string.isRequired,
      msg: propTypes.string.isRequired,
    })
  ).isRequired,
};

export default React.memo(MessagesList);
