"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const serve = (port, filename, dir) => {
    console.log("Server traffic on port " + port);
    console.log("saving cells to " + filename);
    console.log("that is in directory " + dir);
};
exports.serve = serve;
