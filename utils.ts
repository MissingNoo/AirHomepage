import { createDefine, PageProps } from "fresh";
// @ts-types="preact"
import { RenderableProps } from "preact";
import { encodeHex } from "jsr:@std/encoding@^1.0.10/hex";
import { Signal } from "@preact/signals";
import { db_port } from "./settings.ts";
// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State {
  shared: string;
  logged_in: boolean;
  hash: string;
  uuid: string;
  id: string;
  hours: string;
  expected_pay: string;
  message: Signal<string>;
}

export const define = createDefine<State>();

export function getCookie(ctx: RenderableProps<PageProps>, name: string) {
  const cookies = ctx.req.headers.get("cookie")?.split(";") ?? [];
  const foocookie = cookies.findIndex((v) => {
    return v.replaceAll(" ", "").split("=")[0] == name;
  });
  let result = undefined;
  if (foocookie != -1) {
    result = cookies[foocookie].split("=")[1];
  }
  return result;
}

export async function sha256(input: string) {
  const messageBuffer = new TextEncoder().encode(input.toString());
  const hashBuffer = await crypto.subtle.digest("SHA-256", messageBuffer);
  const hash = encodeHex(hashBuffer);
  return hash;
}

export async function fetch_data(
  // deno-lint-ignore no-explicit-any
  j: any,
  url: string = "http://127.0.0.1:" + db_port.toString(),
) {
  try {
    const response = await fetch(url, {
      body: JSON.stringify(j),
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // deno-lint-ignore no-explicit-any
    return (await response.json()) as any;
  } catch (error) {
    console.error(error);
    //throw error;
  }
}

export function go_home() {
  setTimeout(function () {
    location.replace("/");
  }, 500);
  setTimeout(function () {
    location.reload();
  }, 1000);
}

export function reload() {
  setTimeout(function () {
    location.reload();
  }, 100);
}
