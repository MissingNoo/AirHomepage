import { IS_BROWSER } from "fresh/runtime";
import { go_home } from "../utils.ts";
export default function LoginForm() {
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
        <input
          type="password"
          placeholder="Password"
          className="input"
          name="password"
        />
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
}
