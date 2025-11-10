import { Head, IS_BROWSER } from "fresh/runtime";
import { define } from "../utils.ts";
import LoadHours from "../islands/LoadHours.tsx";

export default define.page(function Home(ctx) {
  const isAllowed = ctx.state.logged_in;
  //const count = useSignal(3);
  return (
    <div>
      <Head>
        <title>Airgeadlamh</title>
      </Head>

      <div class="">
        <LoadHours hours={ctx.state.hours} loggedin={ctx.state.logged_in}>
        </LoadHours>
        <p className="m-10 bg-base-100">
          You currently {isAllowed ? "are" : "are not"} logged in
        </p>
      </div>
    </div>
  );
});
