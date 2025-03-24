INPUT_DIR="./osm-data/province-data/raw/"
OUTPUT_DIR="./osm-data/province-data/processed/"

# Checks/Setup
if [ ! -d "$INPUT_DIR" ]; then
  echo "$INPUT_DIR does not exist. Are you running from the project root?"
  exit 1
fi

if ! find "$INPUT_DIR" -maxdepth 1 -type f -name '*.json' -quit 2>/dev/null; then
  echo "$INPUT_DIR does not have any json files. Did you run fetchData?"
  exit 1
fi

mkdir -p "$OUTPUT_DIR/tags/"
mkdir -p "$OUTPUT_DIR/coordinates/"

clean_up() {
  rm "./tmp.json";
}

process_data() {
  local file_name=$(basename $1)
  echo "------------------------------------"
  echo "Generating formatted data from $1..."

  jq '
    [.elements[]
    | {
        id: (.id | tostring),
        type,
        lat: (.lat // .center?.lat),
        lon: (.lon // .center?.lon),
        tags: (.tags // {})
      }
    | del(.nodes)
    ] | unique_by([.type, .id])' "$1" > "./tmp.json"

  if [ $? -eq 0 ]; then
    echo "Created Formatted Dataset"
  else
    echo "Failed to generate formatted dataset"
    clean_up
    exit 1
  fi

  echo "Generating tag dataset";
  
  jq -c '
    group_by([.lat, .lon])
    | map({
      key: "\(.[0].lat)\(.[0].lon)",
      value: map(del(.lat, .lon, .type, .id) | .tags)
    }) | from_entries
  ' "./tmp.json" > "$OUTPUT_DIR/tags/${file_name%%.*}.json"

  if [ $? -eq 0 ]; then
    echo "Created tag dataset at \"$OUTPUT_DIR/tags/${file_name%%.*}.json\""
  else
    echo "Failed to generate tag dataset"
    clean_up
    exit 1
  fi

  echo "Generating coordinates dataset";

  # Generate flattened lat/lon coordinates list
  jq -c '[.[] | [.lat, .lon]] | unique' "./tmp.json" \
    > "$OUTPUT_DIR/coordinates/${file_name%%.*}.json"

  if [ $? -eq 0 ]; then
    echo "Created coordinates dataset at \"$OUTPUT_DIR/coordinates/${file_name%%.*}.json\""
  else
    echo "Failed to generate coordinates dataset"
    clean_up
    exit 1
  fi
}

for file_dir in ${INPUT_DIR}/*.json; do
  process_data ${file_dir};
done

# Combine every tag data into one, delete everything else
echo "------------------------------------"
echo "Combine tag dataset into one file"
jq -s add $OUTPUT_DIR/tags/*.json > $OUTPUT_DIR/tags/coordinatesToTags.json

if [ $? -eq 0 ]; then
  echo "Created combined dataset at \"$OUTPUT_DIR/tags/coordinatesToTags.json\""
else
  echo "Failed to generate combined dataset"
  clean_up
  exit 1
fi

clean_up
