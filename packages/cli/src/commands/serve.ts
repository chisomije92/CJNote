import { Command } from "commander";
import { serve } from "local-api";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";
export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <port>", "Port to listen on", "4005")
  .action(async (filename = "note.js", options) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        Number(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `Opening ${filename} for editing... navigate to http://localhost:${options.port} to edit`
      );
    } catch (err: any) {
      if (err.code === "EADDRINUSE") {
        console.error("Port already in use");
      } else {
        console.log("Here is the problem: ", err.message);
      }
      process.exit(1);
    }
  });
