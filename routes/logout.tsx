import { define } from "../utils.ts";
import { Partial } from "fresh/runtime";
import LogoutReload from "../islands/LogoutReload.tsx";

export default define.page(() => {
  // Only render the new content
  return (
    <Partial name="docs-content">
      <LogoutReload></LogoutReload>
    </Partial>
  );
});

export const handler = define.handlers({
  POST(ctx) {
    const headers = ctx.req.headers;
    headers.set("location", "/");
    headers.append("set-cookie", "loggedin=false");
    headers.append("set-cookie", "hash=");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
});
