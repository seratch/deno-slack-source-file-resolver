import { assertEquals, assertMatch, fail } from "std/testing/asserts.ts";
import { FunctionSourceFile } from "../mod.ts";

Deno.test("Throw an error when the source code does not include the handler part", () => {
  try {
    const path = FunctionSourceFile(import.meta);
    fail(`Error should be thrown here (returned: ${path})`);
  } catch (e) {
    assertMatch(
      e.message,
      new RegExp(
        ".+/deno-slack-source-file-resolver/functions/function_source_file_test.ts does not include .+ in its code. When you have the handler code in a different file, pass the relative path of the file instead.",
      ),
    );
  }
});

Deno.test("Resolve the path when strict mode is false", () => {
  const path = FunctionSourceFile(import.meta, false);
  assertEquals(path, "functions/function_source_file_test.ts");
});
