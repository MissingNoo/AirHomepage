// deno-lint-ignore-file
export interface VtuberProps {
  name?: string;
  description?: string;
  img?: string;
  ytlink?: string;
  twitchlink?: string;
}

export function Vtuber(props: VtuberProps) {
  const yt = "location.href='" + props.ytlink + "'";
  const twitch = "location.href='" + props.twitchlink + "'";

  return (
    <li className="list flex flex-col items-center bg-base-100 rounded-box m-5">
        <div><img className="size-10 rounded-box" src={"/" + props.img}/></div>
        <div className="list">
          <div>{props.name}</div>
          {/*<div className="text-xs uppercase font-semibold opacity-60">{props.description}</div>*/}
        </div>
        <div className="list-row">
          <a href={props.ytlink} className={"btn btn-square btn-ghost" + (props.ytlink === undefined ? " hidden" : "")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
            </svg>
          </a>
          <a href={props.twitchlink} className={"btn btn-square btn-ghost" + (props.twitchlink === undefined ? " hidden" : "")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitch" viewBox="0 0 16 16">
              <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142z"/>
              <path d="M11.857 3.143h-1.143V6.57h1.143zm-3.143 0H7.571V6.57h1.143z"/>
            </svg>
          </a>
        </div>
      </li>
  );
}
