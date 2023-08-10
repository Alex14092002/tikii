import { PUSHER_KEY } from '../../settings.json';

const pusher = new Pusher(PUSHER_KEY,{
    cluster: 'ap1'
});

export default pusher;