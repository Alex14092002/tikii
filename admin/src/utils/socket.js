import { SOCKET_URL } from '../../settings.json';

import io from 'socket.io-client';

const url = SOCKET_URL || 'http://localhost:3000';

const socket = io(url);

export default socket;
