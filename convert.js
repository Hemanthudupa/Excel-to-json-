const excel = require("xlsx");
const readed = excel.readFile("path");
const sheetName = readed.SheetNames[readed.SheetNames.length - 1];
// const sheet = readed.Sheets[sheetName];
const sheet = readed.Sheets[sheetName];

// console.log(sheet);

const data = excel.utils.sheet_to_json(sheet);
// console.log(data);

const axios = require("axios");

const { writeFileSync } = require("fs");
// Define the API URL with the latitude, longitude, and API key

/* 
ID: 'MSEDCL',
    'Beneficiary ID': 'KM2308052',
    'Beneficiary Name': 'MIRABAI DASU NAIKWADE',
    'Application No': 'MS230724912',
    'Aadhar No': 356229804610,
    Mobile: 9699107051,
    'Caste Category': 'Open',
    'Water Source': 'Well',
    District: 'Beed',
    Taluka: 'Beed',
    Village: 'Borkhed',
    'Pump Capacity': '7.5HP-DC',
    'Vendor Selection Date': 45368,
    'Lineman Name': '--',
    'Lineman Contact': '--',
    'Application Status': 'Inspection Pending',
    'Vendor-1': 'Excol',
    'IMEI No.': 860103061682325,
    Locaton: '18.788192965507182,75.61368092894554',
    'Data On DB': 'yes',
    'New RMS Replaced': '' */

data.forEach(async (ele) => {
  const newObj = {};
  const locations = ele["Locaton"].split(",");

  //   const { display_name } = await axios.get(
  //     `https://geocode.maps.co/reverse?lat=${locations[0]}&lon=${locations[1]}&api_key=66a32e18f0ca9417249470aky7b74ec`
  //   );
  newObj.address =
    (await location(locations[0], locations[1])) ??
    `${ele["District"]},${ele["Taluka"]},${ele["Village"]}`;

  newObj.firstName = ele["Beneficiary Name"];
  newObj.mobileNumber = ele["Mobile"];
  newObj.aadhar = ele["Aadhar No"];
  newObj.imei = ele["IMEI No."];
  //   ele.controllerSerialNumber=ele['']
  //   ele.rmsDeviceId = ele[""];
  //   ele.password = ele[""];

  //   newObj.address = `${ele["District"]},${ele["Taluka"]},${ele["Village"]}`;
  //   newObj.address = display_name;

  //   ele.state=ele[]
  newObj.district = ele["District"];
  newObj.taluk = ele["Taluka"];
  // ele.motorType=ele['']
  // ele.rmsSimNumber=ele['']
  newObj.motorCategory = ele["Pump Capacity"].trimEnd().slice(-2);
  // ele.purpose=ele[]
  // ele.motorSerialNumber=ele[]
  // ele.headSize=ele[]
  newObj.motorHp = ele["Pump Capacity"].trim().slice(0, 3);
  //   ele.rmsPhoneNumber=ele[]

  newObj.distributorId = "37d30127-16e0-454c-aa1a-5f0430d71db7";
  console.log(newObj);

  writeFileSync("rite.json", JSON.stringify(newObj));
});

// firstName	lastName	mobileNumber	aadhar	imei	controllerSerialNumber	rmsDeviceId	password	address	state	district	taluk	motorType	rmsSimNumber	motorCategory	purpose	motorSerialNumber	headSize	motorHp	rmsPhoneNumber	distributorId

async function location(lat, long) {
  const apiKey = "66a32e18f0ca9417249470aky7b74ec";
  const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${long}&api_key=${apiKey}`;

  // Make the request using Axios
  try {
    const data = await axios.get(url);
    console.log(data.data.display_name);
    return data.data.display_name;
  } catch (error) {}
}

// console.log(location(17.961621419989957, 73.25316365808249));
