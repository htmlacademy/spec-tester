#!/usr/bin/env node
import yargs from "yargs";
import { existsSync, readdirSync } from "fs";
import { join, extname } from "path";
import { runCLI } from "@jest/core";
import { startServer, stopServer } from "./server";
const projects = readdirSync(join(__dirname, "tests"));

const argv = yargs
  .help("h")
  .example(
    `$0 <${projects.join(" | ")}> -p ./build`,
    "проверяет проект на соответствие ТЗ"
  )
  .alias("h", "help")
  .option("p", {
    alias: "path",
    type: "string",
    default: join(process.cwd(), "public"),
    describe: "Путь до собранного проекта"
  })
  .check(argv => {
    const path = join(process.cwd(), argv.p);

    if (!projects.includes(argv._[0])) {
      throw `Проект должен быть одним из: ${projects.join(", ")}.`;
    }

    if (extname(path)) {
      throw `Некорректное значение ${argv.p}, путь должен вести до папки`;
    }

    if (!existsSync(path)) {
      throw `Папки "${path}" не существует`;
    }

    argv.p = path;
    return true;
  }).argv;

const path = argv.p;

const jestConfig = {
  globalSetup: "jest-environment-puppeteer/setup",
  globalTeardown: "jest-environment-puppeteer/teardown",
  testEnvironment: "jest-environment-puppeteer",
  setupFilesAfterEnv: ["expect-puppeteer"],
  testRegex: "\\.test\\.js$",
  testPathIgnorePatterns: ["<rootDir>/(node_modules)/"]
};

const tests = join(__dirname, "tests", argv._[0]);

(async (): Promise<void> => {
  startServer(path);
  const result = await runCLI(jestConfig as any, [tests]);
  if (!result.results.success) {
    process.exit(1);
  }
})()
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  })
  .finally(() => {
    stopServer();
  });
