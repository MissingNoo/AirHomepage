// deno-lint-ignore-file
import { loggedin } from "../signals.ts";

export function LogoutButton() {
  let ret = '<></>';
  if (loggedin.value) {
    ret = '<a id="logoutbt" href="/logout" f-partial="/logout">Logout</a>';
  }
  return (
    <div style={!loggedin.value ? "display:none" : ""} dangerouslySetInnerHTML={{__html : ret}}></div>
  );
}
