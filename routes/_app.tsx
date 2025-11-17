import { define } from "../utils.ts";
import { Partial } from "fresh/runtime";
import VtuberList from "../components/VtuberList.tsx";
import { HomeMenu } from "../components/HomeMenu.tsx";
import { Footer } from "../components/Footer.tsx";
export default define.page(function App({ Component }) {
  return (
    <html>
      <script src="/scripts.js"></script>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AirHomepage</title>
      </head>
      <body f-client-nav>
        <div class="max-w flex flex-col items-center justify-center lg:my-6 sr-only lg:not-sr-only">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-38 rounded-full ring-2 ring-offset-2">
              <img height="256" src="/pfp.png" />
            </div>
          </div>
          {
            /*<img
            class="my-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />*/
          }
        </div>
        <div className="max-w-3x1 bg-base-200">
          <div className="items-center list">
            <h1 class="text-4xl font-bold m-5 sr-only lg:not-sr-only">
              Airgeadlamh
            </h1>
          </div>

          <HomeMenu></HomeMenu>
        </div>
        {/*fresh-gradient*/}
        <div class="mx-auto min-h-screen">
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              <label
                htmlFor="my-drawer-3"
                className="btn drawer-button lg:hidden"
              >
                Sidebar
              </label>
              <Partial name="body">
                <Component />
              </Partial>
              {/**/}
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-3"
                aria-label="close sidebar"
                className="drawer-overlay"
              >
              </label>
              <ul className="menu bg-base-200 min-h-full flex p-4">
                {/* Sidebar content here */}
                <li>
                  <VtuberList></VtuberList>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </body>
      <footer>
        <Footer></Footer>
      </footer>
    </html>
  );
});
