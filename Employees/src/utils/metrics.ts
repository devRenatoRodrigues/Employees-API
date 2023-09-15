import express from "express";
import client from "prom-client";

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "REST API response time in seconds",
  labelNames: ["method", "route", "status_code"],
});

export const requestCounter = new client.Counter({
  name: "rest_requests_total",
  help: "Total number of REST API requests by instance",
  labelNames: ["instance"],
});

const notificationsCounterMinutes = new client.Gauge({
  name: 'notifications_sent_in_last_minute',
  help: 'Total number of notifications sent in last minute',
});


export function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

  app.get("/metrics", async (_req, res) => {
    res.set("Content-Type", client.register.contentType);

    return res.send(await client.register.metrics());
  });

  setInterval(() => {
    notificationsCounterMinutes.set(0);
  }, 60 * 1000);

  app.post("/receive-notification", (_req, res) => {
    notificationsCounterMinutes.inc();

    res.sendStatus(200);

  });

  app.listen(3030, () => {
    console.log("Metrics server started at http://localhost:3030");
  });
}