import { Card } from "../components/Card.tsx";
import { define } from "../utils.ts";
import { Partial } from "fresh/runtime";
export default define.page(() => {
  // Only render the new content
  return (
    <Partial name="docs-content">
      <div class="m-2 flex not-lg:flex-col">
      <Card
          image=""
          link="/projects/BH/BH"
          text="Banco de Hora"
          subtext="Calculadora de horas trabalhadas"
        >
        </Card>
        <Card
          image="Projects/VCure.png"
          link="/projects/vcure"
          text="VCure"
          subtext="Holocure clone"
        >
        </Card>
      </div>
    </Partial>
  );
});
