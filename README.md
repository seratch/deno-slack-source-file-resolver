**Important Notice**: This module does not work for production apps deployed by `slack deploy` command, while it works for `slack run` app perfectly.

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
import { FunctionSourceFile } from "https://deno.land/x/deno_slack_source_file_resolver@0.1.5/mod.ts";

export const GreetingFunctionDefinition = DefineFunction({
  callback_id: "greeting_function",
  title: "Generate a greeting",
  // REPLACE THIS PART
  // source_file: "functions/greeting_function.ts",
  source_file: FunctionSourceFile(import.meta.url),
  input_parameters: { properties: {}, required: [] },
  output_parameters: { properties: {}, required: [] },
});
```

Please note that, when you use this module, **`deno test` command needs to be
`deno test --allow-read` instead**. As for running your app by `slack run` and
your deployed apps, no extra configuration is requied.

### LICENSE

The MIT License
