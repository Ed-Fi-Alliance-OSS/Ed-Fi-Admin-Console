# SPDX-License-Identifier: Apache-2.0
# Licensed to the Ed-Fi Alliance under one or more agreements.
# The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
# See the LICENSE and NOTICES files in the project root for more information.

$composeFilePath = [IO.Path]::Combine($PSScriptRoot, 'compose-ods-multi-tenant-dev.yml')
$composeLocalAdminApi = [IO.Path]::Combine($PSScriptRoot, 'compose-adminapi-dev.yml')
$composeLocalAdminConsole = [IO.Path]::Combine($PSScriptRoot, 'compose-adminconsole-local-dev.yml')
$composeLocalKeycloak = [IO.Path]::Combine($PSScriptRoot, 'compose-keycloak-dev.yml')
$envFilePath = [IO.Path]::Combine($PSScriptRoot, '.env')

$params = @(
    "--profile", "default",
    "-f", $composeFilePath,
    "--env-file", $envFilePath,
    "-p", "adminconsole-local-dev",
    "up",
    "--remove-orphans"
)

# Add all files
$params = $params[0..1] + "-f" + $composeLocalAdminConsole + "-f" + $composeLocalAdminApi + "-f" + $composeLocalKeycloak + $params[2..9]

Write-Output "Starting EdFi Services..."
write-output $params
& docker compose $params


