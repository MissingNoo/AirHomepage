import { IS_BROWSER } from "fresh/runtime";
interface props {
  loggedin: boolean;
}
export default function BHInsert(props: props) {
  if (!IS_BROWSER) return <div></div>;
  if (!props.loggedin) {
    return <p>Not logged in</p>;
  }
  /*getData().then((res) => {
    props.text.value = res?.toString() ?? "";
  })*/

  return (
    <div class="flex flex-col gap-8 py-6 items-center">
      <script type="module" src="https://unpkg.com/cally"></script>
      <p>Inserir</p>
      <form method="post">
        <label className="input m-1">
          <span className="label">Dia</span>
          <input name="dia" type="date" className="input" />
        </label>
        <p></p>
        <label className="input m-1">
          <span className="label">Entrada</span>
          <input name="entrada" type="time" className="input" />
        </label>
        <p></p>
        <label className="input m-1">
          <span className="label">Almoço</span>
          <input name="almoco" type="time" className="input" />
        </label>
        <p></p>
        <label className="input m-1">
          <span className="label">Volta</span>
          <input name="volta" type="time" className="input" />
        </label>
        <p></p>
        <label className="input m-1">
          <span className="label">Saida</span>
          <input name="saida" type="time" className="input" />
        </label>
        <p></p>
        <button class="btn justify-center" type="submit">Inserir</button>
      </form>
      <p id="test"></p>
    </div>
  );
}
