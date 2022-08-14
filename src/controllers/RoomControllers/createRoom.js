const { validateRoomName, isNewRoom, createRoom } = require('../../utils');

const addRoom = async (httpReq) => {
  const { room } = httpReq.body;
  const { role } = httpReq.userData;

  await validateRoomName(room);
  await isNewRoom(room);
  await createRoom(room, role);

  return { statusCode: 201, message: 'room has been created successfully' };
};

module.exports = addRoom;
