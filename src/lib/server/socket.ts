import io from 'socket.io-client';
import { env } from '$env/dynamic/public';

const socket = io(env.PUBLIC_BASE);

export default socket;
