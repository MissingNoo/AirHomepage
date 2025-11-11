import { IS_BROWSER } from "fresh/runtime";
import { go_home } from "../utils.ts";
export default function RegisterForm() {
  if (!IS_BROWSER) return <div></div>;
  return (
    <div class="flex justify-center">
      <form onSubmit={go_home} method="post">
        <input
          type="text"
          placeholder="Username"
          className="input"
          name="username"
        />
        <p></p>
        <input
          type="password"
          placeholder="Password"
          className="input"
          name="password"
        />
        <p></p>
        <input
          type="number"
          placeholder="Cracha"
          className="input"
          name="idd"
        />
        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  );
}
