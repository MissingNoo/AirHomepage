import { Db, MongoClient } from "mongodb";
import holidays from "./holidays.json" with { type: "json" };
import { compare, hash } from "bcrypt";

type Holidays = { [key: string]: string };
const typedHolidays: Holidays = holidays;
// deno-lint-ignore no-import-prefix
import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
import { debug } from "./main.ts";
interface LoginData {
  id: number;
  username: string;
  password: string;
  uuid: string;
  base_hours: number;
  base_minutes: number;
  totalhours: string;
  expected_pay: string;
}
const client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
function connect_db() {
  const db = client.db("BH");
  return db;
}

// deno-lint-ignore no-explicit-any
function log(msg: any) {
  if (debug) {
    console.log(msg);
  }
}

export async function register_user(
  username: string,
  password: string,
  idd: number,
) {
  const db: Db = connect_db();
  const users = db.collection<LoginData>("users");
  const user = await users.findOne({ username: username });
  const userbyidd = await users.findOne({ id: idd });
  if (!user && !userbyidd) {
    const pwd = await hash(password, 10);
    users.insertOne({
      id: idd,
      base_hours: 0,
      base_minutes: 0,
      password: pwd.toString(),
      totalhours: "",
      username: username,
      uuid: crypto.randomUUID(),
      expected_pay: "",
    });
    return { message: "Registered" };
  }
  return { message: "Username exists" };
}

export async function verify_login(username: string, password: string) {
  /*hash("33d74eef94", 10, (err, res) => {
    log(res);
  })*/
  const db: Db = connect_db();
  const users = db.collection<LoginData>("users");
  const user = await users.findOne({ username: username });
  if (user) {
    if (await compare(password, user.password)) {
      return { message: "sucess", uuid: user.uuid, id: user.id };
    } else {
      return { message: "Invalid password" };
    }
  }
  return { message: "Invalid username" };
}

interface BHold {
  id: number;
  year: number;
  month: number;
  day: number;
  hour: string;
  horario: string;
}

interface BHAdd {
  uuid: string;
  year: number;
  month: number;
  day: number;
  entrada: string;
  almoco: string;
  volta: string;
  saida: string;
}

interface BH {
  id: number;
  year: number;
  month: number;
  day: number;
  entrada: string;
  almoco: string | undefined;
  volta: string | undefined;
  saida: string;
  is_reset: boolean;
}

function hour_diff(start: string, end: string) {
  return moment.utc(moment(end, "HH:mm:ss").diff(moment(start, "HH:mm:ss")))
    .format("HH:mm");
}

export async function add_hours(data: BHAdd) {
  const db: Db = connect_db();
  const users = db.collection<LoginData>("users");
  const user = await users.findOne({ uuid: data.uuid });
  if (!user) throw new Error("User not found!");
  const info = db.collection<BH>(user.id.toString());
  const date = data.day.toString().split("-");
  //const already = info. //TODO: don't add if exists
  if (user) {
    const filter = {
      id: user.id,
      day: parseInt(date[2]),
      month: parseInt(date[1]),
      year: parseInt(date[0]),
    };
    const existing_day = await info.findOne(filter);
    if (existing_day) {
      info.updateOne(filter, {
        $set: {
          entrada: data.entrada,
          almoco: data.almoco,
          volta: data.volta,
          saida: data.saida,
        },
      });
    } else {
      info.insertOne({
        id: user.id,
        entrada: data.entrada,
        almoco: data.almoco,
        volta: data.volta,
        saida: data.saida,
        day: parseInt(date[2]),
        month: parseInt(date[1]),
        year: parseInt(date[0]),
        is_reset: false,
      });
    }
    update_hours(data.uuid);
  }
}

// deno-lint-ignore no-explicit-any
export async function get_day(data: any) {
  const db: Db = connect_db();
  const users = db.collection<LoginData>("users");
  const user = await users.findOne({ uuid: data.uuid });
  if (!user) throw new Error("User not found!");
  const info = db.collection<BH>(user.id.toString());
  return await info.findOne({
    year: data.year,
    month: data.month,
    day: data.day,
  });
}

