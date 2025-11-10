import BHInsert from "../../islands/BHInsert.tsx";
import { define } from "../../utils.ts";
import { Partial } from "fresh/runtime";
import { fetch_data, getCookie } from "../../utils.ts";
import HideLoginBtn from "../../islands/HideLoginBtn.tsx";
export const handler = define.handlers({
  async POST(ctx) {
    if (!ctx.state.logged_in) {
      return new Response(null, {
        status: 303, // See Other
        headers: { Location: "/" },
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
      type: "add_hours",
      day,
      entrada,
      almoco,
      volta,
      saida,
      uuid,
    };
    const headers = new Headers();
    const res = await fetch_data(j);
    //console.log(res);
    if (res.message == "Invalid") {
      headers.set("location", ctx.route + "?error=true");
    } else {
      headers.set("location", "/projects/BH");
    }

    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
});

export default define.page((ctx) => {
  let message = "";
  const param = ctx.url.searchParams.toString();
  if (param == "error=true") {
    message = "Dados invalidos";
  }
  //Only render the new content
  return (
    <Partial name="docs-content">
      <div>
        <BHInsert
          uuid={ctx.state.uuid}
          message={message}
          loggedin={ctx.state.logged_in}
        >
        </BHInsert>
        <HideLoginBtn hours={ctx.state.hours} loggedin={ctx.state.logged_in}>
        </HideLoginBtn>
      </div>
    </Partial>
  );
});
