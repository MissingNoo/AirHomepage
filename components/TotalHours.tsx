// deno-lint-ignore-file
import { loggedin } from "../signals.ts";

export function TotalHours() {
  const ret = '<p id="hours">00:00 Horas no banco</p>';
  return (
    <div
      className="bg-base-100 rounded-box shadow-md self-center m-5 p-7"
      style={!loggedin.value ? "display:none" : ""}
      dangerouslySetInnerHTML={{ __html: ret }}
    >
    </div>
  );
}
