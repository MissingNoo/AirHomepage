import BHInsert from "../../../islands/BHInsert.tsx";
import { define } from "../../../utils.ts";
import { Partial } from "fresh/runtime";
import { fetch_data, getCookie } from "../../../utils.ts";
import LoadHours from "../../../islands/LoadHours.tsx";
import { TotalHours } from "../../../components/TotalHours.tsx";
import Calendar from "../../../islands/Calendar.tsx";
export const handler = define.handlers({
  /*async GET(ctx) {
    const data = await fetch_data({ type: "get_hours", id: ctx.state.id });
    try {
      ctx.state.hours = data.hours;
    } catch (_error) {
      ctx.state.hours = "?";
    }
  },*/
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
      headers.set("location", "/projects/BH/BH");
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
      <div className="flex flex-col items-center">
        <TotalHours></TotalHours>
        <BHInsert
          uuid={ctx.state.uuid}
          message={message}
          loggedin={ctx.state.logged_in}
        >
        </BHInsert>
        <Calendar></Calendar>
        <LoadHours
          hours={ctx.state.hours}
          loggedin={ctx.state.logged_in}
          expected_pay={ctx.state.expected_pay}
        >
        </LoadHours>
      </div>
    </Partial>
  );
});
