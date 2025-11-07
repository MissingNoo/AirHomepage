import { createDefine, PageProps } from "fresh";
// @ts-types="preact"
import { RenderableProps } from "preact";
import { encodeHex } from "jsr:@std/encoding@^1.0.10/hex";
// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State {
  shared: string;
  logged_in: boolean;
}

export const define = createDefine<State>();

export function getCookie(ctx:RenderableProps<PageProps>, name:string) {
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

export async function sha256(input:string) {

  const messageBuffer = new TextEncoder().encode(input.toString());
  const hashBuffer = await crypto.subtle.digest("SHA-256", messageBuffer);
  const hash = encodeHex(hashBuffer);
  return hash;
}