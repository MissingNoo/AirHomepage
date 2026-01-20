import { define } from "../../utils.ts";
import { Partial } from "fresh/runtime";

export default define.page(() => {
  return (
    <Partial name="docs-content">
      <div class="p-2">
        <embed src="/maisound/index.html" class="w-full h-screen flex" />
      </div>
    </Partial>
  );
});
