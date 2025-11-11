// deno-lint-ignore-file
import { loggedin } from "../signals.ts";

export function RegisterButton() {
  const ret = '<a href="/register" f-partial="/register">Register</a>';
  return (
    <div
      style={loggedin.value ? "display:none" : ""}
      dangerouslySetInnerHTML={{ __html: ret }}
    >
    </div>
  );
}
