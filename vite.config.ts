import { ConfigEnv, defineConfig, UserConfig } from "vite";
import replace from "@rollup/plugin-replace";

export default defineConfig(({ command }: ConfigEnv) => {
  const configs: UserConfig = {};

  if (command === "serve") {
    configs.logLevel = "info";
    // TODO set local .env
  }
  if (command === "build") {
    configs.logLevel = "error";
    // TODO set production .env
  }

  // build options
  configs.build = {
    rollupOptions: {
      plugins: [
        //  Toggle the booleans here to enable / disable Phaser 3 features:
        replace({
          "typeof CANVAS_RENDERER": "'true'",
          "typeof WEBGL_RENDERER": "'true'",
          "typeof EXPERIMENTAL": "'true'",
          "typeof PLUGIN_CAMERA3D": "'false'",
          "typeof PLUGIN_FBINSTANT": "'false'",
          "typeof FEATURE_SOUND": "'true'",
        }),
      ],
    },
  };

  // environments dir
  configs.envDir = "./environments";

  return configs;
});
