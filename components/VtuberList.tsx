import { Vtuber } from "./Vtuber.tsx";

export default function VtuberList() {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide self-center">
        Favorite VTubers
      </li>
      
      <Vtuber name="Yumemi Caelestis" img="logo.svg" description="test"></Vtuber>
      <Vtuber name="Lumin Tsukiboshi" img="logo.svg" description="test2"></Vtuber>
    </ul>
  );
}
