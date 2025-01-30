# SPDX-License-Identifier: Apache-2.0
# Licensed to the Ed-Fi Alliance under one or more agreements.
# The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
# See the LICENSE and NOTICES files in the project root for more information.

$composeFilePath = [IO.Path]::Combine($PSScriptRoot, 'compose-keycloak-dev.yml')
$composeOds = [IO.Path]::Combine($PSScriptRoot, 'compose-ods-multi-tenant-dev.yml')
$composeLocalAdminApi = [IO.Path]::Combine($PSScriptRoot, 'compose-adminapi-dev.yml')
$composeLocalAdminConsole = [IO.Path]::Combine($PSScriptRoot, 'compose-adminconsole-local-dev.yml')
$envFilePath = [IO.Path]::Combine($PSScriptRoot, '.env')
$params = @(
    "--profile", "default",
    "-f", $composeFilePath,
    "--env-file", $envFilePath,
    "-p", "adminconsole-local-dev",
    "down",
    "-v",
    "--remove-orphans"
)

# If the compose override exists, insert the -f parameter to get it merged
$params = $params[0..1] + "-f" + $composeLocalAdminConsole + "-f" + $composeLocalAdminApi + "-f" + $composeOds + $params[2..10]

& docker compose $params

# Remove downloaded images
docker rmi $(docker images --filter=reference="edfialliance/ods-*" -q)
docker rmi $(docker images --filter=reference="bitnami/pgbouncer:*" -q)
docker rmi $(docker images --filter=reference="quay.io/keycloak/keycloak:*" -q)
docker rmi $(docker images --filter=reference="postgres:*" -q)
docker rmi $(docker images --filter=reference="adminconsole-local-dev-admin-console:*" -q)
