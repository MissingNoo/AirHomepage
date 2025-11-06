import { define } from "../utils.ts";
import { Partial } from "fresh/runtime";
export default define.page(async (ctx) => {
  // Only render the new content
  return (
    <Partial name="docs-content">
      <p>teste</p>
    </Partial>
  );
});