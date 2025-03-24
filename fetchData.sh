OUTPUT_DIR="${PWD}/osm-data/province-data/raw/"
mkdir -p "$OUTPUT_DIR"

read -r -d '' query << EOF
[out:json][timeout:99999];
(
  node["shop"];
  node["amenity"~"restaurant|fast_food|ice_cream|cafe|fuel"];
  way["shop"];
  way["amenity"~"restaurant|fast_food|ice_cream|cafe|fuel"];
);
out center;
EOF

echo "Querying..."
curl -sS \
  --data-urlencode "data=${query}" -o "${OUTPUT_DIR}/raw-data.json" \
  "http://127.0.0.1/api/interpreter"
sleep 1

echo "Shop Data fetch complete. Results saved to: ${OUTPUT_DIR}/raw-data.json"
