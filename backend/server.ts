import express, { Request, Response } from "express";
import Supercluster, { AnyProps, PointFeature } from "supercluster";

import processedData from "../osm-data/processed-data.json";

const app = express();
app.use(express.json());
const port = 5000;

const cluster = new Supercluster({
  maxZoom: 16,
  minPoints: 2,
  radius: 100,
});

const features = processedData["features"] as PointFeature<AnyProps>[];
cluster.load(features);

function isBBox(value: unknown): value is [number, number, number, number] {
  return (
    Array.isArray(value) &&
    value.length === 4 &&
    value.every((item) => typeof item === "number")
  );
}

app.post("/api/clusters/", (req: Request, res: Response) => {
  const bbox = req.body?.bbox;
  const zoom = Math.round(req.body?.zoom);

  if (bbox === undefined || zoom === undefined) {
    res.status(400);
    res.send({ error: "Did not receive bbox or zoom" });
    return;
  }

  if (!isBBox(bbox) || Number.isNaN(zoom)) {
    res.status(400);
    res.send({
      error: "Invalid bbox or zoom... Are you messing around with my api?",
    });
    return;
  }

  const resCluster = cluster.getClusters(bbox, zoom);
  res.send(resCluster);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("Server Initialization Complete");
