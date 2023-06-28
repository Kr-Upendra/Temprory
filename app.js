const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to youtube search api!",
  });
});

app.get("/:search", async (req, res) => {
  try {
    const { search } = req.params;
    console.log(req.params);
    const url = "https://youtube-v31.p.rapidapi.com/search";
    const options = {
      params: {
        q: search || "Hello world programm",
        part: "id",
        maxResults: "3",
      },
      headers: {
        "X-RapidAPI-Key": process.env.APIKEY,
        "X-RapidAPI-Host": process.env.API_HOST,
      },
    };

    const response = await axios.get(url, options);
    res.status(200).json({
      status: "success",
      message: "SOMETHING GOOD HEPPEN LET'S SEE!",
      response: response.data.items,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "SOMETHING WENT VERY WRONG!",
      error: err,
    });
  }
});

app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "SORRY THIS ROUTE DOES NOT EXIST ON THIS SERVER!",
  });
});

module.exports = app;
