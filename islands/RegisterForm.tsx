import { IS_BROWSER } from "fresh/runtime";
import { go_home } from "../utils.ts";
export default function RegisterForm() {
  if (!IS_BROWSER) return <div></div>;
  return (
    <div class="flex justify-center">
      <form onSubmit={go_home} method="post">
        <input
          type="text"
          placeholder="Usuario"
          className="input"
          name="username"
        />
        <p></p>
        <input
          type="password"
          placeholder="Senha"
          className="input"
          name="password"
        />
        <p></p>
        <input
          type="number"
          placeholder="Cracha"
          className="input"
          name="idd"
        />
        <p></p>
        Dia de Folga:
        <select name="folga">
          <option value="Monday">Segunda</option>
          <option value="Tuesday">Terça</option>
          <option value="Wednesday">Quarta</option>
          <option value="Thursday">Quinta</option>
          <option value="Friday">Sexta</option>
          <option value="Saturday">Sabado</option>
          <option value="Sunday">Domingo</option>
        </select>
        <p></p>
        Escala:
        <select name="escala">
          <option value="blue">Azul</option>
          <option value="red">Vermelha</option>
        </select>
        <p></p>
        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  );
}
