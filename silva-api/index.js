const express = require("express");
const app = express();
var fs = require('fs');
const cors = require('cors');
const { faker } = require('@faker-js/faker');
const { Console } = require("console");
const { createClient } = require("@supabase/supabase-js");


const APP_PORT = 3300;

app.use(cors());

app.use(express.json());

const getFakeValue = (rule) => {

  const rules = {
    "personName()": faker.name.firstName,
    "location()": faker.address.streetAddress,
    "number()": () => faker.datatype.number({ min: 10, max: 999999 }),
    "phoneNumber()": faker.phone.phoneNumber,
    "email()": faker.internet.email,
    "unknownTranform()": () => faker.lorem.words(10)
  }

  return rules[rule]();
}

const { SUPABASE_KEY, SUPABASE_URL } = require("./config");
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

app.post("/api/members", async (req, res) => {
  const { body: reqBody } = req;

  const { access_level: accessLevel } = reqBody;
  console.log(req.body);
  if (!accessLevel) {
    res.send("Error");
    return;
  }

  const { data: dbData, error } = await supabaseClient.from("pii").select().limit(40);

  if (error) {
    console.error("Got error while getting data from db.", error);
    res.send("Error");
    return;
  }

  let accessRules;
  try {
    accessRules = JSON.parse(fs.readFileSync('transform_rules.json', 'utf8'));
  } catch (err) {
    console.log(err);
    res.send("Error while loading rules");
    return;
  }

  // console.log(accessRules);

  const transformedResult = dbData.map((row) => {
    const transformedRow = {};
    for (column of Object.keys(row)) {
      const origValue = row[column];

      if (column === "id") {
        transformedRow[column] = origValue;
        continue;
      }

      const transformRule = accessRules[column][`level_${accessLevel}`]["transform"];
      if (transformRule === "noTransform()") {
        transformedRow[column] = origValue;
      }
      else {
        transformedRow[column] = getFakeValue(transformRule);
      }
    }
    return transformedRow;
  });
  // console.log(transformedResult)
  res.json(transformedResult);
});


// app.get("/", function (_req, res) {
//   res.send("Hello World");
// });

app.listen(APP_PORT);
console.log(`Runing on port ${APP_PORT}`)
