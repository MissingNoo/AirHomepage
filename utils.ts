import { createDefine, PageProps } from "fresh";
// @ts-types="preact"
import { RenderableProps } from "preact";
import { encodeHex } from "jsr:@std/encoding@^1.0.10/hex";
import { Signal } from "@preact/signals";
// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State {
  shared: string;
  logged_in: boolean;
  hash: string;
  uuid: string;
  id: string;
  hours: string;
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

// deno-lint-ignore no-explicit-any
export async function fetch_data(j: any, url: string = "http://127.0.0.1:8000") {
  try {
    const response = await fetch(url, {
      body: JSON.stringify(j),
      method: "POST",
    });
    const res = await response.json();
    return res;
    // deno-lint-ignore no-explicit-any
  } catch (error: any) {
    console.error(error.message);
  }
}
