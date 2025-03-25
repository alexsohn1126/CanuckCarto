INPUT_FILE="${PWD}/osm-data/raw-data.json"
OUTPUT_FILE="${PWD}/osm-data/processed-data.json"

if [ ! -f $INPUT_FILE ]; then
  echo -e "File not found at $INPUT_FILE."
  echo -e "Did you run fetchData first, and are you in project root?"
  exit 1
fi

echo "Processing raw json into geojson format..."

jq -c '
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
        coordinates: [(.lon // .center?.lon), (.lat // .center?.lat)]
      },
      properties: (.tags + {id: (.type + (.id | tostring))})
    }
  ]
}' $INPUT_FILE > $OUTPUT_FILE

echo "Conversion complete, output available at $OUTPUT_FILE"
