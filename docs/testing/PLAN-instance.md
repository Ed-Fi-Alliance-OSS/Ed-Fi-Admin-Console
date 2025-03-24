# Admin Console 1.0 Test Plan: Instance Management Worker

## Context

Show system interactions with Admin Console, Admin API, ODS/API

## Functional Testing

### Static Analysis

The Alliance uses Sonar-dotnet, GitHub CodeQL, GitHub dependency-review-action,
GitHub Dependabot, and Trivy to automate static testing and detect
vulnerabilities in the source code and Docker images. All warnings are treated
as errors, ensuring thorough security analysis and compliance with the Ed-Fi C#
Coding Standard.

### Unit

The Instance Management Worker will have unit tests covering all business logic.
As a .NET application, the test project will utilize the following tools:

* NUnit as the test framework.
* FakeItEasy for mocking.
* Shouldly for assertions.

Unit tests should not interact with Admin API or with the relational database
system.

These tests will run on every pull request in GitHub.

### Integration

TBD - will this tool have any database-integrated tests?

### System

TBD - will this tool have any tests integrated with all systems (Admin API,
database)?

### System Integration

Complete system integration testing is covered in the [Admin
Console](./PLAN-console.md) test plan document.

## Non-Functional Testing

### Performance Testing

Write an orchestration suite in PowerShell to:

1. Start environment in Docker using Compose.
1. Run SQL script to setup initial state for the test case.
1. Start a timer.
1. Call `docker exec` to run the worker immediately, instead of waiting for
   schedule. Don't use `--rm` to remove, as we need the logs
1. When it comes back:
   1. Stop the timer
   1. Collect logs and write to disk
   1. Report the duration taken.
   1. Remove the "exec" container.
1. Stop the docker environment.

Test cases:

1. Expected peak load: create five instances.
2. Complex scenario:
   1. Pre-create four instances manually (simple `CREATE DATABASE` statements).
   2. Now inject five new creations, two deletions, and two renames.
3. Heavy load: create 2,000 instances.

### Operational Useability Testing

Heuristics worksheet to be developed.

Performed by the support team rather than the development team, in coordination
with Ed-Fi Customer Success.

Test cases:

1. Admin API is not running.
2. Unable to connect to destination database. The database server must be
   running for Admin API to work and provide information to the worker. Try
   running the worker from the container host OS or in an alternate Docker
   network, so that it can (a) access Admin API but (b) cannot access the RDBMS.