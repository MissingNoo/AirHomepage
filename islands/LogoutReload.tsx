import { IS_BROWSER } from "fresh/runtime";
import { go_home } from "../utils.ts";
import { useEffect } from "preact/hooks";
export default function LogoutReload() {
  useEffect(() => {
    try {
      fetch("/logout", {
        method: "POST",
      }).then(() => {
        go_home();
      });
      // deno-lint-ignore no-explicit-any
    } catch (error: any) {
      console.error(error.message);
    }
  })
  if (!IS_BROWSER) return <div></div>;
  return (
    <div>
    </div>
  );
}
