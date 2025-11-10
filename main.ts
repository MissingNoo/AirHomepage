import { App, staticFiles } from "fresh";
import { fetch_data, getCookie, type State } from "./utils.ts";
import { cid, loggedin } from "./signals.ts";
export const app = new App<State>();

app.use(staticFiles());

// Pass a shared value from a middleware
app.use(async (ctx) => {
  ctx.state.logged_in = getCookie(ctx, "loggedin") == "true";
  loggedin.value = ctx.state.logged_in;
  ctx.state.id = getCookie(ctx, "id") ?? "";
  cid.value = ctx.state.id;
  ctx.state.uuid = getCookie(ctx, "uuid") ?? "";
  const data = await fetch_data({ type: "get_hours", id: ctx.state.id });
  try {
    ctx.state.hours = data.hours;
  } catch (_error) {
    ctx.state.hours = "?";
  }

  return await ctx.next();
});

app.post("/api/get-day", async (ctx) => {
  const d = await fetch_data(await ctx.req.json());
  // deno-lint-ignore no-explicit-any
  let res: any = { message: "no data" };
  let status = 404;
  try {
    res = {
      message: "sucess",
      entrada: d.entrada,
      almoco: d.almoco,
      volta: d.volta,
      saida: d.saida,
    };
    status = 200;
  } catch (_error) {
    //
  }
  return new Response(JSON.stringify(res), {
    headers: { "Content-Type": "application/json" },
    status,
  });
});

// Include file-system based routes here
app.fsRoutes();
