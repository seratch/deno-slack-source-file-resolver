export const FunctionSourceFile = function (
  // Pass the value of import.meta.url in a function code
  importMetaUrl: string,
): string {
  let pathToFindMafniestTs = importMetaUrl.replace("file://", "");
  while (pathToFindMafniestTs !== "") {
    const urlElements = pathToFindMafniestTs.split("/");
    pathToFindMafniestTs = urlElements.slice(0, urlElements.length - 1).join(
      "/",
    );
    const files = Deno.readDirSync(pathToFindMafniestTs);
    for (const file of files) {
      if (file.name === "manifest.ts") {
        const result = importMetaUrl.replace("file://", "").replace(
          pathToFindMafniestTs,
          "",
        );
        if (result.startsWith("/")) {
          return result.replace(/^\//, "");
        }
        return result;
      }
    }
  }
  throw new Error(`Failed to resolve source_file path for ${importMetaUrl}`);
};
