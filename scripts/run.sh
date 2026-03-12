#!/bin/bash
set -e

# Path to SQLite database
DB_PATH=/app/data/db.sqlite3

# Ensure the data directory exists
mkdir -p /app/data

# Step 1: Make sure SQLite file exists
if [ ! -f "$DB_PATH" ]; then
    echo "No database found, creating empty SQLite file..."
    touch "$DB_PATH"
fi

# Step 2: Restore from Litestream if configured
# Only run restore if the LITESTREAM_BUCKET environment variable is set
if [ -n "$LITESTREAM_BUCKET" ]; then
    echo "Restoring database from Litestream replica..."
    litestream restore -if-replica-exists "$DB_PATH" || true
fi

# Step 3: Wait until DB file exists and is writable
while [ ! -f "$DB_PATH" ]; do
    echo "Waiting for database file..."
    sleep 1
done

# Step 4: Optional: set permissions so Node can write
chmod 664 "$DB_PATH"

# Step 5: Start Node via Litestream replication
# -exec runs the Node server as a subprocess
cd /app
exec litestream replicate -exec "node dist/server/entry.mjs"