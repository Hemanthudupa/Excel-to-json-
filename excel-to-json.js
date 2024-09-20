const excel = require("xlsx");
const { writeFileSync } = require("fs");

const readData = excel.readFile(
 "path"
);

const sheetNames = readData.SheetNames[0];
const sheets = readData.Sheets[sheetNames];

const data = excel.utils.sheet_to_json(sheets);

// console.log(data);

/*
    "HP": "5",
    "Head": "30MTR",
    "Type": "DC",
    "Sub/Sur": "SUBMERSIBLE",

     "imeiNo": "862491071310832",
      "clientid": "862491071310832",
      "userName": "iothmuprod001.azure-devices.net/862491071310832/?api-version=2018-06-30",
      "password": "SharedAccessSignature sr=iothmuprod001.azure-devices.net&sig=EfGTbQR7tzlzuXtReOwK4/JF66DFdv%2Bj/Mre96nMc28%3D&se=1882103265&skn=iothubowner",
      "lat": "20.67648939",
      "long": "77.02640042",
      "motorhp": 5

*/

const updatedData = data.map((ele) => {
  return {
    HP: Number(ele["motor hp"]),
    clientid: ele["clientid"] + "",
  
    lat:(ele["latlong"]?.split(",")[0]),
    long: (ele["latlong"]?.split(",")[1]),
    userName: ele["Username"],
    password: ele["Pass"],
    imeiNo: ele["Dispatch"] + "",
  };
});
writeFileSync("today-meda.json", JSON.stringify(updatedData), { encoding: "utf-8" });

function getLatLong(latlong) {
  const first = Number(latlong.split(",")[0].split(" ")[0]);
  const second = latlong.split(",")[0].split(" ")[1];
  const value = Number(second / 60);
  console.log(first,value);
  return first + value+""
}
