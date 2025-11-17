import { useEffect } from "preact/hooks";
interface props {
  loggedin: boolean;
  hours: string;
  expected_pay: string;
}

export default function LoadHours(props: props) {
  useEffect(() => {
    const hide_timer = setInterval(() => {
      const h = document.getElementById("hours");
      if (h) {
        if (props.loggedin) {
          h.textContent = " " + props.hours + " Horas (R$" +
            props.expected_pay + ")";
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
