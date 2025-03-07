import io from 'socket.io-client';
import { env } from '$env/dynamic/private';

const socket = io(env.BASE!);

export default socket;
