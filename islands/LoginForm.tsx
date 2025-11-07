// deno-lint-ignore-file react-no-danger
import { Button } from "../components/Button.tsx";
import { IS_BROWSER } from "fresh/runtime";
export default function LoginForm() {
  if (!IS_BROWSER) return <div></div>;  
  return (
    <div class="flex justify-center">
      <form method="post">
        <input type="password" placeholder="Password" className="input" name="password" />
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
}
