import { useEffect } from "preact/hooks";
import { totalhours } from "../signals.ts";
import { cid } from "../signals.ts";
import { fetch_data } from "../utils.ts";
interface props {
  loggedin: boolean;
  hours: string;
}

export default function LoadHours(props: props) {
  useEffect(() => {
    const hide_timer = setInterval(() => {
      const h = document.getElementById("hours");
      if (h) {
        if (props.loggedin) {
          h.textContent = " " + props.hours + " Hours in bank ";
        } else {
          h.style = "display:none";
        }
      }
      clearInterval(hide_timer);
      return () => clearInterval(hide_timer);
    });
  });

  return (
    ""
  );
}
