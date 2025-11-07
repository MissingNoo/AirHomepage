// deno-lint-ignore-file
export interface VtuberProps {
  ctx?:any
}

export function LoginButton(props: VtuberProps) {
  //const yt = "location.href='" + props.ytlink + "'";
  //const twitch = "location.href='" + props.twitchlink + "'";

  return (
    <li><a id="loginbt" href="/login" f-partial="/login">Login</a></li>
  );
}
