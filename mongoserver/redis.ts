import {RedisClient} from "@iuioiua/redis"
export async function getkey(key:string) {    
    using redisConn = await Deno.connect({ port: 6379 });
    const redisClient = new RedisClient(redisConn);
    const result = await redisClient.sendCommand(["GET", key]);
    redisConn.close();
    return result?.toString();
}

export async function setkey(key:string, value:string) {    
    using redisConn = await Deno.connect({ port: 6379 });
    const redisClient = new RedisClient(redisConn);
    const result = await redisClient.sendCommand(["SET", key, value]);
    redisConn.close();
    return result;
}

async function ping(redisClient: RedisClient, name: string, port: number) {
    const url = "http://127.0.0.1:" + port.toString();
    try {
      const response = await fetch(url);
      if (response.ok) {
        await redisClient.sendCommand(["SET", name, "ok"]);
      } else {
        await redisClient.sendCommand(["SET", name, "off"]);
      }
      // deno-lint-ignore no-explicit-any
    } catch (error:any) {
      console.error(error.message);
    }    
  }

export async function update_services() {
    using redisConn = await Deno.connect({ port: 6379 });
    const redisClient = new RedisClient(redisConn);
    const services = [
        {
            name : "Sonarr",
            port : 8989
        },
        {
            name : "Jellyfin",
            port : 8096
        },
    ]
    for (let i = 0; i < services.length; i++) {
        const service = services[i];
        await ping(redisClient, service.name, service.port);
    }
    redisConn.close();
    const res = [];
    for (let index = 0; index < services.length; index++) {
        const service = services[index];
        const is_on = await getkey(service.name);
        res.push(service.name + ": " + is_on + "\n");
    }
    return res.toString().replaceAll(",", "");
}
