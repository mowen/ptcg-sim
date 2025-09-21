#!/bin/bash

SQLITE_VER=`sqlite3 --version`
if [ ! $? -eq 0 ]; then
    cat <<EOF
You must download and install sqlite3 for this DB insert script to execute.
Binaries are available for download here: https://sqlite.org/download.html
EOF
    exit 1
fi

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

UUID=`uuidgen 2> /dev/null`
if [ ! $? -eq 0 ]; then
    # If no uuidgen then we're probably on Windows
    UUID=`powershell -Command "[guid]::NewGuid().ToString()"`
fi

KEY=`echo "$UUID" | sed 's/[-]//g' | head -c 10`
VALUE=`cat "$SCRIPT_DIR/../client/tests/react/reducer/testData/data.json" | sed "s/'/''/g"`

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