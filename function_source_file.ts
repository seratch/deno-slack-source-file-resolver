/**
 * Automatically resolves the `source_file` part for `DefineFunction()` in your Slack's next-generation platform app.
 *
 * @param importMetaUrl the value of `import.meta.url` in a function code
 * @returns the relative path from the root directory of your app project
 */
export const FunctionSourceFile = function (importMetaUrl: string): string {
  let dirToFindManifestTs = toFilepath(importMetaUrl);
  while (dirToFindManifestTs !== "") {
    const elems = dirToFindManifestTs.split("/");
    const end = elems.length - 1;
    dirToFindManifestTs = elems.slice(0, end).join("/");
    const files = Deno.readDirSync(dirToFindManifestTs);
    for (const file of files) {
      if (file.name === "manifest.ts") {
        const result = toFilepath(importMetaUrl)
          .replace(dirToFindManifestTs, "");
        return result.startsWith("/") ? result.replace(/^\//, "") : result;
      }
    }
  }
  throw new Error(`Failed to resolve source_file path for ${importMetaUrl}`);
};

/**
 * Trims the unnecesary parts from import.meta.url to make it valid as a file path.
 *
 * @param url `import.meta.url` string value
 * @returns valid file path
 */
function toFilepath(url: string) {
  return url.replace("file://", "");
}
