// deno-lint-ignore-file
import { loggedin } from "../signals.ts";

export function LoginButton() {
  const ret = '<a id="loginbt" href="/login" f-partial="/login">Login</a>';
  return (
    <div
      style={loggedin.value ? "display:none" : ""}
      dangerouslySetInnerHTML={{ __html: ret }}
    >
    </div>
  );
}
