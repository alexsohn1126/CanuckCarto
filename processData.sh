INPUT_FILE="./data/final_results.json"
OUTPUT_FILE="./data/simplified_locations.json"
BRAND_FILE="./data/brand_locations.json"
COORDINATES_FILE="./data/coordinates.json"

echo "Processing shops data..."
jq '
  [.elements[]
  | select(.type | ("node", "way") == .)
  | {
      id: (.id | tostring),
      type,
      lat: (.lat // .center?.lat),
      lon: (.lon // .center?.lon),
      tags: (.tags // {})
    }
  | select(.lat and .lon)
  | del(.nodes)
  ] | unique_by([.type, .id])' "$INPUT_FILE" > "$OUTPUT_FILE"

echo "Generating location groups..."
jq -c '
  group_by([.lat, .lon])
  | map({
      key: "\(.[0].lat)\(.[0].lon)",
      value: map(del(.lat, .lon, .type, .id))
    })
  | from_entries' "$OUTPUT_FILE" > "$BRAND_FILE"

if [ $? -eq 0 ]; then
  echo "Simplified data saved to $OUTPUT_FILE"
  echo "Location groups saved to $BRAND_FILE"
  echo "Total locations: $(jq 'length' "$BRAND_FILE")"
else
  echo "Failed to generate location groups"
  exit 3
fi

echo "Generating coordinates-only list..."
jq -c '[.[] | [.lat, .lon]] | unique' "$OUTPUT_FILE" > "$COORDINATES_FILE"

if [ $? -eq 0 ]; then
  echo "Coordinates saved to $COORDINATES_FILE"
  echo "Total coordinates: $(jq 'length' "$COORDINATES_FILE")"
else
  echo "Failed to generate coordinates list"
  exit 3
fi
