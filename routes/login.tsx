import {sha256, define } from "../utils.ts";
import { Partial } from "fresh/runtime";
import LoginForm from "../islands/LoginForm.tsx";
import { json } from "node:stream/consumers";
//import {verify_login} from "../middlewares/mongo.ts";

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
        const password = await sha256(form.get("password")?.toString() ?? "");
        const headers = ctx.req.headers;
        const j = {
          type: "login",
          username, password
        }
        let uuid = "";
        const url = "http://127.0.0.1:8000";
        try {
          const response = await fetch(url, {
            body : JSON.stringify(j),
            method: "POST"
          });
          const res = await response.json();
          uuid = res.uuid;
          // deno-lint-ignore no-explicit-any
        } catch (error:any) {
          console.error(error.message);
        }    
        
        if (uuid != "") {
            headers.set("location", "/");
            headers.append("set-cookie", "loggedin=true");
            headers.append("set-cookie", "uuid=" + uuid.toString());
        }
        
        return new Response(null, {
            status: 303, // See Other
            headers,
        });
   }
});