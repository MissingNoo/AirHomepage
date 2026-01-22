import { LoginButton } from "./LoginButton.tsx";
import { LogoutButton } from "./LogoutButton.tsx";
import { RegisterButton } from "./RegisterButton.tsx";

export function HomeMenu() {
  return (
    <ul className="items-center list">
      <li>
        <ul className="menu menu-horizontal bg-base-200">
          <li>
            <a href="/">Home</a>
          </li>
          {
            /*<li>
            <a href="/projects/BH/BH">BH</a>
          </li>*/
          }
          <li>
            <a href="/projects">Projects</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <LoginButton></LoginButton>
          </li>
          <li>
            <LogoutButton></LogoutButton>
          </li>
          <li>
            <RegisterButton></RegisterButton>
          </li>
        </ul>
      </li>
    </ul>
  );
}
