/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverConditions: ["worker"],
  serverDependenciesToBundle: "all",
  serverMainFields: ["browser", "modukle", "main"],
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  serverMinify: true,
  server: "./server.js",

  devServerBroadcastDelay: 1000,
};
