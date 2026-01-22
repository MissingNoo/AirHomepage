import { Head } from "fresh/runtime";
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
        <LoadHours
          hours={ctx.state.hours}
          loggedin={ctx.state.logged_in}
          expected_pay={ctx.state.expected_pay}
        >
        </LoadHours>
        {
          /*<p className="m-10 bg-base-100">
          You currently {isAllowed ? "are" : "are not"} logged in
        </p>*/
        }
        <div className="m-10 bg-base-100">
          <h1 className="font-bold text-3xl">Last News</h1>
          <p>
            Added{" "}
            <a className="underline" href="/projects/maisound">
              Maifumi soundboard
            </a>
          </p>
        </div>
      </div>
    </div>
  );
});
