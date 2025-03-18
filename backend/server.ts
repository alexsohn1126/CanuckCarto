import express, { Request, Response } from "express";
import tagsData from "../data/brand_locations.json";

const app = express();
const port = 5000;

app.get("/api/location/:location", (req: Request, res: Response) => {
  const location = req.params.location;
  if (location in tagsData) {
    res.send(tagsData[location]);
  } else {
    res.status(404);
    res.send({ error: "resource not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