export async function get_hours(id: number) {
  const db: Db = connect_db();
  const users = db.collection<LoginData>("users");
  const user = await users.findOne({ id: id });
  if (debug) {
    log(user);
  }
  if (!user) throw new Error("User not found!");
  return user.totalhours;
}

export async function get_pay(id: number) {
  const db: Db = connect_db();
  const users = db.collection<LoginData>("users");
  const user = await users.findOne({ id: id });
  if (debug) {
    log(user);
  }
  if (!user) throw new Error("User not found!");
  return user.expected_pay;
}

export async function update_hours(uuid: string) {
  const db: Db = connect_db();
  const users = db.collection<LoginData>("users");
  const user = await users.findOne({ uuid: uuid });
  if (!user) throw new Error("User not found!");
  const info = db.collection<BH>(user.id.toString());
  const current = new Date();
  const current_year = current.getFullYear();
  let totalhours = 0;
  let totalminutes = 0;

  for (let year = 2025; year <= current_year; year++) {
    for (let month = 1; month <= 12; month++) {
      for (let day = 1; day <= 32; day++) {
        const holiday: boolean =
          typedHolidays["y" + year + "m" + month + "d" + day] != undefined;
        const today = await info.findOne({
          id: user.id,
          year: year,
          month,
          day,
        });
        if (today && today.is_reset) {
          totalhours = 0;
          totalminutes = 0;
          log("[" + month + "/" + day + "] RESET");
        }
        if (today && !today.is_reset) {
          const is_sunday = moment.utc(
            moment(
              year + "/" + month + "/" + day + " " + today.almoco,
              "YYYY/MM/DD HH:mm:ss",
            ),
          ).format("dddd") == "Sunday";
          let bh: boolean = false;
          let bh_time: Array<string> = ["", ""];
          let had_lunch: boolean = false;
          let lunch_time: Array<string> = ["", ""];
          if (today.almoco && today.volta) {
            had_lunch = true;
            lunch_time = hour_diff(today.almoco, today.volta).split(":");
          } else {
            bh = true;
          }
          const worked_hours = hour_diff(today.entrada, today.saida).split(":");
          let hours = Number.parseInt(worked_hours[0]);
          let minutes = Number.parseInt(worked_hours[1]);
          if (had_lunch) {
            minutes -= Number.parseInt(lunch_time[1]);
            hours -= Number.parseInt(lunch_time[0]);
          }
          /*let total:Array<string> = ["", ""];
                    let extra:Array<string> = ["", ""];
                    if (!bh) {
                        total = hour_diff(lunch_time[0] + ":" + lunch_time[1], worked_hours[0] + ":" + worked_hours[1]).split(":");
                        if (parseInt(total[0]) < 7) {
                            extra = hour_diff(total[0] + ":" + total[1], "07:20").split(":");
                        } else {
                            extra = hour_diff("07:20", total[0] + ":" + total[1]).split(":");
                        }

                        hours = parseInt(extra[0]);
                        minutes = parseInt(extra[1]);
                        log("extra [" + month + "/" + day + "] " + extra);*/
          if (!bh) {
            hours -= 7;
            minutes -= 20;
          } else {
            bh_time = hour_diff(
              worked_hours[0] + ":" + worked_hours[1],
              "07:20",
            ).split(":");
          }

          if (minutes < 0) {
            minutes += 60;
            hours--;
          }

          if (!holiday) {
            if (!bh) {
              if (is_sunday) {
                log("[" + month + "/" + day + "] Sunday");
                if ((hours >= 0 && minutes > 0)) {
                  hours = 0;
                  minutes = 0;
                }
              }
              const a = true;
              if (a) {
                totalhours += hours;
                totalminutes += minutes;
                if (totalminutes >= 60) {
                  totalminutes -= 60;
                  totalhours++;
                }

                if (totalminutes < 0) {
                  totalminutes += 60;
                  totalhours--;
                }
                const hourstring = (totalhours < 10 ? "0" : "") +
                  totalhours.toString();
                const minutesstring = (totalminutes < 10 ? "0" : "") +
                  totalminutes.toString();
                log(
                  "[" + month + "/" + day + "] + (" +
                    (hours < 10 && hours > -1 ? "0" + hours : hours) + ":" +
                    (minutes < 10 ? "0" + minutes : minutes) + ") " +
                    hourstring + ":" + minutesstring + (hours < 0 ? " BH" : ""),
                );
              } /* else if (hours < 0) {
                                totalhours += hours;
                                totalminutes += minutes;
                            }*/
            } else {
              totalhours -= Number.parseInt(bh_time[0]);
              totalminutes -= Number.parseInt(bh_time[1]);
              if (totalminutes >= 60) {
                totalminutes -= 60;
                totalhours++;
              }

              if (totalminutes < 0) {
                totalminutes += 60;
                totalhours--;
              }
              const hourstring = (totalhours < 10 ? "0" : "") +
                totalhours.toString();
              const minutesstring = (totalminutes < 10 ? "0" : "") +
                totalminutes.toString();
              log(
                "[" + month + "/" + day + "] - (" + bh_time[0] + ":" +
                  bh_time[1] + ") " + hourstring + ":" + minutesstring + " BH",
              );
            }
          } else {
            log("[" + month + "/" + day + "] Holiday");
          }
        }
      }
    }
  }
  const hourstring = (totalhours < 10 ? "0" : "") + totalhours.toString();
  const minutesstring = (totalminutes < 10 ? "0" : "") +
    totalminutes.toString();
  log("total: " + hourstring + ":" + minutesstring);

  let hours_in_minutes = parseInt(minutesstring);
  let _hours = parseInt(hourstring);
  while (_hours > 0) {
    _hours--;
    hours_in_minutes += 60;
  }
  hours_in_minutes = hours_in_minutes / 60;
  const expected_pay = parseFloat((12.55385 * hours_in_minutes).toString())
    .toFixed(2);
  users.updateOne({ id: user.id }, {
    $set: {
      totalhours: hourstring + ":" + minutesstring,
      expected_pay: expected_pay.toString(),
    },
  });
  //setkey(user.id.toString(), hourstring + ":" + minutesstring);
}

