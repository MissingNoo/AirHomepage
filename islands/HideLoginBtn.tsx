import { useEffect } from "preact/hooks";
interface props {
  loggedin:boolean;
  hours: string;
}

export default function HideLoginBtn(props:props) {
  let ended = true;
  if (ended) {
    // deno-lint-ignore react-rules-of-hooks
    useEffect(() => {
      const hide_timer = setInterval(() => {
          const l = document.getElementById("loginbt");
          const lo = document.getElementById("logoutbt");
          if (l && props.loggedin) {
             l.style.display = 'none';
          }
          if (lo && !props.loggedin) {
            lo.style.display = 'none';
          }
          const h = document.getElementById("hours");
          if (h) {
            if (props.loggedin) {
              h.textContent = " " + props.hours + " Hours in bank ";              
            } else {
              h.style = "display:none";
            }
            //h.className = "btn"
          }
          ended = false;
        return () => clearInterval(hide_timer);
      });
    });
  }
  
  return (
    ""
  );
}
