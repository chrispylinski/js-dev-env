/*  This script generates mock data for local development.
    This way you don't have to point to an actual API,
    but you can enjoy realistic, but randomized data,
    and rapid page loads due to local, static data.
*/

/* eslint-disable no-console */

import jsf from "json-schema-faker";
import { schema } from "./mockDataSchema";
import fs from "fs"; // node filesystem
import chalk from "chalk"; // in order to color our output

// pass schema to json schema faker which then generates jata and convert to JSON string
const json = JSON.stringify(jsf(schema));

// write DB file
fs.writeFile("./src/api/db.json", json, function (err) {

  if (err) {
    return console.log(chalk.red(err), "hello");
  } else {
    console.log(chalk.green("Mock data generated."));
  }
});
