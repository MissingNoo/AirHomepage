import { define } from "../../utils.ts";

export const handler = define.handlers({
  GET() {
    const json = '{"foo": "bar"}';
    return new Response(
      json,
    );
  },
});
