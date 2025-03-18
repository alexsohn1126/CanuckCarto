#!/bin/bash

QUERIES_DIR="./data/queries"          # Directory containing query files
FINAL_RESULTS="./data/final_results.json"  # Final combined output file

# Rerun specific Overpass queries and regenerate combined results
if [ $# -eq 0 ]; then
    echo "Usage: $0 [QUERY_FILES...]"
    exit 1
fi

if [ ! -d "$QUERIES_DIR" ]; then
    echo "Error: QUERIES_DIR '$QUERIES_DIR' not found" >&2
    exit 1
fi

for file in "$@"; do
    if [ ! -f "$file" ]; then
        echo "Error: Query file '$file' not found" >&2
        exit 1
    fi
done

# Rerun failed queries
echo "Rerunning ${#} queries with 5 parallel jobs..."
parallel -j5 --delay 2 '
    echo "Reprocessing {}..."
    if ! curl -s -X POST -d @{} https://maps.mail.ru/osm/tools/overpass/api/interpreter > "{.}.json"; then
        echo "Error: Failed to process {}" >&2
        exit 1
    fi
    echo "Completed {}"
' ::: "$@"

# Combine all results
echo "Generating final combined results..."
if ! jq -n '{elements: [inputs.elements] | add}' "$QUERIES_DIR"/query_*.json > "$FINAL_RESULTS"; then
    echo "Error: Failed to combine results" >&2
    exit 1
fi

echo "Successfully regenerated $FINAL_RESULTS"
