import {sha256, define } from "../utils.ts";
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
        const password = await sha256(form.get("password")?.toString() ?? "");
        const headers = ctx.req.headers;
        
        
        if (password == "c4172033b58f08ed897fc2981c3b2026c5962250c71d05a9b0dd0eb1ecfeb053") {
            headers.set("location", "/");
            headers.append("set-cookie", "loggedin=true");
            headers.append("set-cookie", "hash=" + password.toString());
        }
        
        return new Response(null, {
            status: 303, // See Other
            headers,
        });
   }
});