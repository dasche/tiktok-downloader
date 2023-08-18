const express = require("express");
const path = require("path");
require("dotenv/config");
const TikTokNoWatermak = require("tiktok-no-watermark-api");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post("/api", async (req, res) => {
    const shortlink = /https:\/\/(?:vt|vm)\.tiktok\.com\/[A-Za-z0-9_-]+/;
    const web_url = /https:\/\/www\.tiktok\.com\/@[^/]+\/video\/(\d+)/;
    const { url } = req.body;
    const invalid_input = !url || (!shortlink.test(url) && !web_url.test(url));
    if (invalid_input) {
        res.status(400).json({ status: "fail", message: "Input data is not valid" });
    } else {
        try {
            console.log("==========");
            console.log(`New request for: ${url}`);
            const result = await TikTokNoWatermak(url, true);
            console.log("Success!");
            res.json(result);
        } catch (error) {
            console.log("Failed!");
            res.status(400).json(error);
        }
    }
});

app.use("*", (req, res) => {
    res.redirect("/");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
