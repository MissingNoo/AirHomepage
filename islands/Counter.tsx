// deno-lint-ignore-file react-no-danger
import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { IS_BROWSER } from "fresh/runtime";
interface CounterProps {
  count: Signal<number>;
  text: Signal<string>;
}

async function getData() {
  const url = "http://127.0.0.1:5173/api/user/foo";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.text();
    return result;
    // deno-lint-ignore no-explicit-any
  } catch (error: any) {
    console.error(error.message);
  }
}

export default function Counter(props: CounterProps) {
  //if (!IS_BROWSER) return <div></div>;
  getData().then((res) => {
    props.text.value = res?.toString() ?? "";
  });

  return (
    <div class="flex gap-8 py-6">
      <p dangerouslySetInnerHTML={{ __html: props.text.value }}></p>
      <Button id="decrement" onClick={() => props.count.value -= 1}>-1</Button>
      <p class="text-3xl tabular-nums">{props.count}</p>
      <Button id="increment" onClick={() => props.count.value += 1}>+1</Button>
    </div>
  );
}
