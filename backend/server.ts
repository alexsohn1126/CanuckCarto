import express, { Request, Response } from "express";

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
