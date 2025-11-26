import { define, fetch_data } from "../utils.ts";
import { Partial } from "fresh/runtime";
import RegisterForm from "../islands/RegisterForm.tsx";
export default define.page(() => {
  // Only render the new content
  return (
    <Partial name="docs-content">
      <RegisterForm></RegisterForm>
    </Partial>
  );
});

export const handler = define.handlers({
  async POST(ctx) {
    const form = await ctx.req.formData();
    const username = form.get("username")?.toString() ?? "";
    const password = form.get("password")?.toString() ?? "";
    const idd = form.get("idd")?.toString() ?? "";
    const headers = new Headers();
    const j = {
      type: "register",
      username,
      password,
      idd,
    };
    const data = await fetch_data(j);

    if (data.message == "sucess") {
      console.log(data);
      headers.set("location", "/");
      headers.append(
        "set-cookie",
        "loggedin=true" + ";Expires=Fri, 15 Dec 3023 12:00:00 GMT",
      );
      headers.append(
        "set-cookie",
        "uuid=" + data.uuid.toString() +
          ";Expires=Fri, 15 Dec 3023 12:00:00 GMT",
      );
      headers.append(
        "set-cookie",
        "id=" + data.id.toString() + ";Expires=Fri, 15 Dec 3023 12:00:00 GMT",
      );
    }

    return new Response(null, {
      status: 200,
      headers,
    });
  },
});
