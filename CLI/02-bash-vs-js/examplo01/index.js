const { mkdirSync, existsSync, rmSync } = require("fs");
const { execSync } = require("child_process");

const getFileName = (index) => (index >= 3 ? `js-0${index}` : `mjs-0${index}`);

const rmFolder = (folderName) => rmSync(`./${folderName}`, { recursive: true });

const makeDirAndReturnName = (folderName) => {
  if (existsSync(folderName)) rmFolder(folderName);

  mkdirSync(folderName);
  return folderName;
};

const FOLDER_AMOUNT = 4;
Array.from(Array(FOLDER_AMOUNT).keys())
  .map((index) => makeDirAndReturnName(getFileName(index + 1)))
  //   .map((folderName) => console.log(folderName))
  .map((folderName) => rmFolder(folderName));
