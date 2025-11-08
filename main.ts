import { App, staticFiles } from "fresh";
import { getCookie, type State } from "./utils.ts";
export const app = new App<State>();

app.use(staticFiles());

// Pass a shared value from a middleware
app.use(async (ctx) => {
  ctx.state.logged_in = await getCookie(ctx, "loggedin") == "true";
  ctx.state.hash = await getCookie(ctx, "hash") ?? "";
  return await ctx.next();
});

// Include file-system based routes here
app.fsRoutes();
