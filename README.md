## deno_slack_source_file_resolver

`deno_slack_source_file_resolver` is a tiny utility for Slack's next-generation
platform. With this module, you don't need to manually synchronize the
`source_file` path name when you rename/move the file.

### How It Works

It's pretty simple to use this module! You can import the `FunctionSourceFile`
module and using it inside `DefineFunction` initialization code:

```typescript
import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
// ADD THIS
import { FunctionSourceFile } from "https://deno.land/deno_slack_source_file_resolver@0.1.0/mod.ts";

export const GreetingFunctionDefinition = DefineFunction({
  callback_id: "greeting_function",
  title: "Generate a greeting",
  description: "Generate a greeting",
  // REPLACE THIS PART
  // source_file: "functions/greeting_function.ts",
  source_file: FunctionSourceFile(import.meta.url),
  input_parameters: {
    properties: {
      recipient: { type: Schema.slack.types.user_id },
      message: { type: Schema.types.string },
    },
    required: ["message"],
  },
  output_parameters: {
    properties: {
      greeting: { type: Schema.types.string },
    },
    required: ["greeting"],
  },
});
```

### LICENSE

The MIT License
