import {RedisClient} from "@iuioiua/redis"

export async function getkey(key:string) {
    using redisConn = await Deno.connect({ port: 6379 });
    const redisClient = new RedisClient(redisConn);
    const result = await redisClient.sendCommand(["GET", key]);
    redisConn.close();
    return result;
}
