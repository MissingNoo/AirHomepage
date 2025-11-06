import { Head } from "fresh/runtime";
import { define } from "../utils.ts";

export default define.page(function Home() {
  //const count = useSignal(3);
  //console.log("Shared value " + ctx.state.shared);

  return (
    <div>
      <Head>
        <title>Airgeadlamh</title>        
      </Head>

      <div class="">
        <p className="m-10 bg-base-100">
          Welcome
        </p>
      </div>

    </div>
  );
});
