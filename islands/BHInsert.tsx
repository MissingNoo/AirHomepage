import { useEffect } from "preact/hooks";
import { fetch_data, reload } from "../utils.ts";

interface props {
  loggedin: boolean;
  message: string;
  uuid: string;
}

function date_selected() {
  const d = document.getElementById("date");
  if (d) {
    location.replace("?date=" + (d as HTMLInputElement).value);
  }
  //console.log(location.search);
}

export default function BHInsert(props: props) {
  useEffect(() => {
    const date = new Date();
    let datestring = date.getFullYear().toString().padStart(4, "0") + "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") + "-" +
      date.getDate().toString().padStart(2, "0");
    const dateInput = document.getElementById("date") as
      | HTMLInputElement
      | null;
    if (dateInput) {
      if (location.search.toString().indexOf("date") != -1) {
        datestring = location.search.replace("?", "").split("=")[1];
        const dd = datestring.split("-");
        fetch_data({
          type: "get_day",
          uuid: props.uuid,
          year: parseInt(dd[0]),
          month: parseInt(dd[1]),
          day: parseInt(dd[2]),
        }, "/api/get-day").then((res) => {
          if (res.message == "sucess") {
            const entrada = document.getElementById("entrada");
            if (entrada) {
              (entrada as HTMLInputElement).value = res.entrada;
            }
            const almoco = document.getElementById("almoco");
            if (almoco) {
              (almoco as HTMLInputElement).value = res.almoco;
            }
            const volta = document.getElementById("volta");
            if (volta) {
              (volta as HTMLInputElement).value = res.volta;
            }
            const saida = document.getElementById("saida");
            if (saida) {
              (saida as HTMLInputElement).value = res.saida;
            }
            const sub = document.getElementById("sub");
            if (sub) {
              sub.textContent = "Atualizar";
            }
          }
        });
      }
      dateInput.value = datestring;
    }
  });
  if (!props.loggedin) {
    return <p>Faça login para utilizar</p>;
  }
  /*getData().then((res) => {
    props.text.value = res?.toString() ?? "";
  })

    */
  return (
    <div class="flex flex-col gap-8 py-6 items-center">
      <form onSubmit={reload} method="post">
        <label className="input m-1">
          <span className="label">Dia</span>
          <input
            onChange={date_selected}
            id="date"
            name="dia"
            type="date"
            className="input"
          />
        </label>
        <p></p>
        <label className="input m-1">
          <span className="label">Entrada</span>
          <input id="entrada" name="entrada" type="time" className="input" />
        </label>
        <p></p>
        <label className="input m-1">
          <span className="label">Almoço</span>
          <input id="almoco" name="almoco" type="time" className="input" />
        </label>
        <p></p>
        <label className="input m-1">
          <span className="label">Volta</span>
          <input id="volta" name="volta" type="time" className="input" />
        </label>
        <p></p>
        <label className="input m-1">
          <span className="label">Saida</span>
          <input id="saida" name="saida" type="time" className="input" />
        </label>
        <p></p>
        <button id="sub" class="btn justify-center" type="submit">
          Inserir
        </button>
      </form>
      <p class="text-3xl tabular-nums">{props.message}</p>
    </div>
  );
}
