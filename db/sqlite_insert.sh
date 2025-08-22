#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

DB="$SCRIPT_DIR/../server/database/db.sqlite"
if [ ! -e "$DB" ]; then
    mkdir -p `dirname $DB`
    touch "$DB"
    if [ $? -eq 0 ]; then
        echo "Created $DB"
    else
        echo "Failed to create database." >&2
        exit 1
    fi
fi

KEY=`uuidgen | sed 's/[-]//g' | head -c 10`
VALUE=`cat "$SCRIPT_DIR/../client/tests/react/reducer/testData/data.json" | sed "s/'//g"`

sqlite3 "$DB" <<EOF 
CREATE TABLE IF NOT EXISTS KeyValuePairs (key TEXT PRIMARY KEY, value TEXT);
INSERT INTO KeyValuePairs (key, value) VALUES ('$KEY', '$VALUE');
EOF

if [ $? -eq 0 ]; then
    echo "Browse to the import here: http://localhost:4000?importKey=$KEY"
else
    echo "Failed to insert into database." >&2
    exit 1
fi

exit 0