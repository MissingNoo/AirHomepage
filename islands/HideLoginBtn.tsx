import { useEffect } from "preact/hooks";
interface props {
  loggedin:boolean;
}

export default function HideLoginBtn(props:props) {
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
      return () => clearInterval(hide_timer);
    });
  });
  return (
    ""
  );
}
