import { Card } from "../components/Card.tsx";
import { define } from "../utils.ts";
import { Partial } from "fresh/runtime";
export default define.page(() => {
  // Only render the new content
  return (
    <Partial name="docs-content">
      <p class="mt-5 ml-5">Web Projects</p>
      <div class="m-2 flex not-lg:flex-col">
        <Card
          image=""
          link="/projects/maisound"
          text="Maifumi Soundboard"
          subtext="Funny soundboard"
        >
        </Card>
        <Card
          image=""
          link="https://imissyumemi.337494.xyz/"
          text="I Miss Yumemi"
          subtext="Counter since her last live (currently broken for whatever reason)"
        >
        </Card>
        <Card
          image=""
          link="https://github.com/MissingNoo/AirHomepage"
          text="AirHomepage"
          subtext="This website"
        >
        </Card>
      </div>
      <p class="ml-5">Coding Projects</p>
      <div class="m-2 flex not-lg:flex-col">
        <Card
          image=""
          link="/projects/BH/BH"
          text="Banco de Hora"
          subtext="Calculadora de horas trabalhadas"
        >
        </Card>
        <Card
          image=""
          link="https://github.com/MissingNoo/KaraokeSplitter"
          text="KaraokeSplitter"
          subtext="Software for splitting karaoke streams into clips and mp3 files for local listening with tags and covers"
        >
        </Card>
        <Card
          image=""
          link="https://github.com/MissingNoo/mpd-discord"
          text="mpd-rpc"
          subtext="Connect MPD server to Discord RPC"
        >
        </Card>
        <Card
          image=""
          link="https://github.com/MissingNoo/Telegram-yt-dlp"
          text="Telegram yt-dlp"
          subtext="Telegram bot for downloading videos and music"
        >
        </Card>
        <Card
          image=""
          link="https://github.com/MissingNoo/DenoShortcuts"
          text="DenoShortcuts"
          subtext="Shortcuts webpage like a streamdeck"
        >
        </Card>
      </div>

      <p class="ml-5">Game Projects</p>
      <div class="m-2 flex not-lg:flex-col">
        <Card
          image="Projects/VCure.png"
          link="/vcure"
          text="[WIP] VCure"
          subtext="Holocure clone"
        >
        </Card>
      </div>

      <p class="ml-5">GameMaker Projects</p>
      <div class="m-2 flex not-lg:flex-col">
        <Card
          image=""
          link="https://github.com/MissingNoo/AirLib"
          text="AirLib"
          subtext="UI and Networking library for GameMaker"
        >
        </Card>
        <Card
          image=""
          link="https://github.com/MissingNoo/Pokemon-Fight-System"
          text="[Broken] Pokemon Fight System"
          subtext="Pokemon base game for GameMaker"
        >
        </Card>
      </div>
    </Partial>
  );
});
