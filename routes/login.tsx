import { define, fetch_data, sha256 } from "../utils.ts";
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
  async POST(ctx) {
    const form = await ctx.req.formData();
    const username = form.get("username")?.toString() ?? "";
    const password = form.get("password")?.toString() ?? "";
    const headers = new Headers();
    const j = {
      type: "login",
      username,
      password,
    };
    const data = await fetch_data(j);

    if (data.message == "sucess") {
      //console.log(data);
      headers.set("location", "/");
      headers.append("set-cookie", "loggedin=true");
      headers.append("set-cookie", "uuid=" + data.uuid.toString());
      headers.append("set-cookie", "id=" + data.id.toString());
    }

    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
});
