import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const url = "https://api.openuv.io/api/v1/uv";
const apiKey = "openuv-vcxwarlsiio41d-io";

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${url}`);
        const result = response.data;
        res.render("index.ejs", { data: result });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
});

app.post("/submit", async (req, res) => {
    try {
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const response = await axios.get(`${url}?lat=${latitude}&lng=${longitude}`, {
            headers: {
                "x-access-token": apiKey,
            },
        });       
        const result = response.data;
        
        res.render("index.ejs", { data: result });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
});

app.listen(port, () => {
    console.log(`server is running on the port: ${port}`);
});

/*
${latitude}
${longitude}
console.log(response.headers);
*/
