#!/bin/bash

SQLITE_FILE='../server/database/db.sqlite'
if [ ! -e "$SQLITE_FILE" ]; then
  touch "$SQLITE_FILE"
  echo "Created $SQLITE_FILE"
fi

docker compose up -d
