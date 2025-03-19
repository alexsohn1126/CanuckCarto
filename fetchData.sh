#!/bin/bash

DATA_DIR="./data"
CHUNKS_DIR="${DATA_DIR}/chunks"
QUERIES_DIR="${DATA_DIR}/queries"
INPUT_JSON="${DATA_DIR}/american_shops.json"
BRANDS_TXT="${DATA_DIR}/brands.txt"
FINAL_RESULTS="${DATA_DIR}/final_results.json"


# Define brands requiring EXACT matches (case-sensitive)
STRICT_BRANDS="Mobil,Shell,Esso,Rona,Gap,Starbucks"  # <-- Add your blacklisted brands here

# Split brands
mkdir -p "$CHUNKS_DIR" "$QUERIES_DIR"
rm -f "${CHUNKS_DIR}"/* "${QUERIES_DIR}"/*
jq -r '.shopToCompany | keys_unsorted[]' "$INPUT_JSON" > "$BRANDS_TXT"
split -l 5 -d "$BRANDS_TXT" "${CHUNKS_DIR}/brands_chunk_"

# Generate queries with strict/exact matches for blacklisted brands
for chunk in "${CHUNKS_DIR}"/brands_chunk_*; do
    chunk_number=$(basename "$chunk" | awk -F_ '{print $NF}')
    query_file="${QUERIES_DIR}/query_${chunk_number}.overpassql"
    awk -v strict_list="$STRICT_BRANDS" '
        BEGIN {
            split(strict_list, strict_arr, ",")
            for (i in strict_arr) strict[strict_arr[i]] = 1
            print "[out:json][timeout:900];\narea[\"ISO3166-1\"=\"CA\"]->.canada;\n("
        }
        {
            brand = $0
            if (brand in strict) {
                # Exact match for blacklisted brands
                printf "  nw[~\"^(brand|name)$\"~\"^%s$\"](area.canada);\n", brand
            } else {
                printf "  nw[~\"^(brand|name)$\"~\"%s\",i](area.canada);\n", brand
            }
        }
        END {print ");\nout center;"}' "$chunk" > "$query_file"
done

# Run concurrent queries (with 2s delay between batches)
export API_ENDPOINT='https://overpass-api.de/api/interpreter'
find "$QUERIES_DIR" -name "query_*.overpassql" | parallel -j4 --delay 2 "
    echo 'Processing {}...' &&
    curl -s -X POST -d @{} ${API_ENDPOINT} > '{.}.json'
"

# Combine results
jq -n '{elements: [inputs.elements] | add}' "${QUERIES_DIR}"/query_*.json > "$FINAL_RESULTS"
