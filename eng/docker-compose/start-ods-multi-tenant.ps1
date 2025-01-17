# SPDX-License-Identifier: Apache-2.0
# Licensed to the Ed-Fi Alliance under one or more agreements.
# The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
# See the LICENSE and NOTICES files in the project root for more information.

$composeFilePath = [IO.Path]::Combine($PSScriptRoot, 'compose-ods-multi-tenant.yml')

$envFilePath = [IO.Path]::Combine($PSScriptRoot, '.env')

$params = @(
    "--profile", "default",
    "-f", $composeFilePath,
    "--env-file", $envFilePath,
    "-p", "ods-api-adminapi",
    "up",
    "-d",
    "--remove-orphans"
)

write-output $params
& docker compose $params
