//dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

//texting api and twilio requirements
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const app = express(); //alias

app.use(cors()); // blocks browser restricting any data

app.get("/message", (req, res) => {
  res.send("Test server for twilio stuff");
});

app.get("/send-text", (req, res) => {
  //_GET variables, passed via query string
  const { recipient, textmessage } = req.query;

  //send text
  client.messages
    .create({
      body: textmessage,
      to: recipient,
      from: "+13254201847", //from twilio
    })
    .then((message) => console.log(message.body));
});

app.listen(4000, () => console.log("Running on port 4000"));
