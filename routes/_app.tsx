import { define } from "../utils.ts";
import { Partial } from "fresh/runtime";
import VtuberList from "../components/VtuberList.tsx";
export default define.page(function App({ Component }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AirHomepage</title>
      </head>
      <body f-client-nav>
        <div class="max-w-3xl mx-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          
        </div>
        <div className="max-w-3x1 bg-base-200 rounded-box">
          <div className="items-center list">
            <h1 class="text-4xl font-bold m-5">Airgeadlamh</h1>
          </div>
          
          <ul className="items-center list">
            <li>
              <ul className="menu menu-vertical lg:menu-horizontal bg-base-200">
                <li><a href="/">Home</a></li>
                <li><a href="/projects">Projects</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/test" f-partial="/test">Test</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="mx-auto fresh-gradient min-h-screen">
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">Sidebar</label>
              <Partial name="body">
                <Component />
              </Partial>
              {/**/}
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 min-h-full flex p-4">
                {/* Sidebar content here */}
                <li><VtuberList></VtuberList></li>
              </ul>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
});
