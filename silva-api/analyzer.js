const language = require("@google-cloud/language");
const { createClient } = require("@supabase/supabase-js");
const _ = require("lodash");
const fs = require("fs");

const { SUPABASE_SERVICE_KEY, SUPABASE_URL } = require("./config");
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const getNRandom = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

const getTransform = (type) => {
  if (type === "LOCATION") return "location()";
  if (type === "PERSON") return "personName()";
  if (type === "NUMBER") return "number()";
  if (type === "PHONE_NUMBER") return "phoneNumber()";
  return "unknownTranform()";
};

const generateJson = (columnTypes) => {
  rules = {};

  columnTypes.forEach(([column, type]) => {
    rule = {
      type,
      level_1: { transform: "noTransform()" },
      level_2: {
        transform:
          type === "LOCATION" || type === "PERSON"
            ? getTransform(type)
            : "noTransform()",
      },
      level_3: { transform: getTransform(type) },
    };
    rules[column] = rule;
  });

  try {
    fs.writeFileSync("transform_rules.json", JSON.stringify(rules, null, 2));
  } catch (err) {
    console.error("Could not write to rules file.\n", err);
  }
};

const main = async () => {
  // Imports the Google Cloud client library

  // Creates a client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following line to run this code.
   */

  const { data, error } = await supabaseClient.from("pii").select();

  if (error) {
    console.error("Got error while getting data from db.", error);
    return;
  }

  const allData = data.reduce((acc, user) => {
    for (let key of Object.keys(user)) {
      if (!acc.hasOwnProperty(key)) {
        acc[key] = [];
      }

      acc[key].push(user[key]);
    }

    return acc;
  }, {});

  // purge useless column
  delete allData.id;

  const columnTypes = await Promise.all(
    Object.keys(allData).map(async (key) => {
      const columnContent = allData[key];
      const nRows = Math.ceil(0.15 * columnContent.length);
      const sampleValues = getNRandom(columnContent, nRows);

      // console.log(sampleValues);

      const document = {
        content: sampleValues.join(", "),
        type: "PLAIN_TEXT",
      };

      let textAnalysisResult;

      try {
        textAnalysisResult = (await client.analyzeEntities({ document }))[0];
      } catch (e) {
        console.log("Error for column", key, "Error is: ", e);
      }

      if (textAnalysisResult) {
        const entityTypes = [...textAnalysisResult.entities]
          .sort((a, b) => b.salience - a.salience) //
          .map((entity) => {
            return entity.type;
          });

        const entityType = _.head(
          _(entityTypes.slice(0, Math.ceil(entityTypes.length / 4)))
            .countBy()
            .entries()
            .maxBy(_.last)
        );

        return [key, entityType];
      }
      return [key, "UNKNOWN"];
    })
  );

  // const columnTypes = [
  //   ["name", "PERSON"],
  //   ["phone", "PHONE_NUMBER"],
  //   ["email", "OTHER"],
  //   ["address", "LOCATION"],
  //   ["postalZip", "ADDRESS"],
  //   ["region", "UNKNOWN"],
  //   ["country", "LOCATION"],
  //   ["password", "OTHER"],
  //   ["notes", "UNKNOWN"],
  //   ["company", "UNKNOWN"],
  //   ["bank_account_iban", "OTHER"],
  //   ["credit_card_number", "NUMBER"],
  //   ["credit_card_cvv", "NUMBER"],
  // ];

  console.log(columnTypes);

  // generateJson(columnTypes);
};

main();
