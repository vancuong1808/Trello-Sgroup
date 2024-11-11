import { createClient } from 'redis';

const redisClient = createClient({
    socket: {
        host: 'localhost',
        port: 6379,
    }    
});

redisClient.on('error', (error) => {
  console.error(error);
});

(async () => {
    await redisClient.connect();
    console.log('Connected to Redis');
})();

export default redisClient;
