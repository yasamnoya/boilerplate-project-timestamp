// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res) => {
  const date = new Date()
  res.send({
    "unix": date.getTime(),
    "utc": date.toUTCString(),
  });
});

app.get("/api/:input", (req, res) => {
  if (req.params.input.includes("-")) {
    req.params.input += "T00:00:00"
  } else if (req.params.input.includes(" ")) {
    const re = /(\d+) (\w+) (\d+)/
    req.params.input = req.params.input.replace(re, "$2 $1, $3 00:00:00");
  }
  else {
    req.params.input = parseInt(req.params.input)
  }
  try {
    let date = new Date(req.params.input);

    if (date == "Invalid Date") {
      res.json({ error : "Invalid Date" })
    }

    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString(),
    });
  } catch (err) {
    res.json({ error : "Invalid Date" })
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
