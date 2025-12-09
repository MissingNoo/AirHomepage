import { Modal } from "../components/Modal.tsx";
import holidays from "../mongoserver/holidays.json" with { type: "json" };

type Holidays = { [key: string]: string };
interface CalendarProps {
  folga: string;
  escala: string;
}
const typedHolidays: Holidays = holidays;
import moment from "npm:moment@2.30.1";
// deno-lint-ignore no-explicit-any
const years: { [key: string]: any[] } = {};
const startdate = [2025, 11, 16];
let color = "blue";
const start_color = "blue";
let offset = 1;
const start_offset = 1;
//const d = new Date();
function build(folga: string, escala: string) {
  for (let year = 2025; year <= 2026; year++) {
    if (year < startdate[0]) {
      continue;
    }
    for (let month = 1; month <= 12; month++) {
      if (!years["y" + year]) {
        years["y" + year] = [];
      }
      years["y" + year][month] = [];
      for (let day = 1; day <= 31; day++) {
        if (
          year == startdate[0] && month < startdate[1] && day < startdate[2]
        ) {
          years["y" + year][month][day] = ["W", "gray"];
          continue;
        }
        const this_day = moment(year + "/" + month + "/" + day);
        years["y" + year][month][day] = [day, "gray"];

        if (
          parseInt(this_day.format("MM")) > month ||
          this_day.format("YYYY/MM/DD") == "Invalid date"
        ) {
          years["y" + year][month][day] = ["X", "gray"];
          continue;
        }
        //console.log(this_day.format("YYYY/MM/DD dddd"));
        if (this_day.format("dddd") == "Sunday") {
          if (
            year == startdate[0] && month == startdate[1] && day == startdate[2]
          ) {
            offset = start_offset;
            color = start_color;
          }
          //console.log(this_day.format("YYYY/MM/DD dddd"));
          years["y" + year][month][day] = [day, color];
          offset++;
          if (offset > 2) {
            if (color == "red") {
              color = "blue";
            } else {
              color = "red";
            }
          }
        }
        const mycolor = escala;
        const myday = folga;
        let freecolor = "gray";
        if (this_day.format("dddd") == myday) {
          //console.log(this_day.format("YYYY/MM/DD dddd"));
          if (offset == 1 || offset == 3) {
            freecolor = "purple";
          }
          if (offset == 2 && color == mycolor) {
            freecolor = "purple";
          }
          years["y" + year][month][day] = [day, freecolor];
        }
        //console.log(offset);
        if (offset > 2) {
          offset = 1;
        }
      }
    }
  }
}

//console.log(years);

export default function Calendar(props: CalendarProps) {
  build(props.folga, props.escala);
  const d = new Date();
  let calendar = "<table>";
  for (let year = 2025; year <= 2026; year++) {
    calendar += "</table><table>" + year;

    //weekdays
    const basedays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const baseptdays = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sabado",
    ];
    //

    for (let month = 1; month <= 12; month++) {
      calendar += "<table>";
      const next_month = years["y" + year][month][1];
      if (next_month[0] == "W") {
        continue;
      }
      if (year == d.getFullYear() && month <= d.getMonth()) {
        continue;
      }
      calendar += "<tr>Mes " + month + "</tr><tr>";

      //weekdays
      const days = basedays;
      const ptdays = baseptdays;
      const momday = moment(year + "/" + month + "/01");
      while (days[0] != momday.format("dddd")) {
        days.push(days.shift() ?? "");
        ptdays.push(ptdays.shift() ?? "");
      }

      for (let d = 0; d < days.length; d++) {
        const element = ptdays[d];
        calendar += '<td style="background-color:;">' +
          String(element).charAt(0) + String(element).charAt(1) +
          String(element).charAt(2) + "</td>";
      }

      calendar += "</tr><tr>";
      //
      let max_day = 31;
      let dcount = 0;
      for (let day = 1; day <= max_day; day++) {
        if (month == 2) {
          max_day = 28;
        } else {
          max_day = 31;
        }
        const this_day = years["y" + year][month][day];
        let bgcolor = this_day[1];
        if (typedHolidays["y" + 2025 + "m" + month + "d" + day] != undefined) {
          bgcolor = "pink";
        }

        //console.log(d.getMonth() + 1 + ":" +this_day)
        calendar += '<td style="background-color:' + bgcolor + ';">' +
          this_day[0] + "</td>";
        dcount++;
        if (dcount == 7) {
          calendar += "</tr><tr>";
          dcount = 0;
        }
      }
      calendar += "</table>";
    }
  }

  const calend = "</tr></table>";
  const start = '\
  <p>Legenda:</p>\
      <p style="background-color:purple">Folga da semana</p>\
      <p style="background-color:red">Domingo vermelho</p>\
      <p style="background-color:blue">Domingo azul</p>\
      <p style="background-color:pink">Feriado</p>\
  '
  const result = start + calendar + calend;
  return (
    <div class="flex-row gap-8 py-6">
      <Modal button_id="calendar" button_text="Abrir Calendario" modal_id="calend" text={result}></Modal>
      
      {/*<div
        className="bg-base-300 border-2"
        dangerouslySetInnerHTML={{ __html: result }}
      >
      </div>*/}
    </div>
  );
}
