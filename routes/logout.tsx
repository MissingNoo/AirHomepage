import { define, sha256 } from "../utils.ts";
import { Partial } from "fresh/runtime";
import LoginForm from "../islands/LoginForm.tsx";

export default define.page(() => {
  // Only render the new content
  return (
    <Partial name="docs-content">
      <LoginForm></LoginForm>
    </Partial>
  );
});

export const handler = define.handlers({
  async GET(ctx) {
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
