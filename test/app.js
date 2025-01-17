const axios = require("axios");
const { readFileSync, writeFileSync } = require("fs");
// const csv = require("csvtojson");
// csv()
//   .fromFile("./data.csv")
//   .then((ele) => {
//     // writeFileSync("./data.json", JSON.stringify(ele), {
//     //   flag: "a",
//     // });
//   });

let data = readFileSync("./data.json", {
  encoding: "utf-8",
});

data = JSON.parse(data);

const newData = data.map((ele) => {
  ele["controllerSerialNumber"] = ele["controllerSerialNumber"].replace(70, 30);
  ele["modelNumber"] = ele["modelNumber"].replace(70, 30);

  ele["motorSerialNumber"] = ele["motorSerialNumber"].replace(70, 30);
  return ele;
});
writeFileSync("./updated-data.json", JSON.stringify(newData), { flag: "a" });
