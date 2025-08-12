#!/bin/bash

KEY=`uuidgen | sed 's/[-]//g' | head -c 10`
VALUE=`cat 'react/reducer/testData/data.json' | sed "s/'//g"`
DB='../../server/database/db.sqlite'

(printf "INSERT INTO KeyValuePairs (key, value) VALUES ('%s', '%s');" "$KEY" "$VALUE") | sqlite3 $DB

echo "New key: $KEY"