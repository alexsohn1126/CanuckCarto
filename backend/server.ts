import express, { Request, Response } from "express";

import ABCoordinateData from "../osm-data/province-data/processed/coordinates/CA-AB.json";
import BCCoordinateData from "../osm-data/province-data/processed/coordinates/CA-BC.json";
import MBCoordinateData from "../osm-data/province-data/processed/coordinates/CA-MB.json";
import NBCoordinateData from "../osm-data/province-data/processed/coordinates/CA-NB.json";
import NLCoordinateData from "../osm-data/province-data/processed/coordinates/CA-NL.json";
import NSCoordinateData from "../osm-data/province-data/processed/coordinates/CA-NS.json";
import NTCoordinateData from "../osm-data/province-data/processed/coordinates/CA-NT.json";
import NUCoordinateData from "../osm-data/province-data/processed/coordinates/CA-NU.json";
import ONCoordinateData from "../osm-data/province-data/processed/coordinates/CA-ON.json";
import PECoordinateData from "../osm-data/province-data/processed/coordinates/CA-PE.json";
import QCCoordinateData from "../osm-data/province-data/processed/coordinates/CA-QC.json";
import SKCoordinateData from "../osm-data/province-data/processed/coordinates/CA-SK.json";
import YTCoordinateData from "../osm-data/province-data/processed/coordinates/CA-YT.json";

import tagsData from "../osm-data/province-data/processed/tags/coordinatesToTags.json";

const app = express();
const port = 5000;

const provinceToCoordinateData = {
  "CA-AB": ABCoordinateData,
  "CA-BC": BCCoordinateData,
  "CA-MB": MBCoordinateData,
  "CA-NB": NBCoordinateData,
  "CA-NL": NLCoordinateData,
  "CA-NS": NSCoordinateData,
  "CA-NT": NTCoordinateData,
  "CA-NU": NUCoordinateData,
  "CA-ON": ONCoordinateData,
  "CA-PE": PECoordinateData,
  "CA-QC": QCCoordinateData,
  "CA-SK": SKCoordinateData,
  "CA-YT": YTCoordinateData,
};

app.get("/api/location/:location", (req: Request, res: Response) => {
  const location = req.params.location;

  if (location in tagsData) {
    res.send(tagsData[location]);
  } else {
    res.status(404);
    res.send({ error: "resource not found" });
  }
});

app.get("/api/province/:province", (req: Request, res: Response) => {
  const province = req.params.province;
  if (province in provinceToCoordinateData) {
    res.send(provinceToCoordinateData[province]);
  } else {
    res.status(404);
    res.send({ error: "resource not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("helllloo");
