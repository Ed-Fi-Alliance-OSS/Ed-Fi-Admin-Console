# SPDX-License-Identifier: Apache-2.0
# Licensed to the Ed-Fi Alliance under one or more agreements.
# The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
# See the LICENSE and NOTICES files in the project root for more information.

param(
    [ValidateSet('PostgreSQL')]
    [string] $engineFolder = 'pgsql'
)

$composeFilePath = [IO.Path]::Combine($PSScriptRoot, 'compose-ods-multi-tenant.yml')
$composeKeycloak = [IO.Path]::Combine($PSScriptRoot, 'compose-keycloak.yml')
$composeLocalAdminConsole = [IO.Path]::Combine($PSScriptRoot, 'compose-adminconsole-local.yml')
$composeLocalAdminApi = [IO.Path]::Combine($PSScriptRoot, 'compose-adminapi.yml')
$composeLocalNginx = [IO.Path]::Combine($PSScriptRoot, 'compose-nginx.yml')
$envFilePath = [IO.Path]::Combine($PSScriptRoot, '.env')

$params = @(
    "--profile", "default",
    "-f", $composeFilePath,
    "--env-file", $envFilePath,
    "-p", "ods-adminapi-keycloak",
    "up",
    "-d",
    "--remove-orphans"
)

# Add all files
$params = $params[0..1] + "-f" + $composeKeycloak + "-f" + $composeLocalAdminConsole + "-f" +
    $composeLocalAdminApi + "-f" + $composeLocalNginx + $params[2..8]

write-output $params
& docker compose $params
