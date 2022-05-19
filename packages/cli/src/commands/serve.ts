import { Command } from "commander";
import { serve } from "local-api";
import path from "path";
export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <port>", "Port to listen on", "4005")
  .action((filename = "note.js", options) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    serve(Number(options.port), path.basename(filename), dir);
  });