async function _migration(uuid: string) {
  const db: Db = connect_db();
  const users = db.collection<LoginData>("users");
  const user = await users.findOne({ uuid: uuid });
  if (!user) throw new Error("User not found!");
  const infoold = db.collection<BHold>(user.id.toString() + "o");
  const info = db.collection<BH>(user.id.toString());
  const current = new Date();
  const year = current.getFullYear();
  for (let month = 1; month <= 12; month++) {
    for (let day = 1; day <= 32; day++) {
      const entrada = await infoold.findOne({
        id: user.id,
        year: 2025,
        month,
        day,
        horario: "Entrada",
      });
      const almoco = await infoold.findOne({
        id: user.id,
        year: 2025,
        month,
        day,
        horario: "Almoco",
      });
      const volta = await infoold.findOne({
        id: user.id,
        year: 2025,
        month,
        day,
        horario: "Volta",
      });
      const saida = await infoold.findOne({
        id: user.id,
        year: 2025,
        month,
        day,
        horario: "Saida",
      });
      const reset = await infoold.findOne({
        id: user.id,
        year: 2025,
        month,
        day,
        horario: "Reset",
      });
      const ported = await info.findOne({
        id: user.id,
        year: 2025,
        month,
        day,
      });
      if (reset) {
        log(reset);
      }
      if (ported === null && entrada && saida) {
        info.insertOne({
          id: user.id,
          year,
          month,
          day,
          entrada: entrada.hour,
          almoco: almoco?.hour,
          volta: volta?.hour,
          saida: saida.hour,
          is_reset: reset?.horario == "Reset" ? true : false,
        });
      }
      if (ported === null && reset) {
        info.insertOne({
          id: user.id,
          year,
          month,
          day,
          entrada: "",
          almoco: "",
          volta: "",
          saida: "",
          is_reset: reset ? true : false,
        });
      }
    }
  }
}
