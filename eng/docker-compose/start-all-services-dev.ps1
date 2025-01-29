# SPDX-License-Identifier: Apache-2.0
# Licensed to the Ed-Fi Alliance under one or more agreements.
# The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
# See the LICENSE and NOTICES files in the project root for more information.

# Write-Output "Starting keycloak"
# ./start-keycloak.ps1

$composeFilePath = [IO.Path]::Combine($PSScriptRoot, 'compose-ods-multi-tenant-ports.yml')
$composeLocalAdminApi = [IO.Path]::Combine($PSScriptRoot, 'compose-adminapi-ports.yml')
$composeLocalAdminConsole = [IO.Path]::Combine($PSScriptRoot, 'compose-adminconsole-local-ports.yml')
$composeLocalKeycloak = [IO.Path]::Combine($PSScriptRoot, 'compose-keycloak-ports.yml')
$envFilePath = [IO.Path]::Combine($PSScriptRoot, '.env')

$params = @(
    "--profile", "default",
    "-f", $composeFilePath,
    "--env-file", $envFilePath,
    "-p", "adminconsole-local",
    "up",
    "-d",
    "--remove-orphans"
)

# Add all files
$params = $params[0..1] + "-f" + $composeLocalAdminConsole + "-f" + $composeLocalAdminApi + "-f" + $composeLocalKeycloak + $params[2..8]

Write-Output "Starting EdFi Services..."
write-output $params
& docker compose $params


