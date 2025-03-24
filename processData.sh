INPUT_FILE="${PWD}/osm-data/province-data/raw-data.json"
OUTPUT_FILE="${PWD}/osm-data/province-data/processed-data.geojson"

if [ ! -f $INPUT_FILE ]; then
  echo -e "File not found."
  echo -e "Did you run fetchData first, and are you in project root?"
  exit 1
fi

echo "Processing raw json into geojson..."

jq '
{
  "type": "FeatureCollection",
  "generator": "overpass-turbo",
  "copyright": "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL.",
    features:[
    .elements[]
    | {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [(.lat // .center?.lat), (.lon // .center?.lon)]
      },
      properties: (.tags + {id: (.type + (.id | tostring))})
    }
  ]
}' $INPUT_FILE > $OUTPUT_FILE

echo "Conversion complete, output available at $OUTPUT_FILE"
