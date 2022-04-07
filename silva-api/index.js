const express = require("express");
const app = express();
var fs = require('fs');
const { faker } = require('@faker-js/faker');

const APP_PORT = 3300;

app.use(express.json());

const getFakeValue = (rule) => {

  const rules = {
    "personName()": faker.name.firstName,
    "location()": faker.address.streetAddress,
    "number()": () => faker.datatype.number({ min: 10, max: 999999 }),
    "phoneNumber()": faker.phone.phoneNumber,
    "unknownTranform": () => faker.lorem.words(10)
  }

  return rules[rule]();
}

app.post("/api/members", function (req, res) {
  const { body: reqBody } = req;

  const { access_level: accessLevel } = reqBody;
  if (!accessLevel) {
    res.send("Error");
    return;
  }

  const { data: dbData, error } = await supabaseClient.from("pii").select();

  if (error) {
    console.error("Got error while getting data from db.", error);
    res.send("Error");
    return;
  }

  let accessRules;
  try {
    accessRules = JSON.parse(fs.readFileSync('file', 'utf8'));
  } catch (err) {
    res.send("Error while loading rules");
    return;
  }

  dbData.map((row) => {
    const transformedRow = {};
    for (column of Object.keys(row)) {
      const origValue = row[column];
      rule = accessRules[column][`level_${accessLevel}`];
      if (rule === noTransform()) {
        transformedRow[column] = origValue;
      }
      else {
        transformedRow[column] = getFakeValue(rule);
      }
    }
  });

  res.send("Success");
});


// app.get("/", function (_req, res) {
//   res.send("Hello World");
// });

app.listen(APP_PORT);
