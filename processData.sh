INPUT_FILE="ottawa_data.json"

OUTPUT_FILE="classified_shops.json"

echo "Processing data..."
jq '
  .elements |
  map(select(.tags? and .tags.name?)) |
  reduce .[] as $item ({}; 
    . + { ($item.tags.name): "local" }
  )
' "$INPUT_FILE" > "$OUTPUT_FILE"

if [ $? -eq 0 ]; then
  echo "Classified data saved to $OUTPUT_FILE"
  echo "Total shops processed: $(jq 'length' "$OUTPUT_FILE")"
else
  echo "Failed to process data"
  exit 2
fi

OUTPUT_FILE="simplified_locations.json"

echo "Processing data..."
jq -c '
  .elements[]
  | select(.type == "node" or .type == "way")
  | {
      id: (.id | tostring),
      type,
      lat: (
        if .type == "node" then .lat
        elif .center? then .center.lat
        else null end
      ),
      lon: (
        if .type == "node" then .lon
        elif .center? then .center.lon
        else null end
      ),
      tags: (.tags // {}),
      origin: "local"
    }
  | select(.lat and .lon)
  | del(.nodes)
' "$INPUT_FILE" | jq -s . > "$OUTPUT_FILE"

if [ $? -eq 0 ]; then
  echo "Simplified data saved to $OUTPUT_FILE"
  echo "Total locations processed: $(jq 'length' "$OUTPUT_FILE")"
else
  echo "Failed to process data"
  exit 2
fi
