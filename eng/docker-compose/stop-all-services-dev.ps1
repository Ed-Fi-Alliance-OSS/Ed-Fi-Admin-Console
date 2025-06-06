# SPDX-License-Identifier: Apache-2.0
# Licensed to the Ed-Fi Alliance under one or more agreements.
# The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
# See the LICENSE and NOTICES files in the project root for more information.

[CmdletBinding()]
param (
    # Delete volumes after stopping services
    [Switch]
    $v
)

$composeFilePath = Join-Path $PSScriptRoot compose-keycloak-dev.yml
$composeOds = Join-Path $PSScriptRoot  compose-ods-multi-tenant-dev.yml
$composeLocalAdminApi = Join-Path $PSScriptRoot  compose-adminapi-dev.yml
$composeLocalAdminConsole = Join-Path $PSScriptRoot  compose-adminconsole-local-dev.yml
$composeHealthCheckWorker = Join-Path $PSScriptRoot compose-healthcheck.yml
$composeInstanceManagementWorker = Join-Path $PSScriptRoot compose-instance-management.yml

$envFilePath = Join-Path $PSScriptRoot .env

$params = @(
    "--profile", "default",
    "-f", $composeFilePath,
    "--env-file", $envFilePath,
    "-p", "adminconsole-local-dev",
    "down",
    "--remove-orphans"
)
if ($v) {
    $params = $params[0..1] + "-f" + $composeLocalAdminConsole + "-f" + $composeLocalAdminApi + "-f" + $composeOds + "-f" + $composeHealthCheckWorker + "-f" + $composeInstanceManagementWorker + $params[2..9] + "-v"
}
else {
    $params = $params[0..1] + "-f" + $composeLocalAdminConsole + "-f" + $composeLocalAdminApi + "-f" + $composeOds + "-f" + $composeHealthCheckWorker + "-f" + $composeInstanceManagementWorker + $params[2..9] 
}

& docker compose $params
