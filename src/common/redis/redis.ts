import redisClient from './../../configs/redis.config';

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

    async pushToList( key : string, value : string ) : Promise<void> {
        await redisClient.rPush( key, value );
    }

    async getList( key : string ) : Promise<string[]> {
        return await redisClient.lRange( key, 0, -1 );
    }

    async deleteList( key : string ) : Promise<void> {
        await redisClient.del( key );
    }

    async setHash( key : string, field : string, value : string | { [ field : string ] : string } ) : Promise<void> {
        if ( typeof value === "string" ) {
            await redisClient.hSet( key, field, value );
        } else {
            await redisClient.hSet( key, value );
        }
    }

    async getHash( key : string, field : string ) : Promise<string | undefined> {
        return await redisClient.hGet( key, field );
    }

    async getHashAll( key : string ) : Promise<{ [ key: string ] : string }> {
        return await redisClient.hGetAll( key );
    }

    async deleteHash( key : string, field : string ) : Promise<void> {
        await redisClient.hDel( key, field );
    }

    async deleteAllHash( key : string ) : Promise<void> {
        await redisClient.del( key );
    }

    async setSet( key : string, value : string ) : Promise<void> {
        await redisClient.sAdd( key, value );
    }

    async getSet( key : string ) : Promise<string[]> {
        return await redisClient.sMembers( key );
    }

    async deleteSet( key : string ) : Promise<void> {
        await redisClient.del( key );
    }

    async checkSet( key : string, value : string ) : Promise<boolean> {
        return await redisClient.sIsMember( key, value );
    }

    async deleteValueSet( key : string, value : string ) : Promise<void> {
        await redisClient.sRem( key, value );
    }

    async setSortedSet( key : string,  score : number, value : string  ) : Promise<void> {
        await redisClient.zAdd( key, [ { score, value } ] );
    }

    async getSortedSet( key : string ) : Promise<string[]> {
        return await redisClient.zRange( key, 0, -1 );
    }

    async deleteSortedSet( key : string ) : Promise<void> {
        await redisClient.del( key );
    }

    async deleteValueSortedSet( key : string, value : string ) : Promise<void> {
        await redisClient.zRem( key, value );
    }
}

export default new RedisClient();
