import redisClient from '../../configs/redis.config';

class RedisClient {
    async setString( key : string, value : string, expire? : number ) : Promise<void> {
        if ( expire ) {
            await redisClient.setEx( key, expire, value );
        } else {
            await redisClient.set( key, value );
        }
    }

    async getString( key : string ) : Promise<string | null> {
        return await redisClient.get( key );
    }

    async checkExpire( key : string ) : Promise<number | null> {
        return await redisClient.ttl( key );
    }

    async expire( key : string, expire : number ) : Promise<void> {
        if ( await redisClient.ttl( key ) === -1 ) {
            await redisClient.expire( key, expire, "NX" );
        } else {
            await redisClient.expire( key, expire, "XX");
        }
    }

    async deleteString( key : string ) : Promise<void> {
        await redisClient.del( key );
    }
}

export default new RedisClient();
