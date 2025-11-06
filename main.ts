import { App, staticFiles } from "fresh";
import { type State } from "./utils.ts";
import { getkey } from "./middlewares/redis.ts";
export const app = new App<State>();

app.use(staticFiles());

// Pass a shared value from a middleware
app.use(async (ctx) => {
  //ctx.state.shared = "hello";
  return await ctx.next();
});

app.get("/api/user/:id", async (ctx) => {
  const res = await getkey(ctx.params.id);
  if (res === null) {
    return new Response("Key not found", { status: 404 });
  }
  return new Response(res.toString());
});

// Include file-system based routes here
app.fsRoutes();
