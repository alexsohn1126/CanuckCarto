import fetch from "node-fetch";
import { promises as fs } from "fs";

const query = `[out:json];
// Fetch Ottawa's boundary in Ontario, Canada
area[name="Canada"]->.canada;
area[name="Ottawa"]->.ottawa;
(
  nw[amenity=restaurant][name](area.canada)(area.ottawa);
  nw[amenity=fast_food][name](area.canada)(area.ottawa);
  nw[amenity=cafe][name](area.canada)(area.ottawa);
  nw[brand][name](area.canada)(area.ottawa);
  nw[shop][name](area.canada)(area.ottawa);
);
out center;`;

async function fetchAndStoreData() {
  try {
    // Send POST request to Overpass API
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
      headers: { "Content-Type": "text/plain" },
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }

    // Parse and save data
    const data = await response.json();
    await fs.writeFile(
      "public/ottawa_data.json",
      JSON.stringify(data, null, 2)
    );
    console.log("Data saved to ottawa_data.json");
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : "Unknown error"
    );
  }
}

// Execute the function
fetchAndStoreData();
