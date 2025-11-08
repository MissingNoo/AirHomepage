import { Db, MongoClient } from "mongodb";
import holidays from "./holidays.json" with { type: "json" };
import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
interface LoginData {
  id: number;
  username: string;
  password: string;
  uuid: string;
  base_hours: number;
  base_minutes: number;
  totalhours: string;
}
function connect_db() {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  client.connect();
  const db = client.db("BH");
  return db;
}

export async function verify_login(username:string, password:string) {
  const db:Db = connect_db();
  const users = db.collection<LoginData>("users");
  const user = await users.findOne({ username: username });
  if (user?.password == password) {
    return user.uuid;
  } else {
    return "";
  }
  //UUID.generate();
}

interface BHold {
    id: number;
    year: number;
    month: number;
    day: number;
    hour: string;
    horario: string;
  }

interface BH {
    id: number;
    year: number;
    month: number;
    day: number;
    entrada : string;
    almoco : string|undefined;
    volta : string|undefined;
    saida : string;
    is_reset : boolean;
}

function hour_diff(start:string, end:string) {
    return moment.utc(moment(end, "HH:mm:ss").diff(moment(start, "HH:mm:ss"))).format("HH:mm");
}

export async function update_hours(uuid:string) {
    const db:Db = connect_db();
    const users = db.collection<LoginData>("users");
    const user = await users.findOne({ uuid: uuid });
    if (!user) {throw new Error("User not found!");}
    const info = db.collection<BH>(user.id.toString());
    const current = new Date();
    const current_year = current.getFullYear();
    let totalhours = 0;
    let totalminutes = 0;

    for (let year = 2025; year <= current_year; year++) {
        for (let month = 1; month <= 12; month++) {
            for (let day = 1; day <= 32; day++) {
                let holiday = holidays["y" + year + "m" + month + "d" + day] != undefined;
                const today = await info.findOne({ id: user.id, year : year, month, day});
                if (today && today.is_reset) {
                    totalhours = 0;
                    totalminutes = 0;
                }
                if (today && !today.is_reset) {
                    const is_sunday = moment.utc(moment(year + "/" + month + "/" + day + " " + today.almoco, "YYYY/MM/DD HH:mm:ss")).format("dddd") == "Sunday";
                    let bh = false;
                    let bh_time:Array<string> = ["", ""];
                    let had_lunch = false;
                    let lunch_time:Array<string> = ["", ""];
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
                    if (!bh) {
                        hours -= 7;
                        minutes -= 20;
                    } else {
                        bh_time = hour_diff(worked_hours[0] + ":" + worked_hours[1] , "07:20").split(":");
                    }
                    
                    if (minutes < 0) {
                        minutes += 60;
                        hours--;
                    }

                    if (!holiday) {
                        if (!bh) {
                            if (is_sunday) {
                                console.log("Sunday");
                            }
                            if (!is_sunday) {
                                console.log("[" + month + "/" + day + "] + (" + (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ")");
                                totalhours += hours;
                                totalminutes += minutes;
                            } /* else if (hours < 0) {
                                totalhours += hours;
                                totalminutes += minutes;
                            }*/
                        } else {
                            console.log("[" + month + "/" + day + "] - (" + bh_time[0] + ":" + bh_time[1] + ")");
                            totalhours -= Number.parseInt(bh_time[0]);
                            totalminutes -= Number.parseInt(bh_time[1]);
                        }
                    }                    
                    
                    if (totalminutes >= 60) {
                        totalminutes -= 60;
                        totalhours++;
                    }

                    if (totalminutes < 0) {
                        totalminutes += 60;
                        totalhours--;
                    }
                }
            }   
        }
    }
    const hourstring = (totalhours < 10 ? "0" : "") + totalhours.toString();
    const minutesstring = (totalminutes < 10 ? "0" : "") + totalminutes.toString();
    console.log("total: " + hourstring + ":" + minutesstring);
}

async function _migration(uuid:string) {
    const db:Db = connect_db();
    const users = db.collection<LoginData>("users");
    const user = await users.findOne({ uuid: uuid });
    if (!user) {throw new Error("User not found!");}
    const infoold = db.collection<BHold>(user.id.toString() + "o");
    const info = db.collection<BH>(user.id.toString());
    const current = new Date();
    const year = current.getFullYear();
    for (let month = 1; month <= 12; month++) {
        for (let day = 1; day <= 32; day++) {
            const entrada = await infoold.findOne({ id: user.id, year : 2025, month, day, horario: "Entrada" });
            const almoco = await infoold.findOne({ id: user.id, year : 2025, month, day, horario: "Almoco" });
            const volta = await infoold.findOne({ id: user.id, year : 2025, month, day, horario: "Volta" });
            const saida = await infoold.findOne({ id: user.id, year : 2025, month, day, horario: "Saida" });
            const reset = await infoold.findOne({ id: user.id, year : 2025, month, day, horario: "Reset" });
            const ported = await info.findOne({ id: user.id, year : 2025, month, day});
            if (reset) {
                console.log(reset)
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
                    is_reset : reset?.horario == "Reset" ? true : false    
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
                    is_reset : reset ? true : false    
                });
            }
        }        
    }
}