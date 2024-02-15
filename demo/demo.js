const axios = require("axios");
require("dotenv").config();

async function getAccessToken(consumerKey, consumerSecret) {
  try {
    const response = await axios.post(
      "https://api-prod.corelogic.com/oauth/token",
      null,
      {
        auth: {
          username: consumerKey,
          password: consumerSecret,
        },
        params: {
          grant_type: "client_credentials",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error while getting access token:", error.response.data);
    throw error;
  }
}

async function fetchData(consumerKey, consumerSecret) {
  try {
    const token = await getAccessToken(consumerKey, consumerSecret);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "x-developer-email": "buyerrealtor2@svit.app",
    };

    const response = await axios.get(
      "https://property.corelogicapi.com/v2/properties/search",
      {
        params: {
          streetAddress: "104 BAIN RD",
          city: "ARGYLE",
          state: "NY",
          zipCode: "12809",
        },
        headers: headers,
      }
    );
    const responseDataString = JSON.stringify(response.data, null, 2);
    console.log(responseDataString);
  } catch (error) {
    console.error("Error:", error.response.data);
  }
}

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;
fetchData(consumerKey, consumerSecret);
