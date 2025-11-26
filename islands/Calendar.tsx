// deno-lint-ignore-file react-no-danger
import moment from "npm:moment@2.30.1";
// deno-lint-ignore no-explicit-any
const years: { [key: string]: any[] } = {};
const startdate = [2025, 11, 16];
let color = "blue";
const start_color = "blue";
let offset = 1;
const start_offset = 1;
//const d = new Date();
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
      if (year == startdate[0] && month < startdate[1] && day < startdate[2]) {
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
          offset = 1;
          if (color == "red") {
            color = "blue";
          } else {
            color = "red";
          }
        }
      }
    }
  }
}
//console.log(years);

export default function Calendar() {
  //const d = new Date();
  let calendar = "<table>";
  for (let year = 2025; year <= 2026; year++) {
    calendar += "</table><table>" + year;
    for (let month = 1; month <= 12; month++) {
      calendar += "<table>";
      const next_month = years["y" + year][month][1];
      if (next_month[0] == "W") {
        continue;
      }
      calendar += "<tr>Mes " + month + "</tr><tr>";
      let max_day = 31;
      for (let day = 1; day <= max_day; day++) {
        if (month == 2) {
          max_day = 28;
        } else {
          max_day = 31;
        }
        const this_day = years["y" + year][month][day];
        //console.log(d.getMonth() + 1 + ":" +this_day)
        calendar += '<td style="background-color:' + this_day[1] + ';">' +
          this_day[0] + "</td>";
        if (day == 7 || day == 14 || day == 21 || day == 28) {
          calendar += "</tr><tr>";
        }
      }
      calendar += "</table>";
    }
  }

  const calend = "</tr></table>";
  const result = calendar + calend;
  return (
    <div class="flex gap-8 py-6">
      <div
        className="bg-base-300 border-2"
        dangerouslySetInnerHTML={{ __html: result }}
      >
      </div>
    </div>
  );
}
