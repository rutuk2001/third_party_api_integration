const mailgun = require("mailgun-js");
require("dotenv").config();

// Initialize Mailgun with your API key and domain
const mg = mailgun({
  apiKey: process.env.APIKEY,
  domain: process.env.DOMAIN,
});

// Define your email data
const data = {
  from: "test@sandbox9627da200b0a410db2d25219f1e7ae04.mailgun.org",
  to: "rutuja.kharche@gmail.com",
  subject: "Hello",
  text: "Testing some Mailgun awesomeness!",
};

// Send the email
mg.messages().send(data, function (error, body) {
  if (error) {
    console.error(error);
  } else {
    console.log(body);
  }
});
