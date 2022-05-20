import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let service: Promise<void>;
export const startService = () => {
  if (!service) {
    service = esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.14.38/esbuild.wasm",
    });
  }
};

export const bundler = async (rawCode: string) => {
  await service;
  return esbuild
    .build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    })
    .then((result) => {
      return {
        code: result.outputFiles[0].text,
        err: "",
      };
    })
    .catch((e) => {
      return { code: "", err: e.message };
    });
};
