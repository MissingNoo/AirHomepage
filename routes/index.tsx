import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import VtuberList from "../components/VtuberList.tsx";

export default define.page(function Home(ctx) {
  //const count = useSignal(3);
  //console.log("Shared value " + ctx.state.shared);

  return (
    <div class="px-4 py-8 mx-auto fresh-gradient min-h-screen">
      <Head>
        <title>Airgeadlamh</title>        
      </Head>
      
      <div class="max-w-3xl mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Airgeadlamh</h1>
      </div>
      <ul className="items-center list rounded-box">
          <li>
            <ul className=" menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
              <li><a>Home</a></li>
              <li><a>Projects</a></li>
              <li><a>About</a></li>
            </ul>
          </li>
        </ul>
        <div class="flex items-center">
          <VtuberList></VtuberList>
        </div>
    </div>
  );
});
