import center_align from "center-align";
import chalk from "chalk";
import windowSize from "window-size";
import { Bot } from "./types/classes.js";
console.clear();

//! Next two lines are to keep the bot up, even if there are errors - it does not prevent memory leak or typo crashes
process.on("uncaughtException", (e) => {
    console.error(chalk.hex("#8734f4").bold("[ UNCAUGHT EXCEPTION ] ↓"));
    console.error(e, { depth: null, color: "auto", showHidden: false });
});
process.on("unhandledRejection", (e) => {
    console.error(chalk.hex("#ee34f4").bold("[ UNHANDLED REJECTION ] ↓"));
    console.error(e, { depth: null, color: "auto", showHidden: false });
});

console.log(center_align(chalk.bgHex("#60eafa").hex("#787878").bold.italic(`\nK · E · Y · A · U · T · H\n`), windowSize?.width || 0));

const client = new Bot({
    intents: 3276543, // will be reducing this endpoint after finishing testing the bot
    presence: {
        status: "idle",
        activities: [{ name: "Booting up...", type: 5 }]
    }
});

client.init();
