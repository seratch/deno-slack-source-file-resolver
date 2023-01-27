import { DefineFunction, SlackFunction } from "deno_slack_sdk/mod.ts";
import { assertEquals } from "std/testing/asserts.ts";
import { FunctionSourceFile } from "../mod.ts";

const def = DefineFunction({
  callback_id: "function-name",
  title: "Do something awesome!",
  source_file: FunctionSourceFile(import.meta.url),
  input_parameters: { properties: {}, required: [] },
  output_parameters: { properties: {}, required: [] },
});
export default SlackFunction(def, () => {
  return { outputs: {} };
});

Deno.test("Resolve the path", () => {
  assertEquals(
    def.definition.source_file,
    "functions/slack_function_test.ts",
  );
});
