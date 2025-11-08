import {verify_login, update_hours} from "./mongo.ts";
import { getkey } from "./redis.ts";
async function handler(request: Request): Promise<Response> {
  if (request.method === "POST") {
    try {
      const data = await request.json(); // Assuming JSON body
      switch (data.type) {
        case "login":{
          console.log("Received POST data:", data);
          const res = await verify_login(data.username, data.password);
          return new Response(JSON.stringify(res), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
        }
        
        case "update": {
          await update_hours(data.id);
          return new Response(JSON.stringify({ "message" : "updated"}), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
        }

        case "get_hours": {
          const hours:string = await getkey(data.id) ?? "00:00";
          return new Response(JSON.stringify({ hours: hours}), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
        }

        default:{
          console.log(data.toString());
          return new Response(JSON.stringify({ "message" : "unknown"}), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
        }
      }
      
    } catch (_error) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }
  } else {
    return new Response("Hello, Deno!", { status: 200 });
  }
}

Deno.serve(handler);