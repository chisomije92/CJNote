import { Command } from "commander";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <port>", "Port to listen on", "4005")
  .action((filename = "note.js", options) => {
    console.log(filename, options);
  });
