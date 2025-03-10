OVERPASS_URL="https://overpass-api.de/api/interpreter"
RAW_OUTPUT="ottawa_data.json"
CLASSIFIED_OUTPUT="classified_shops.json"

# Original Overpass QL query
read -r -d '' QUERY << 'EOF'
[out:json];
area[name="Canada"]->.canada;
area[name="Ottawa"]->.ottawa;
(
  nw[amenity=restaurant](area.canada)(area.ottawa);
  nw[amenity=fast_food](area.canada)(area.ottawa);
  nw[amenity=cafe](area.canada)(area.ottawa);
  nw[brand](area.canada)(area.ottawa);
  nw[shop](area.canada)(area.ottawa);
);
out center;
EOF

# Fetch and save raw data
echo "Fetching data from Overpass API..."
curl --silent --show-error --fail \
  --request POST \
  --header "Content-Type: text/plain" \
  --data "$QUERY" \
  "$OVERPASS_URL" | jq . > "$RAW_OUTPUT"

if [ $? -eq 0 ]; then
  echo "Raw data saved to $RAW_OUTPUT"
else
  echo "Failed to fetch data"
  exit 1
fi
