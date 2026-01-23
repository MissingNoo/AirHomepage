import { Vtuber } from "./Vtuber.tsx";

export default function VtuberList() {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide self-center">
        Favorite VTubers
      </li>
      <Vtuber
        name="Hakos Baelz"
        img="baelz.png"
        description="test"
        ytlink="https://www.youtube.com/@HakosBaelz"
      >
      </Vtuber>
      <Vtuber
        name="Maifumi"
        img="maifumi.png"
        description="test2"
        ytlink="https://www.youtube.com/@Maifumiii"
      >
      </Vtuber>
      <Vtuber
        name="Trickywi"
        img="trickywi.png"
        description="test2"
        ytlink="https://www.youtube.com/@Trickywi"
        twitchlink="https://www.twitch.tv/trickywi"
      >
      </Vtuber>
      <Vtuber
        name="Yumemi Caelestis"
        img="ymm.png"
        description="test"
        ytlink="https://www.youtube.com/@yumemivt"
        twitchlink="https://www.twitch.tv/yumemivt"
      >
      </Vtuber>
      <Vtuber
        name="Lumin Tsukiboshi"
        img="lumin.png"
        description="test2"
        ytlink="https://www.youtube.com/@LuminTsukiboshi"
      >
      </Vtuber>
    </ul>
  );
}
