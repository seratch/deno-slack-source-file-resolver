import { assertEquals } from "std/testing/asserts.ts";
import { FunctionSourceFile } from "./mod.ts";

Deno.test("Resolve the path", () => {
  const path = FunctionSourceFile(import.meta.url);
  assertEquals(path, "src/function_source_file_test.ts");
});
