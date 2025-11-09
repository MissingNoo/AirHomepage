import BHInsert from "../../islands/BHInsert.tsx";
import { define } from "../../utils.ts";
import { Partial } from "fresh/runtime";
import {getCookie, fetch_data} from "../../utils.ts";
export const handler = define.handlers({
  async POST(ctx) {
      if (!ctx.state.logged_in) {
        return new Response(null, {
          status: 303, // See Other
          headers: {Location: "/"},
        });
      }
      const form = await ctx.req.formData();
      const day = form.get("dia")?.toString() ?? "";
      const entrada = form.get("entrada")?.toString() ?? "";
      const almoco = form.get("almoco")?.toString() ?? undefined;
      const volta = form.get("volta")?.toString() ?? undefined;
      const saida = form.get("saida")?.toString() ?? "";
      const uuid = getCookie(ctx, "uuid");
      const j = {
        type : "add_hours",
        day, entrada, almoco, volta, saida, uuid
      };
      console.log(uuid)
      console.log(day)
      console.log(entrada)
      console.log(almoco)
      console.log(volta)
      console.log(saida)
      const headers = ctx.req.headers;
      const res = await fetch_data(j);
      console.log(res);
      if (res.message == "Invalid") {
          headers.set("location", ctx.route + "?error=true");
      }
      
      return new Response(null, {
          status: 303, // See Other
          headers,
      });
 }
});

export default define.page((ctx) => {
  // Only render the new content
  return (
    <Partial name="docs-content">
      <div>
        <BHInsert loggedin={ctx.state.logged_in}>

        </BHInsert>
      </div>
    </Partial>
  );
});