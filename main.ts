import { App, staticFiles } from "fresh";
import { fetch_data, getCookie, type State } from "./utils.ts";
export const app = new App<State>();

app.use(staticFiles());

// Pass a shared value from a middleware
app.use(async (ctx) => {
  ctx.state.logged_in = await getCookie(ctx, "loggedin") == "true";
  ctx.state.id = await getCookie(ctx, "id") ?? "";
  ctx.state.uuid = await getCookie(ctx, "uuid") ?? "";
  const data = await fetch_data({ type: "get_hours", id: ctx.state.id });
  ctx.state.hours = data.hours;
  return await ctx.next();
});

// Include file-system based routes here
app.fsRoutes();
