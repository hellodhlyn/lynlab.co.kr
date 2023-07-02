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

  // opt-in v2 features
  future: {
    v2_headers: true,
    v2_meta: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  }
};
