const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const BASE_URL = "https://api.sandbox.treasuryprime.com";
const USER_NAME = process.env.TREASURY_PRIME_USERNAME;
const PASSWORD = process.env.TREASURY_PRIME_PASSWORD;

app.get("/api/account/:accountId", async (req, res) => {
  try {
    const { accountId } = req.params;
    const response = await fetch(`${BASE_URL}/account/${accountId}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${USER_NAME}:${PASSWORD}`
        ).toString("base64")}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/account/:accountId/transaction", async (req, res) => {
  try {
    const { accountId } = req.params;
    const response = await fetch(
      `${BASE_URL}/account/${accountId}/transaction`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${USER_NAME}:${PASSWORD}`
          ).toString("base64")}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
