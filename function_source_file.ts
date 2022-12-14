export const FunctionSourceFile = function (
  // Pass the value of import.meta.url in a function code
  importMetaUrl: string,
): string {
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

function toFilepath(url: string) {
  return url.replace("file://", "");
}
