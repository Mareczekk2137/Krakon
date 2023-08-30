import { handler } from './build/handler.js';
import express from 'express';
import fs from "fs"
import https from "https"
import http from "http"


const app = express();
const ipv4 = "172.105.78.141"

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/krak-on.pl/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/krak-on.pl/fullchain.pem"),
};
https.createServer(options, app)
  .listen(443, ipv4, function () {
    console.log("https started at port 443");
  });
http.createServer(app).listen(80, ipv4, function() {
  console.log("http started at port 80");
})