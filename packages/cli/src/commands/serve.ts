import { Command } from "commander";
import { serve } from "local-api";
export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <port>", "Port to listen on", "4005")
  .action((filename = "note.js", options) => {
    serve(Number(options.port), filename, "./");
  });
