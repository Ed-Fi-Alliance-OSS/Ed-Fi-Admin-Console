#!/bin/sh
#-- SPDX-License-Identifier: Apache-2.0
#-- Licensed to the Ed-Fi Alliance under one or more agreements.
#-- The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
#-- See the LICENSE and NOTICES files in the project root for more information.

set -e
set +x

if [[ -z "$POSTGRES_PORT" ]]; then
  export POSTGRES_PORT=5432
fi

export MINIMAL_BACKUP=EdFi_Ods_Minimal_Template.sql

echo "Creating the template for instance management workers"

psql --username "$POSTGRES_USER" --port $POSTGRES_PORT --dbname "postgres" <<-EOSQL

CREATE DATABASE "Ods_Minimal_Template";
ALTER DATABASE "Ods_Minimal_Template" IS_TEMPLATE TRUE;
GRANT ALL PRIVILEGES ON DATABASE "Ods_Minimal_Template" TO postgres;

EOSQL

echo "Added the template for instance management workers"

echo "Loading Minimal Template Database from backup to the worker template..."
psql --no-password --username "$POSTGRES_USER" --port $POSTGRES_PORT --dbname "Ods_Minimal_Template" --file /tmp/${MINIMAL_BACKUP}  1> /dev/null