import { get_hours, add_hours, get_day, register_user, update_hours, verify_login } from "./mongo.ts";
import { getkey } from "./redis.ts";
import { db_port } from "../settings.ts";
async function handler(request: Request): Promise<Response> {
  if (request.method === "POST") {
    try {
      const data = await request.json(); // Assuming JSON body
      if (Deno.args[0] == "--debug") {
        console.log(data);
      }      
      switch (data.type) {
        case "login": {
          /*hash(data.password, 10, (_err:any, hash:string) => {
            console.log("hash: " + hash)
          })*/
          //console.log("Received POST data:", data);
          const res = await verify_login(data.username, data.password);
          return new Response(JSON.stringify(res), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
        }

        case "register": {
          //console.log("Received POST data:", data);
          await register_user(data.username, data.password, data.idd);
          const res = await verify_login(data.username, data.password);
          return new Response(JSON.stringify(res), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
        }

        case "update": {
          await update_hours(data.uuid);
          return new Response(JSON.stringify({ "message": "updated" }), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
        }

        case "get_day": {
          const d = await get_day(data);
          //console.log(d)
          return new Response(JSON.stringify(d), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
        }

        case "get_hours": {
          const hours: string = await get_hours(parseInt(data.id)) ?? "00:00";
          return new Response(JSON.stringify({ hours: hours }), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
        }

        case "add_hours": {
          const res = { "message": "" };
          //console.log("Received POST data:", data);
          let can_add = true;
          if (data.day == "" || data.entrada == "" || data.saida == "") {
            res.message = "Invalid";
            can_add = false;
          }
          if (can_add) {
            add_hours(data);
            await update_hours(data.uuid);
          }
          return new Response(JSON.stringify(res), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
        }

        default: {
          console.log(data.toString());
          return new Response(JSON.stringify({ "message": "unknown" }), {
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

Deno.serve({ port: db_port }, handler);
