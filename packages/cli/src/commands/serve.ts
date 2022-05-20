import { Command } from "commander";
import { serve } from "local-api";
import path from "path";
export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <port>", "Port to listen on", "4005")
  .action(async (filename = "note.js", options) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(Number(options.port), path.basename(filename), dir);
    } catch (err: any) {
      console.log("Here is the problem: ", err.message);
    }
  });
