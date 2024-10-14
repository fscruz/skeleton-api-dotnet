#!/bin/bash

echo "Running migrations"

#run the setup script to create the DB and the schema in the DB
/opt/mssql-tools18/bin/sqlcmd -S {{DB_SERVER}} -U sa -P {{DB_SA_PASSWORD}} -d master -i db-dump.sql -C

for file in "migrations"/*.sql; do
    if [ -f "$file" ]; then
        echo "$file"
        /opt/mssql-tools18/bin/sqlcmd -S {{DB_SERVER}} -U sa -P {{DB_SA_PASSWORD}} -d master -i "$file" -C
    fi
done