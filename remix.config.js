/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverConditions: ["worker"],
  serverDependenciesToBundle: [
    // bundle verything except the virtual module for the static content manifest provided by wrangler
    /^(?!.*\b__STATIC_CONTENT_MANIFEST\b).*$/,
  ],  serverMainFields: ["browser", "modukle", "main"],
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  serverMinify: true,
  server: "./server.ts",

  devServerBroadcastDelay: 1000,
};
